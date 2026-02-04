-- Create RSVP table for primary guest information
CREATE TABLE IF NOT EXISTS public.rsvp (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  primary_guest_name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20),
  will_attend BOOLEAN NOT NULL,
  special_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RSVP Guests table for additional guests
CREATE TABLE IF NOT EXISTS public.rsvp_guests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rsvp_id UUID NOT NULL REFERENCES public.rsvp(id) ON DELETE CASCADE,
  guest_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_rsvp_created_at ON public.rsvp(created_at);
CREATE INDEX IF NOT EXISTS idx_rsvp_guests_rsvp_id ON public.rsvp_guests(rsvp_id);

-- Enable Row Level Security
ALTER TABLE public.rsvp ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rsvp_guests ENABLE ROW LEVEL SECURITY;

-- Create policies for public insert (anyone can submit RSVP)
CREATE POLICY "Allow public to insert RSVP" ON public.rsvp
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public to insert RSVP guests" ON public.rsvp_guests
  FOR INSERT
  WITH CHECK (true);

-- Create policies for reading (optional - allow authenticated users to view)
CREATE POLICY "Allow authenticated users to read RSVP" ON public.rsvp
  FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to read RSVP guests" ON public.rsvp_guests
  FOR SELECT
  USING (auth.role() = 'authenticated');
