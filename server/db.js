//////////////// DB.JS //////////////

// const { use } = require("express/lib/application");
const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:postgres:postgres@localhost:5432/social_network` // is this the thing thats wrong??
);

//////////// QUERIES //////////////

module.exports.registerUser = (first, last, email, hashedPass) => {
    return db.query(
        `INSERT INTO users (first, last, email, password) 
        VALUES ($1, $2, $3, $4)
        RETURNING id AS user_id, first, last, email`,
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

module.exports.getUserInfo = (email) => {
    return db.query(
        `SELECT id AS user_id, first, last, email
        FROM users
        WHERE email = $1`,
        [email]
    );
};

module.exports.setSecretCode = (email, secretCode) => {
    return db.query(
        `INSERT INTO secret_codes (email, code)
        VALUES $1, $2
        RETURNING *`,
        [email, secretCode]
    );
};

module.exports.checkSecretCode = (email, secretCode) => {
    return db.query(
        `SELECT code
        FROM secret_codes
        WHERE email = $1
        LIMIT 1`,
        [email, secretCode]
    );
};

// module.exports.updatePass = (email, secretCode) => {
//     return db.query(
//         ``,
//          [email, secretCode]
//     );
// };
