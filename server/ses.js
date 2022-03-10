

const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env;
} else {
    secrets = require("./secrets.json");
}


const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-west-1", // Make sure this corresponds to the region in which you have verified your email address (or 'eu-west-1' if you are using the Spiced credentials)
});


exports.sendEmail = function(recipient, message,subject) {
    return ses
        .sendEmail({
            Source: ``,
            Destination: {
                ToAddresses: [recipient],
            },
            Message: {
                Body: {
                    Text: {
                        Data: [message] || ""
                    }
                },
                Subject: {
                    Data: [subject] || ""
                },
            },

        });
}







