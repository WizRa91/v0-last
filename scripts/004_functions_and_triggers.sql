-- Utility Functions and Triggers

    -- Like counter maintenance for site_notes
    CREATE OR REPLACE FUNCTION inc_note_like()
    RETURNS TRIGGER AS $$
    BEGIN
      UPDATE site_notes
        SET like_count = like_count + 1
      WHERE id = NEW.note_id;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;

    CREATE OR REPLACE TRIGGER note_like_inc
    AFTER INSERT ON note_likes
    FOR EACH ROW EXECUTE PROCEDURE inc_note_like();

    COMMENT ON FUNCTION inc_note_like IS 'Increments the like_count on site_notes when a new like is inserted.';
    COMMENT ON TRIGGER note_like_inc ON note_likes IS 'Trigger to increment like_count after a like is added.';

    CREATE OR REPLACE FUNCTION dec_note_like()
    RETURNS TRIGGER AS $$
    BEGIN
      UPDATE site_notes
        SET like_count = like_count - 1
      WHERE id = OLD.note_id;
      RETURN OLD;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;

    CREATE OR REPLACE TRIGGER note_like_dec
    AFTER DELETE ON note_likes
    FOR EACH ROW EXECUTE PROCEDURE dec_note_like();

    COMMENT ON FUNCTION dec_note_like IS 'Decrements the like_count on site_notes when a like is removed.';
    COMMENT ON TRIGGER note_like_dec ON note_likes IS 'Trigger to decrement like_count after a like is deleted.';

    -- NOTE: The DDL for `award_quiz_aurei()`, `award_rebus_aurei()` triggers,
    -- and the `spend_aurei()` helper function are mentioned to be in "Appendix B"
    -- or section 5.2 of the design document. However, their full DDL is not provided
    -- in the excerpt. You will need to add these function and trigger definitions
    -- manually based on the full design document.
    --
    -- Example structure for an awarding trigger function (conceptual):
    /*
    CREATE OR REPLACE FUNCTION award_quiz_aurei_trigger_function()
    RETURNS TRIGGER AS $$
    BEGIN
      IF NEW.is_correct = TRUE AND NEW.user_id IS NOT NULL THEN
        NEW.aurei_earned := 5; -- Or some configurable value

        -- Insert into aurei_transactions
        INSERT INTO aurei_transactions (user_id, amount, transaction_type, related_id, description)
        VALUES (NEW.user_id, NEW.aurei_earned, 'quiz_reward', NEW.id, 'Reward for correct quiz: ' || (SELECT name FROM quiz_questions WHERE id = NEW.quiz_question_id));

        -- Update user_aurei_balance
        INSERT INTO user_aurei_balance (user_id, balance, last_updated_at)
        VALUES (NEW.user_id, NEW.aurei_earned, NOW())
        ON CONFLICT (user_id) DO UPDATE
        SET balance = user_aurei_balance.balance + NEW.aurei_earned,
            last_updated_at = NOW();
      END IF;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;

    CREATE OR REPLACE TRIGGER award_quiz_aurei_trigger
    BEFORE UPDATE OF is_correct ON user_quiz_attempts -- Or AFTER INSERT if is_correct is set on insert
    FOR EACH ROW
    WHEN (OLD.is_correct IS DISTINCT FROM NEW.is_correct AND NEW.is_correct = TRUE)
    EXECUTE PROCEDURE award_quiz_aurei_trigger_function();
    */
