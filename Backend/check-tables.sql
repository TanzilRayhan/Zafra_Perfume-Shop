-- Check all tables in your database
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Check for specific tables that might need to be dropped
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('products', 'admin_products', 'admin_users', 'managers', 'product_categories', 'admin_reviews')
ORDER BY table_name;