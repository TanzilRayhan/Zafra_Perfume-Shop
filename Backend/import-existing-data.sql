-- Import all existing data into the fresh database
-- Run this script in your PostgreSQL database

-- 1. Insert Perfumes Data
INSERT INTO "perfumes" ("id", "name", "price", "discount", "description", "category", "brand", "stock", "image") VALUES
('5c30e461-547e-4fa9-9129-c6439ff815cf', 'Chanel Bleu de Chanel', 120.00, 10.00, 'A fresh, woody fragrance for men.', 'Men', 'Chanel', 50, 'https://media.theperfumeshop.com/medias/sys_master/prd-images/h39/h89/8818534121502/zoom-front-1151299_420x420/chanel-bleu-de-chanel-eau-de-parfum-spray-420x420'),
('882752cf-173d-4b87-96e7-fddad2c852c8', 'Dior Sauvage', 130.00, 15.00, 'A bold and fresh scent with spicy notes.', 'Men', 'Dior', 40, 'https://media.theperfumeshop.com/medias/sys_master/prd-images/h39/h89/8818534121502/zoom-front-1151299_420x420/chanel-bleu-de-chanel-eau-de-parfum-spray-420x420'),
('fbdc15d5-21de-457b-9f20-9774fbf86f7a', 'Gucci Bloom', 110.00, 5.00, 'A rich, floral fragrance for women.', 'Women', 'Gucci', 60, 'https://media.theperfumeshop.com/medias/sys_master/prd-images/h39/h89/8818534121502/zoom-front-1151299_420x420/chanel-bleu-de-chanel-eau-de-parfum-spray-420x420'),
('33cf1d91-810e-4397-b200-6ac1814bbba9', 'Yves Saint Laurent Libre', 115.00, 8.00, 'A daring and sophisticated fragrance for women.', 'Women', 'YSL', 55, 'https://media.theperfumeshop.com/medias/sys_master/prd-images/h39/h89/8818534121502/zoom-front-1151299_420x420/chanel-bleu-de-chanel-eau-de-parfum-spray-420x420');

-- 2. Insert Customer Data
INSERT INTO "customer" ("id", "fullName", "phone", "email", "address", "password", "role") VALUES
('5c9ff4bb-ffa7-463b-933f-a10dea40bb27', 'this is a test user 2', 13213131, 'testuser2@gmail.com', 'NY,US', '$2b$10$4/OSfID4ZsvzxgZn9k3IsuUf2eDsROCvpZcZAOMX2oekQdCC1BPt.', 'customer'),
('29f1518e-ecc0-4cb7-9a91-9f1068fc76e8', 'Tafsirul islam shafin', 123457, 'shafin3024344@gmail.com', 'NY,US', '$2b$10$5shto14SsrUteZ8Cr1OmgekuOkBJMoAFX3gMsfGt3KE1p47Upts8e', 'customer'),
('bcc76346-bea9-4d12-9d82-a2fc4fcce08e', 'demo3', 112311, 'testuser3@gmail.com', 'NY,US', '$2b$10$LexegvChbJmzflx.sziLDuo2dJGKMGA78tPtmNEjl.si47cNDrqoK', 'customer'),
('fb9b2c15-868d-40b0-bb9e-35894b18a34f', 'Tafsirul Islam', 158521993, 'shafin@gmail.com', '20/A wes matikata , Dhaka cantonment', '$2b$10$i5Abw/d2Ect7ESrgZI0Ih.vTskkb3RZ.dbBGABphEVYGp3N68oMyO', 'user'),
('366195b7-5ec9-4f15-9925-ba36acd54d48', 'tanzil', 17111111111, 'tanzil@email.com', 'Dhaka', '$2b$10$NeJse6cJYuXUsD.Mqfj9muZoav0ONOVTajTVeUiECLTaOZEX6yHi2', 'user');

-- 3. Insert Admin Users Data
INSERT INTO "users" ("id", "name", "email", "password", "role") VALUES
(1, 'Tanzil Rayhan', 'tanzil@email.com', '$2b$10$BT.sFVFWQRPxGba2VKut4eCh9QH8yrGZRHWtQvQv0riKKUv/L/iOG', 'admin'),
(2, 'Rimon', 'rimon@email.com', '$2b$10$JcqFG2qiMMUW0Mp9BtgdG.uyR5n/Apf4r0GTasoVZZ9dcR5ch.3U.', 'manager');

-- Optional: Reset the sequence for users table if needed
-- SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));

COMMIT;