-- drop existing tables
DROP TABLE IF EXISTS secret_codes;
DROP TABLE IF EXISTS users;


-- new users table
CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    first       VARCHAR NOT NULL,
    last        VARCHAR NOT NULL,
    email       VARCHAR NOT NULL UNIQUE,
    profile_pic VARCHAR,
    password    VARCHAR(255) NOT NULL CHECK (password != '')
);


-- new  secret_codes table
CREATE TABLE  secret_codes (
    id          SERIAL PRIMARY KEY,
    email       VARCHAR NOT NULL REFERENCES users(email),
    code        VARCHAR(255) NOT NULL,
    timestamp   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO users (first, last, email, password) VALUES ('Lcn', 'Csl', 'lcn@csl', 'lcncsl');
INSERT INTO secret_codes (email,code) VALUES ('lcn@csl', 'sl12uifdosj');