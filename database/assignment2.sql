-- ===========================================
-- Assignment 2 - Task One
-- SQL Statements for CRUD and Queries
-- ===========================================

-- 1. Insert the new record for Tony Stark
INSERT INTO customers (first_name, last_name, email, account_type)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Customer');

-- 2. Modify Tony Stark's account_type to "Admin"
UPDATE customers
SET account_type = 'Admin'
WHERE email = 'tony@starkent.com';

-- 3. Delete Tony Stark's record from the database
DELETE FROM customers
WHERE email = 'tony@starkent.com';

-- 4. Modify the GM Hummer description from "small interiors" to "a huge interior"
UPDATE products
SET description = REPLACE(description, 'small interiors', 'a huge interior')
WHERE product_name = 'GM Hummer';

-- 5. Inner Join to select make and model fields from inventory table
--     and classification name field from classification table
--     for inventory items that belong to the "Sport" category

-- NOTE:
-- In your DB, category is stored directly in products table,
-- so we use WHERE category = 'Sport'

SELECT product_name AS make,
       product_name AS model,
       category AS classification_name
FROM products
WHERE category = 'Sport';

-- 6. Update all records in products table to add "/vehicles" to the middle
--     of the file path in image_path and thumbnail_path columns

UPDATE products
SET
  image_path = REPLACE(image_path, '/images/', '/images/vehicles/'),
  thumbnail_path = REPLACE(thumbnail_path, '/images/', '/images/vehicles/');
