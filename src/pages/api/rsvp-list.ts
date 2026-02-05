import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

interface RSVPRecord {
  id: string;
  primary_guest_name: string;
  phone_number: string | null;
  will_attend: boolean;
  special_message: string | null;
  created_at: string;
  rsvp_guests?: Array<{
    id: string;
    guest_name: string;
  }>;
}

interface SuccessResponse {
  success: boolean;
  data?: RSVPRecord[];
  total?: number;
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
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  try {
    // Fetch all RSVP records
    const { data: rsvps, error: rsvpError } = await supabase
      .from('rsvp')
      .select('*')
      .order('created_at', { ascending: false });

    if (rsvpError) {
      console.error('RSVP fetch error:', rsvpError);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch RSVP records',
      });
    }

    // Fetch all guest records
    const { data: guests, error: guestError } = await supabase
      .from('rsvp_guests')
      .select('*');

    if (guestError) {
      console.error('Guest fetch error:', guestError);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch guest records',
      });
    }

    // Map guests to their RSVP records
    const rsvpsWithGuests = (rsvps || []).map((rsvp: RSVPRecord) => ({
      ...rsvp,
      rsvp_guests: (guests || []).filter(
        (guest: any) => guest.rsvp_id === rsvp.id
      ),
    }));

    return res.status(200).json({
      success: true,
      data: rsvpsWithGuests,
      total: rsvps?.length || 0,
    });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
}
