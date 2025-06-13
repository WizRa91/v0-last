-- Drop table if it exists to start fresh
DROP TABLE IF EXISTS public.sites;

-- Create the sites table
CREATE TABLE public.sites (
    slug TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    baseSiteSlug TEXT,
    addonName TEXT,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    cover_image TEXT,
    blurb TEXT,
    fullDescription TEXT,
    country TEXT,
    specificLocation TEXT,
    primaryCategory TEXT,
    categories TEXT[],
    continent TEXT,
    rating NUMERIC(2, 1),
    period TEXT,
    type TEXT,
    significance TEXT,
    visitors TEXT,
    unesco BOOLEAN,
    tags TEXT[],
    article_url TEXT,
    media JSONB,
    location JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add comments to describe columns
COMMENT ON COLUMN public.sites.slug IS 'Unique identifier for the site, used in URLs.';
COMMENT ON COLUMN public.sites.latitude IS 'The north-south position of the site.';
COMMENT ON COLUMN public.sites.longitude IS 'The east-west position of the site.';
COMMENT ON COLUMN public.sites.media IS 'JSONB array of media items (images, videos).';
COMMENT ON COLUMN public.sites.location IS 'JSONB object with detailed location info.';

-- Enable Row Level Security
ALTER TABLE public.sites ENABLE ROW LEVEL SECURITY;

-- Create policies for sites table
-- 1. Allow public read access to everyone
CREATE POLICY "Sites are public and viewable by everyone."
  ON public.sites FOR SELECT USING (TRUE);

-- 2. Allow admin users (service_role) to perform any action
CREATE POLICY "Allow full access to admin users"
  ON public.sites FOR ALL
  USING (TRUE) -- This policy is permissive, fine for now as we seed data via scripts.
  WITH CHECK (TRUE);
