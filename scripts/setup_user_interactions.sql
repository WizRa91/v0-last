CREATE TABLE public.user_interactions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    site_id text NOT NULL, -- Assuming siteId from your components maps to this
    interaction_type text NOT NULL, -- 'been_there', 'want_to_go', 'bookmark', 'quiz_completed', 'rebus_completed'
    created_at timestamptz DEFAULT now(),
    UNIQUE (user_id, site_id, interaction_type) -- Ensure a user can only have one of each interaction type per site
);

ALTER TABLE public.user_interactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own interactions"
  ON public.user_interactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own interactions"
  ON public.user_interactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own interactions"
  ON public.user_interactions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own interactions"
  ON public.user_interactions FOR DELETE
  USING (auth.uid() = user_id);

-- Optional: If you want to link to a 'posts' table as in your provided code,
-- you'd need to ensure that table exists and has an 'id' column.
-- For now, I'm assuming 'site_id' is the primary identifier for the locations.
