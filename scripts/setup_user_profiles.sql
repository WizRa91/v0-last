-- Create public.profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  location TEXT,
  email_notifications BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  email TEXT -- Added to store email directly in profiles table
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles table
CREATE POLICY "Public profiles are viewable by everyone."
  ON public.profiles FOR SELECT USING (TRUE);

CREATE POLICY "Users can insert their own profile."
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile."
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.email -- Store the email from auth.users
  );
  
  -- Initialize aurei balance (assuming user_aurei_balance table exists)
  -- If user_aurei_balance table doesn't exist, you might need to create it first
  -- or remove this part if not immediately needed.
  -- Example:
  -- INSERT INTO public.user_aurei_balance (user_id, points)
  -- VALUES (NEW.id, 0);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call handle_new_user on new auth.users insert
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create user_aurei_balance table if it doesn't exist
-- This is a placeholder, adjust columns as needed for your Aurei system
CREATE TABLE IF NOT EXISTS public.user_aurei_balance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  points INTEGER DEFAULT 0,
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- Policies for user_aurei_balance table
ALTER TABLE public.user_aurei_balance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own aurei balance."
  ON public.user_aurei_balance FOR SELECT USING (auth.uid() = user_id);

-- Allow backend/triggers to insert (service_role or security definer functions)
-- For direct insert by user (e.g. initial setup if not by trigger), you'd need:
-- CREATE POLICY "Users can insert their own aurei balance record."
--   ON public.user_aurei_balance FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Function to initialize aurei balance (if not handled by the main trigger or if profiles trigger is separate)
CREATE OR REPLACE FUNCTION public.initialize_aurei_for_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_aurei_balance (user_id, points)
  VALUES (NEW.id, 0)
  ON CONFLICT (user_id) DO NOTHING; -- Avoid error if already exists
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to initialize aurei balance when a new profile is created
CREATE TRIGGER on_profile_created_initialize_aurei
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.initialize_aurei_for_profile();
