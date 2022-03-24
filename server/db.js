const fln = "db.js";
///////////////////////////////////

//////////////// DB.JS //////////////

// const { use } = require("express/lib/application");
const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:postgres:postgres@localhost:5432/social_network` // is this the thing thats wrong??
);

//////////// QUERIES //////////////

// ======== Register & Login ======= //

module.exports.registerUser = (first, last, email, hashedPass) => {
    return db.query(
        `INSERT INTO users (first, last, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id AS user_id`,
        [first, last, email, hashedPass]
    );
};

module.exports.getUserPass = (email) => {
    return db.query(
        `SELECT password as stored_pass
        FROM users
        WHERE email = $1`,
        [email]
    );
};

module.exports.getUserId = (email) => {
    return db.query(
        `SELECT id AS user_id
            FROM users
            WHERE email = $1`,
        [email]
    );
};

// ======== Once Logged In ======= //

module.exports.getUserData = (user_id) => {
    return db.query(
        `SELECT id AS user_id, first, last, email, profile_pic, bio
        FROM users
        WHERE id = $1`,
        [user_id]
    );
};

// ======== Reset Password ======= //

module.exports.storeSecretCode = (email, secretCode) => {
    return db.query(
        `INSERT INTO secret_codes (email, code)
        VALUES ($1, $2)
        RETURNING email`,
        [email, secretCode]
    );
};

module.exports.getSecretCode = (email) => {
    // +++ add timestamp thingie
    return db.query(
        `SELECT code AS stored_code, email, id AS code_id
        FROM secret_codes
        WHERE email = $1
        ORDER BY id DESC
        LIMIT 1`,
        [email]
    );
};

module.exports.updatePass = (email, newPass) => {
    return db.query(
        `UPDATE users
        SET password = $2
        WHERE email = $1
        RETURNING email`,
        [email, newPass]
    );
};

// ======== Profile Pic ======= //

module.exports.storeProfilePic = (user_id, newPicInput) => {
    // try to do it with an update query 1st -- will it insert if no value yet?
    return db.query(
        `UPDATE users
        SET profile_pic = $2
        WHERE id = $1
        RETURNING profile_pic`,
        [user_id, newPicInput]
    );
};

// ======== Edit Bio ===== //
module.exports.upsertBio = (user_id, bio) => {
    console.log(`in DB >> user_id, bio`, user_id, bio);
    return db.query(
        `UPDATE users
        SET bio = $2
        WHERE id = $1
        RETURNING bio`,
        [user_id, bio]
    );
};

module.exports.updateUserInfo = (first, last, email, user_id) => {
    return db.query(
        `UPDATE users
        SET first = $1, last = $2, email = $3
        WHERE id = $4
        RETURNING first, last, email`,
        [first, last, email, user_id]
    );
};

// ======== Find Other Users ======= //

module.exports.findRecentUsers = () => {
    return db.query(
        `SELECT id AS user_id, first, last, email, profile_pic, bio
        FROM users
        ORDER BY id DESC
        LIMIT 4`
    );
};

module.exports.findMatchingUsers = (searchInput) => {
    return db.query(
        `SELECT id AS user_id, first, last, email, profile_pic, bio
        FROM users
        WHERE (first ILIKE $1) OR (last ILIKE $1) OR (id = $2)
        LIMIT 4`,
        ["%" + searchInput + "%", +searchInput]
    );
};

// ======== Friendship Requests ======= //

module.exports.getFriendshipStatus = (my_id, other_user_id) => {
    console.log(
        `>>> ${fln} >> getFriendshipStatus > my_id, other_user_id:`,
        my_id,
        other_user_id
    );
    return db.query(
        `SELECT * FROM friendships
        WHERE (sender_id = $1 AND recipient_id = $2) 
        OR (sender_id = $2 AND recipient_id = $1)`,
        [my_id, other_user_id]
    );
};

module.exports.makeFriendshipRequest = (my_id, other_user_id) => {
    return db.query(
        `INSERT INTO friendships (sender_id, recipient_id, accepted)
            VALUES ($1, $2, false)
            RETURNING sender_id, recipient_id, accepted`,
        // RETURNING *`,
        [my_id, other_user_id]
    );
};

module.exports.acceptFriendshipRequest = (my_id, other_user_id) => {
    return db.query(
        `UPDATE friendships
            SET accepted = true
            WHERE recipient_id = $1 AND sender_id = $2
            RETURNING sender_id, recipient_id, accepted`,
        // RETURNING *`,
        [my_id, other_user_id]
    );
};

module.exports.cancelFriendship = (my_id, other_user_id) => {
    console.log("DB >>>>> cancelFriendship");
    return db.query(
        `DELETE FROM friendships
        WHERE (sender_id = $1 AND recipient_id = $2) 
        OR (sender_id = $2 AND recipient_id = $1)`,
        // RETURNING id`,
        [my_id, other_user_id]
    );
};

// ======== Get Friends Lists ======= //
module.exports.getAllFriendsAndPending = (my_id) => {
    return db.query(
        `SELECT friendships.id AS friendship_id, friendships.accepted, friendships.sender_id, friendships.recipient_id,
         users.id AS user_id, users.profile_pic, users.first, users.last
        FROM friendships
        JOIN users
        ON (sender_id = $1 AND recipient_id = users.id)
        OR (sender_id = users.id AND recipient_id = $1)`,
        [my_id]
    );
};

// --- Get User Friends
module.exports.getUserFriends = (user_id) => {
    return db.query(
        `SELECT users.id AS user_id, users.profile_pic, users.first, users.last
        FROM users
        JOIN friendships
        ON (friendships.accepted = true AND sender_id = $1 AND recipient_id = users.id)
        OR (friendships.accepted = true AND sender_id = users.id AND recipient_id = $1)
        `,
        [user_id]
    );
};

// -- Get Mutual Friends
module.exports.getMutualFriends = (other_user_id, my_id) => {
    return db.query(
        `SELECT users.id AS user_id, users.profile_pic, users.first, users.last
        FROM users
        JOIN friendships
        ON (friendships.accepted = true AND sender_id = $1 AND recipient_id = users.id)
        OR (friendships.accepted = true AND sender_id = users.id AND recipient_id = $1)
        WHERE users.id IN (
            SELECT users.id 
        FROM users
        JOIN friendships
        ON (friendships.accepted = true AND sender_id = $2 AND recipient_id = users.id)
        OR (friendships.accepted = true AND sender_id = users.id AND recipient_id = $2)
        )`,
        [other_user_id, my_id]
    );
};

// ======== Else ======= //

// module.exports.setSecretCode = (email, secretCode) => {
//     return db.query(
//         `INSERT INTO secret_codes (email, code)
//         VALUES $1, $2
//         RETURNING *`,
//         [email, secretCode]
//     );
// };

// module.exports.checkSecretCode = (email, secretCode) => {
//     return db.query(
//         `SELECT code
//         FROM secret_codes
//         WHERE email = $1
//         LIMIT 1`,
//         [email, secretCode]
//     );
// };

// module.exports.updatePass = (email, secretCode) => {
//     return db.query(
//         ``,
//          [email, secretCode]
//     );
// };
