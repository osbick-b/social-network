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
module.exports.upsertBio = (user_id, bioInput) => {
    console.log(`user_id, bioInput`, user_id, bioInput);
    return db.query(
        `UPDATE users
        SET bio = $2
        WHERE id = $1
        RETURNING bio`,
        [user_id, bioInput]
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
