-- Solution 2: Fix existing data without losing it
-- Run these commands in your PostgreSQL database

-- Step 1: Update null totalPrice values in cartProduct table
UPDATE "cartProduct" 
SET "totalPrice" = 0.00 
WHERE "totalPrice" IS NULL;

-- Step 2: Update null values in cart table if any
UPDATE "cart" 
SET "totalPrice" = 0.00 
WHERE "totalPrice" IS NULL;

-- Step 3: Check for any other null issues
SELECT table_name, column_name 
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND is_nullable = 'NO' 
AND table_name IN ('cartProduct', 'cart', 'order', 'orderProduct');

-- After running these, restart your NestJS application