-- Create guest photo gallery table
CREATE TABLE IF NOT EXISTS public.guest_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  uploader_name VARCHAR(120) NOT NULL,
  cloudinary_public_id TEXT NOT NULL UNIQUE,
  secure_url TEXT NOT NULL,
  width INTEGER,
  height INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Keep gallery reads fast and consistently ordered
CREATE INDEX IF NOT EXISTS idx_guest_photos_created_at
  ON public.guest_photos(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.guest_photos ENABLE ROW LEVEL SECURITY;

-- Anyone may view the public guest photo gallery
CREATE POLICY "Allow public to read guest photos" ON public.guest_photos
  FOR SELECT
  USING (true);
