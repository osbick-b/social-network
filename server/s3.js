const fln = "s3.js";
///////////////////////////////////


const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env;
} else {
    secrets = require("./secrets");
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

// ----- Fns ------ //
exports.upload = (req, res, next) => {
    console.log(`>>> ${fln} > req.body:`, req.body); // --- !!! ERROR VISIBLE HERE
    // error is in multer: is not generating req.file. I can't seem to be able to log things inside multer either to see whar's going on (server.js)
    // in req.body we see --> file: 'C:\\fakepath\\Open Peeps - Bust.png' --> is the \\fakepath\\ the issue? or is it just visualization?
    // or why can't multer do its thing??
    // there were vulnerabilities in instalation, may that be the thing?
    console.log("req.body.file", req.body.file);
    console.log("req.file", req.file);

    if (!req.file) {
        console.log("Multer failed!");
        return res.sendStatus(500);
    }

    const { filename, mimetype, size, path } = req.file;

    s3.putObject({
        Bucket: "spicedling",
        ACL: "public-read",
        Key: filename,
        Body: fs.createReadStream(path),
        ContentType: mimetype,
        ContentLength: size,
    })
        .promise()
        .then(() => {
            next();
        })
        .catch((err) => {
            console.log("error in s3.js -- putObject", err);
            return res.sendStatus(500);
        });
};
