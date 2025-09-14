-- Solution 1: Complete Database Reset (DEVELOPMENT ONLY)
-- WARNING: This will delete all data!

-- Connect to postgres database first, then run:
DROP DATABASE IF EXISTS zafra;
CREATE DATABASE zafra;

-- Then restart your NestJS application