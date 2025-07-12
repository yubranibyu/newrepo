-- Crear ENUM
CREATE TYPE public.account_type AS ENUM (
    'Client',
    'Employee',
    'Admin'
);

-- Asignar propietario (cambia your_db_user al usuario real de tu base)
ALTER TYPE public.account_type OWNER TO your_db_user;

-- Crear tablas
CREATE TABLE public.account (
    account_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(100),
    account_type account_type
);

CREATE TABLE public.classification (
    classification_id SERIAL PRIMARY KEY,
    classification_name VARCHAR(50) NOT NULL
);

CREATE TABLE public.inventory (
    inventory_id SERIAL PRIMARY KEY,
    inv_make VARCHAR(50),
    inv_model VARCHAR(50),
    inv_description TEXT,
    inv_image TEXT,
    inv_thumbnail TEXT,
    classification_id INT REFERENCES classification(classification_id)
);

-- Insertar datos en classification
INSERT INTO public.classification (classification_name)
VALUES ('Sport'), ('Truck'), ('SUV');

-- Insertar datos en inventory
INSERT INTO public.inventory (inv_make, inv_model, inv_description, inv_image, inv_thumbnail, classification_id)
VALUES
  ('GM', 'Hummer', 'This vehicle has small interiors', '/images/hummer.jpg', '/images/hummer-thumb.jpg', 2),
  ('Ford', 'Mustang', 'A sports car', '/images/mustang.jpg', '/images/mustang-thumb.jpg', 1);

-- Queries #4 y #6 del Assignment 2

-- Query #4
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- Query #6
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');
