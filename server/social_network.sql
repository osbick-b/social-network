-- drop existing tables
DROP TABLE IF EXISTS users;


-- new users table
CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    first       VARCHAR NOT NULL,
    last        VARCHAR NOT NULL,
    email       VARCHAR NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL CHECK (password != '')
);


-- INSERT INTO users (first, last, email, password) VALUES ('Lcn', 'Csl', 'lcn@csl', 'lcncsl');