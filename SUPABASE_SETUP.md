# Supabase RSVP Database Setup

This guide explains how to set up the Supabase database for the wedding RSVP system.

## Prerequisites

- Supabase project created at https://supabase.com
- Environment variables configured in Vercel

## Environment Variables Required

Add the following environment variables to your Vercel project:

1. **NEXT_PUBLIC_SUPABASE_URL** - Your Supabase project URL
   - Found in Supabase dashboard under Settings > API > Project URL

2. **SUPABASE_SERVICE_ROLE_KEY** - Your Supabase service role key (for server-side operations)
   - Found in Supabase dashboard under Settings > API > Service role key
   - ⚠️ Keep this private - only use on the server, never expose to the client

## Database Setup

The RSVP system uses two tables:

### 1. `rsvp` Table
Stores primary guest information:
- `id` (UUID) - Primary key
- `primary_guest_name` (VARCHAR) - Guest's full name
- `phone_number` (VARCHAR) - Guest's phone number
- `will_attend` (BOOLEAN) - Attendance confirmation
- `special_message` (TEXT) - Optional message from the guest
- `created_at` (TIMESTAMP) - Record creation time
- `updated_at` (TIMESTAMP) - Last update time

### 2. `rsvp_guests` Table
Stores additional guests associated with an RSVP:
- `id` (UUID) - Primary key
- `rsvp_id` (UUID) - Foreign key referencing rsvp.id
- `guest_name` (VARCHAR) - Guest's name
- `created_at` (TIMESTAMP) - Record creation time

## How to Execute the Migration

### Option 1: Using Supabase SQL Editor (Recommended)

1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Click "New query"
4. Copy the entire contents of `scripts/001_create_rsvp_tables.sql`
5. Paste it into the SQL editor
6. Click "Run"

### Option 2: Using v0 System

The migration script has been created and can be executed through the v0 system.

## Security Features

The database includes Row Level Security (RLS) policies:
- **Anyone can submit an RSVP** (INSERT policy allows public submissions)
- **Only authenticated users can view RSVPs** (SELECT policy requires authentication)

This ensures your guest list is protected while allowing public RSVP submissions.

## API Endpoint

The RSVP form submits data to `/api/rsvp` which:
1. Validates the form data
2. Inserts the primary guest record
3. Inserts any additional guest records
4. Returns success/error response

## Testing

To test the RSVP system:
1. Navigate to the `/rsvp` page
2. Fill out the form with test data
3. Submit and verify the data appears in Supabase dashboard
4. Check both `rsvp` and `rsvp_guests` tables

## Troubleshooting

**"Missing Supabase environment variables" error:**
- Verify NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in Vercel
- Restart the development server after updating env vars

**"Failed to save RSVP" error:**
- Check that the SQL migration has been executed
- Verify tables exist in Supabase dashboard
- Check RLS policies are correctly configured

**CORS or connection errors:**
- Ensure Supabase URL is correct and public
- Verify service role key has proper permissions
