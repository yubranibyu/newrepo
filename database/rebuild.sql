-- ===========================================
-- rebuild.sql
-- Database rebuild script for Sayer Project
-- ===========================================

-- ==============================
-- Drop Tables if they exist
-- ==============================
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS customers CASCADE;

-- Drop Types if they exist
DO $$ BEGIN
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'account_type') THEN
        DROP TYPE account_type;
    END IF;
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'product_category') THEN
        DROP TYPE product_category;
    END IF;
END $$;

-- ==============================
-- Create Types
-- ==============================

-- Create ENUM type for account_type
CREATE TYPE account_type AS ENUM ('Admin', 'Customer');

-- Create ENUM type for product_category
CREATE TYPE product_category AS ENUM ('Sport', 'SUV', 'Sedan');

-- ==============================
-- Create Tables
-- ==============================

CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    account_type account_type
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    category product_category,
    price DECIMAL(10,2),
    description VARCHAR(255),
    image_path VARCHAR(255),
    thumbnail_path VARCHAR(255)
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(customer_id),
    product_id INTEGER REFERENCES products(product_id),
    quantity INTEGER
);

-- ==============================
-- Insert initial data
-- ==============================

-- Insert product GM Hummer
INSERT INTO products (product_name, category, price, description, image_path, thumbnail_path)
VALUES ('GM Hummer', 'Sport', 60000.00, 'small interiors', '/images/gm-hummer.jpg', '/images/gm-hummer-thumb.jpg');

-- Insert an example customer if you wish
INSERT INTO customers (first_name, last_name, email, account_type)
VALUES ('Peter', 'Parker', 'peter@dailybugle.com', 'Customer');

-- ===========================================
-- Queries from Assignment 2 Task One
-- ===========================================

-- #4 Modify GM Hummer description from "small interiors" to "a huge interior"
UPDATE products
SET description = REPLACE(description, 'small interiors', 'a huge interior')
WHERE product_name = 'GM Hummer';

-- #6 Update image_path and thumbnail_path to add "/vehicles"
UPDATE products
SET
  image_path = REPLACE(image_path, '/images/', '/images/vehicles/'),
  thumbnail_path = REPLACE(thumbnail_path, '/images/', '/images/vehicles/');
