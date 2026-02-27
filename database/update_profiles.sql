-- 1. Create columns in 'profiles' table for username and avatar_url
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS username TEXT,
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- 2. Create the Avatars bucket in Storage (if it doesn't already exist)
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Storage Policies to allow users to update their own avatars and anyone to view them

-- Everyone can view avatars
CREATE POLICY "Public Access for avatars"
ON storage.objects FOR SELECT
USING ( bucket_id = 'avatars' );

-- Users can upload/update their own avatars
CREATE POLICY "Users can upload their own avatars"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'avatars' 
    AND auth.uid() = owner
);

CREATE POLICY "Users can update their own avatars"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'avatars' 
    AND auth.uid() = owner
);
