import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

interface Guest {
  id: string;
  name: string;
}

interface RSVPData {
  primaryGuestName: string;
  phone: string;
  guests: Guest[];
  message: string;
  willAttend: string;
}

interface SuccessResponse {
  success: boolean;
  data?: {
    rsvpId: string;
    guestCount: number;
  };
  message?: string;
}

interface ErrorResponse {
  success: boolean;
  error: string;
}

type ResponseData = SuccessResponse | ErrorResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  try {
    const formData: RSVPData = req.body;

    // Validate required fields
    if (!formData.primaryGuestName || !formData.willAttend) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
      });
    }

    // Insert RSVP record
    const { data: rsvpData, error: rsvpError } = await supabase
      .from('rsvp')
      .insert({
        primary_guest_name: formData.primaryGuestName,
        phone_number: formData.phone,
        special_message: formData.message,
        will_attend: formData.willAttend === 'yes',
      })
      .select()
      .single();

    if (rsvpError) {
      console.error('RSVP insert error:', rsvpError);
      return res.status(500).json({
        success: false,
        error: 'Failed to save RSVP',
      });
    }

    // Insert guest records if attending and have non-empty names
    // Skip the first guest (index 0) as it's the primary guest placeholder
    const additionalGuests = formData.guests.slice(1).filter((guest) => guest.name.trim());
    
    if (formData.willAttend === 'yes' && additionalGuests.length > 0) {
      const guestRecords = additionalGuests.map((guest) => ({
        rsvp_id: rsvpData.id,
        guest_name: guest.name,
      }));

      const { error: guestError } = await supabase
        .from('rsvp_guests')
        .insert(guestRecords);

      if (guestError) {
        console.error('Guest insert error:', guestError);
        return res.status(500).json({
          success: false,
          error: 'Failed to save guest information',
        });
      }
    }

    return res.status(200).json({
      success: true,
      data: {
        rsvpId: rsvpData.id,
        guestCount: formData.guests.length,
      },
      message: 'RSVP submitted successfully',
    });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
}
