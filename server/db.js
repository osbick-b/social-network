
//////////////// DB.JS //////////////

// const { use } = require("express/lib/application");
const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:postgres:postgres@localhost:5432/social_network` // is this the thing thats wrong??
);


//////////// QUERIES ////////////// 

module.exports.registerUser = (first, last, email, password) => {
    return db.query(
        `INSERT INTO users (first, last, email, password) 
        VALUES ($1, $2, $3, $4)
        RETURNING (id, first, last, email)`,
        [first, last, email, password]
    );
};