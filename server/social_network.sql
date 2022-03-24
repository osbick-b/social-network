-- drop existing tables
DROP TABLE IF EXISTS secret_codes;
DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS chat;


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
    sender_id      INTEGER NOT NULL REFERENCES users(id),
    recipient_id   INTEGER NOT NULL REFERENCES users(id),
    accepted       BOOLEAN NOT NULL
);


-- new chat table

-- ! active table has SERIAL as data type instead of INTEGER, but as we assign vals to it its ok, i won't drop it now

CREATE TABLE chat (
    id             SERIAL PRIMARY KEY,
    id_convo       INTEGER UNIQUE,
    id_sender      INTEGER NOT NULL REFERENCES users(id),
    id_recipient   INTEGER REFERENCES users(id),
    message        VARCHAR NOT NULL,
    files          VARCHAR,
    timestamp      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO chat (id_sender, message) VALUES (199, 'Hey you all');
INSERT INTO chat (id_sender, id_recipient, message) VALUES (199, 43, 'This is a test');
INSERT INTO chat (id_sender, id_recipient, message) VALUES (199, 43, 'oh no');
INSERT INTO chat (id_sender, message) VALUES (199, 'who cares');
INSERT INTO chat (id_sender, message) VALUES (199, 'lalala');




-- INSERT INTO users (first, last, email, password, bio) VALUES ('Lcn', 'Csl', 'lcn@csl', 'lcncsl', 'i was born on my bday');
-- INSERT INTO secret_codes (email,code) VALUES ('rue123@example.com', 'sl12uifdosj');

-- INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (199,1,false);
-- INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (199,5,false);
-- INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (199,6,false);
-- INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (2, 199,false);
-- INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (3,199,false);
-- INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (44,199, true);
-- INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (74,199, true);
-- INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (199,95, true);