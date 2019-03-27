DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(

    id INT NOT NULL,

    product_name VARCHAR(30) NOT NULL,

    department_name VARCHAR(30) NOT NULL,

    price DECIMAL(6,2) NOT NULL,

    stock_quantity INT(4) NOT NULL

);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES  (1, "Mighty Sword", "Weapon", 100, 27);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (2, "Wicked Boots", "FootWear", 50, 10);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (3, "Leagendary Ring", "Jewlery", 700, 50);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (4, "Singing Dagger", "Weapon", 250, 12);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (5, "Panicky Sneakers", "FootWear", 75, 36);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (6, "Itchy Helmet", "HeadWear", 5, 100);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (7, "Quaint Crown", "HeadWear", 900, 10);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (8, "Blinding Neckalace", "Jewlery", 1200, 15);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (9, "Obedient Wand", "Weapon", 2400, 40);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (10, "Victorious Shield", "Armour", 600, 8);