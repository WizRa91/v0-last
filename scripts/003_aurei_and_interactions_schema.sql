-- Schema changes for Aurei Loyalty Points and Interaction Buttons

    -- Add aurei_earned column to user_quiz_attempts
    -- Ensure user_quiz_attempts table exists from base schema
    DO $$
    BEGIN
      IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_quiz_attempts') THEN
        ALTER TABLE user_quiz_attempts ADD COLUMN IF NOT EXISTS aurei_earned INT DEFAULT 0;
        COMMENT ON COLUMN user_quiz_attempts.aurei_earned IS 'Aurei points earned for this quiz attempt.';
      ELSE
        RAISE NOTICE 'Table user_quiz_attempts does not exist. Skipping ALTER TABLE.';
      END IF;
    END $$;

    -- Add aurei_earned column to user_rebus_attempts
    -- Ensure user_rebus_attempts table exists from base schema
    DO $$
    BEGIN
      IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_rebus_attempts') THEN
        ALTER TABLE user_rebus_attempts ADD COLUMN IF NOT EXISTS aurei_earned INT DEFAULT 0;
        COMMENT ON COLUMN user_rebus_attempts.aurei_earned IS 'Aurei points earned for this rebus attempt.';
      ELSE
        RAISE NOTICE 'Table user_rebus_attempts does not exist. Skipping ALTER TABLE.';
      END IF;
    END $$;

    -- NOTE: The DDL for `user_aurei_balance` and `aurei_transactions` tables
    -- is mentioned to be in "Appendix A" of the design document, which was omitted
    -- from the provided excerpt. You will need to add these table definitions manually
    -- based on the full design document.
    -- Example structure (inferred, verify with full document):
    /*
    CREATE TABLE IF NOT EXISTS user_aurei_balance (
      user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
      balance INT NOT NULL DEFAULT 0,
      last_updated_at TIMESTAMPTZ DEFAULT NOW()
    );
    COMMENT ON TABLE user_aurei_balance IS 'Current Aurei loyalty points balance for each user.';

    CREATE TABLE IF NOT EXISTS aurei_transactions (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
      amount INT NOT NULL, -- Positive for earning, negative for spending
      transaction_type TEXT NOT NULL, -- e.g., 'quiz_reward', 'rebus_reward', 'purchase'
      related_id UUID, -- Optional: e.g., quiz_attempt_id, rebus_attempt_id, purchase_id
      description TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
    COMMENT ON TABLE aurei_transactions IS 'Immutable ledger of all Aurei transactions (earnings and spendings).';
    CREATE INDEX IF NOT EXISTS idx_aurei_transactions_user_id ON aurei_transactions(user_id);
    */

    -- User Want To Visit table
    CREATE TABLE IF NOT EXISTS user_want_to_visit (
      user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
      site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      PRIMARY KEY (user_id, site_id)
    );

    COMMENT ON TABLE user_want_to_visit IS 'Tracks sites users want to visit; requires authentication.';
    COMMENT ON COLUMN user_want_to_visit.user_id IS 'Foreign key to auth.users table.';
    COMMENT ON COLUMN user_want_to_visit.site_id IS 'Foreign key to sites table.';

    -- Anonymous Site Visits table
    -- Note: `user_site_visits` (for authenticated users) is an existing table.
    -- This new table is for anonymous users.
    CREATE TABLE IF NOT EXISTS anonymous_site_visits (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
      client_fingerprint TEXT, -- Could be a browser fingerprint or session ID
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    COMMENT ON TABLE anonymous_site_visits IS 'Tracks "been here" interactions for anonymous users.';
    COMMENT ON COLUMN anonymous_site_visits.site_id IS 'Foreign key to sites table.';
    COMMENT ON COLUMN anonymous_site_visits.client_fingerprint IS 'Identifier for the anonymous client/session.';
    CREATE INDEX IF NOT EXISTS idx_anonymous_site_visits_site_id ON anonymous_site_visits(site_id);
    CREATE INDEX IF NOT EXISTS idx_anonymous_site_visits_client_fingerprint ON anonymous_site_visits(client_fingerprint);
