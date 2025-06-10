-- Schema for the Notes System

    -- Note Categories table
    CREATE TABLE IF NOT EXISTS note_categories (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name TEXT NOT NULL UNIQUE,
      description TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    COMMENT ON TABLE note_categories IS 'Fixed list of topics for site notes (e.g., accessibility, difficulty).';
    COMMENT ON COLUMN note_categories.name IS 'Unique name of the note category.';

    -- Seed initial note categories (example values, adjust as needed)
    INSERT INTO note_categories (name, description) VALUES
      ('Accessibility', 'Notes related to site accessibility.'),
      ('Difficulty', 'Notes regarding the difficulty of visiting or understanding the site.'),
      ('Must-Haves', 'Essential items or preparations for visiting.'),
      ('Must-See', 'Key points of interest or experiences at the site.'),
      ('Extras', 'Additional tips, observations, or miscellaneous information.')
    ON CONFLICT (name) DO NOTHING;

    -- Site Notes table
    CREATE TABLE IF NOT EXISTS site_notes (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
      user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- Keep note even if user is deleted
      category_id UUID REFERENCES note_categories(id) ON DELETE SET NULL,
      content TEXT NOT NULL,
      like_count INT DEFAULT 0, -- Denormalized counter
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    COMMENT ON TABLE site_notes IS 'User-generated notes for specific sites, categorized by topic.';
    COMMENT ON COLUMN site_notes.site_id IS 'Foreign key to the sites table.';
    COMMENT ON COLUMN site_notes.user_id IS 'Foreign key to the auth.users table; identifies the note author.';
    COMMENT ON COLUMN site_notes.category_id IS 'Foreign key to note_categories, classifying the note.';
    COMMENT ON COLUMN site_notes.content IS 'The textual content of the note.';
    COMMENT ON COLUMN site_notes.like_count IS 'Denormalized count of likes for this note.';

    CREATE INDEX IF NOT EXISTS idx_site_notes_site_id ON site_notes(site_id);
    CREATE INDEX IF NOT EXISTS idx_site_notes_user_id ON site_notes(user_id);
    CREATE INDEX IF NOT EXISTS idx_site_notes_category_id ON site_notes(category_id);

    -- Note Likes table
    CREATE TABLE IF NOT EXISTS note_likes (
      note_id UUID NOT NULL REFERENCES site_notes(id) ON DELETE CASCADE,
      user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      PRIMARY KEY (note_id, user_id)
    );

    COMMENT ON TABLE note_likes IS 'Tracks user likes on site notes; many-to-many relationship.';
    COMMENT ON COLUMN note_likes.note_id IS 'Foreign key to the site_notes table.';
    COMMENT ON COLUMN note_likes.user_id IS 'Foreign key to the auth.users table; identifies the user who liked the note.';
