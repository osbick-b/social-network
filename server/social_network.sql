-- drop existing tables
DROP TABLE IF EXISTS secret_codes;
DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS users;


-- new users table
CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    first       VARCHAR NOT NULL,
    last        VARCHAR NOT NULL,
    email       VARCHAR NOT NULL UNIQUE,
    profile_pic VARCHAR,
    bio         VARCHAR,
    password    VARCHAR(255) NOT NULL CHECK (password != '')
);


-- new  secret_codes table
CREATE TABLE  secret_codes (
    id          SERIAL PRIMARY KEY,
    email       VARCHAR NOT NULL REFERENCES users(email),
    code        VARCHAR(255) NOT NULL,
    timestamp   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- new friendships table
CREATE TABLE friendships (
    id             SERIAL PRIMARY KEY,
    sender_id      SERIAL NOT NULL REFERENCES users(id),
    recipient_id   SERIAL NOT NULL REFERENCES users(id),
    accepted       BOOLEAN NOT NULL
);

-- INSERT INTO users (first, last, email, password, bio) VALUES ('Lcn', 'Csl', 'lcn@csl', 'lcncsl', 'i was born on my bday');
INSERT INTO secret_codes (email,code) VALUES ('rue123@example.com', 'sl12uifdosj');

INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (199,1,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (199,5,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (199,6,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (2, 199,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (3,199,false);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (44,199, true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (74,199, true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (199,95, true);