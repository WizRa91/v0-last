-- Row-Level Security (RLS) Policies

    -- Enable RLS for new tables
    ALTER TABLE note_categories ENABLE ROW LEVEL SECURITY;
    ALTER TABLE site_notes ENABLE ROW LEVEL SECURITY;
    ALTER TABLE note_likes ENABLE ROW LEVEL SECURITY;
    ALTER TABLE user_want_to_visit ENABLE ROW LEVEL SECURITY;
    ALTER TABLE anonymous_site_visits ENABLE ROW LEVEL SECURITY;
    -- NOTE: Also enable RLS for user_aurei_balance and aurei_transactions when created.
    -- ALTER TABLE user_aurei_balance ENABLE ROW LEVEL SECURITY;
    -- ALTER TABLE aurei_transactions ENABLE ROW LEVEL SECURITY;


    -- Policies for note_categories
    CREATE POLICY "Allow public read access to note categories"
      ON note_categories FOR SELECT USING (true);
    -- Admin policies for insert/update/delete on note_categories (assuming admin role or direct DB access)
    -- CREATE POLICY "Allow admin full access to note categories"
    --   ON note_categories FOR ALL USING (is_admin_user()) WITH CHECK (is_admin_user());


    -- Policies for site_notes
    CREATE POLICY "Allow public read access to site notes"
      ON site_notes FOR SELECT USING (true);

    CREATE POLICY "Allow users to insert their own site notes"
      ON site_notes FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = user_id);

    CREATE POLICY "Allow users to update their own site notes"
      ON site_notes FOR UPDATE USING (auth.role() = 'authenticated' AND auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

    CREATE POLICY "Allow users to delete their own site notes"
      ON site_notes FOR DELETE USING (auth.role() = 'authenticated' AND auth.uid() = user_id);


    -- Policies for note_likes
    CREATE POLICY "Allow public read access to note likes"
      ON note_likes FOR SELECT USING (true);

    CREATE POLICY "Allow users to insert their own note likes"
      ON note_likes FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = user_id);

    CREATE POLICY "Allow users to delete their own note likes"
      ON note_likes FOR DELETE USING (auth.role() = 'authenticated' AND auth.uid() = user_id);


    -- Policies for user_aurei_balance (assuming table will be created)
    -- NOTE: The DDL for user_aurei_balance is missing from the provided document.
    -- These policies are based on the RLS matrix in Section 6.
    CREATE POLICY "Allow users to select their own aurei balance"
      ON user_aurei_balance FOR SELECT USING (auth.role() = 'authenticated' AND auth.uid() = user_id);
    -- No INSERT, UPDATE, DELETE policies for users as per "via triggers only".


    -- Policies for aurei_transactions (assuming table will be created)
    -- NOTE: The DDL for aurei_transactions is missing from the provided document.
    -- These policies are based on the RLS matrix in Section 6.
    CREATE POLICY "Allow users to select their own aurei transactions"
      ON aurei_transactions FOR SELECT USING (auth.role() = 'authenticated' AND auth.uid() = user_id);
    -- No INSERT, UPDATE, DELETE policies for users as per "triggers" / "—".


    -- Policies for user_want_to_visit
    CREATE POLICY "Allow users to select their own want_to_visit entries"
      ON user_want_to_visit FOR SELECT USING (auth.role() = 'authenticated' AND auth.uid() = user_id);

    CREATE POLICY "Allow users to insert their own want_to_visit entries"
      ON user_want_to_visit FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = user_id);

    CREATE POLICY "Allow users to update their own want_to_visit entries"
      ON user_want_to_visit FOR UPDATE USING (auth.role() = 'authenticated' AND auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
      
    CREATE POLICY "Allow users to delete their own want_to_visit entries"
      ON user_want_to_visit FOR DELETE USING (auth.role() = 'authenticated' AND auth.uid() = user_id);


    -- Policies for anonymous_site_visits
    CREATE POLICY "Allow public read access to anonymous site visits"
      ON anonymous_site_visits FOR SELECT USING (true);

    CREATE POLICY "Allow anyone to insert anonymous site visits"
      ON anonymous_site_visits FOR INSERT WITH CHECK (true);
    -- No UPDATE, DELETE policies as per "—".
