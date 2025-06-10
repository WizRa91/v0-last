-- Enable necessary extensions
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE EXTENSION IF NOT EXISTS "postgis";

    COMMENT ON EXTENSION "uuid-ossp" IS 'Provides functions to generate UUIDs.';
    COMMENT ON EXTENSION "postgis" IS 'Adds support for geographic objects to PostgreSQL.';
