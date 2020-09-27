const nodemailer = require("nodemailer");
const fs = require("fs");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
     "351238074342-9sis2ffivi2pumod3lqn3g7kfa8gm0og.apps.googleusercontent.com",
     "oMNqOoNXilkYGqjZCGw_4p3n", // Client Secret
     "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
     refresh_token: "1//04opEjD1UhD0YCgYIARAAGAQSNwF-L9IruPBZQmMuiUnwB33LBjrAFf_pfy_g50og8tPgR72ARfGMUjWgHW97fEj-5ek5QOITbs8"
});
configPath = './credentials.json';
var parsed = JSON.parse(fs.readFileSync(configPath, 'UTF-8'));
exports.storageConfig=  parsed;
console.log(parsed.installed.auth.type);


const accessToken = oauth2Client.getAccessToken()
const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: 
    {
      type: parsed.installed.auth.type,
      user: parsed.installed.auth.user,
      clientId: parsed.installed.auth.lientId,
      clientSecret: parsed.installed.auth.clientSecret,
      refreshToken: parsed.installed.auth.refreshToken,
      accessToken: accessToken
    }
});

tls: {
  rejectUnauthorized: false
}
const mailOptions = {
     from: "jha.as@somaiya.edu",
     to: "arnav.mahajan@somaiya.edu",
     subject: "Node.js Email with Secure OAuth",
     generateTextFromHTML: true,
     html: "<b>test</b>"
};

smtpTransport.sendMail(mailOptions, (error, response) => {
     error ? console.log(error) : console.log(response);
     smtpTransport.close();
});