const nodemailer = require('nodemailer');
const SibApiV3Sdk = require('sib-api-v3-sdk');
// console.log('line 1' + process.env.EMAIL);
const ApiClient = SibApiV3Sdk.ApiClient.instance.authentications['api-key']

module.exports = {
    isEmail(emailAdress){
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
      return regex.test(emailAdress);
    },

    sendEmail(email, subject, message) {
      return new Promise((resolve, reject) => {
        console.log('line 13');
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          host : 'smtp.gmail.com',
          port : 465,
          secure : true,
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
            clientid: process.env.OAUTH_CLIENTID,
            clientsecret: process.env.OAUTH_CLIENT_SECRET,
            refreshtoken: process.env.OAUTH_REFRESH_TOKEN,
          }
        });

          transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: subject,
            text: message,
          }, (err, info) => {
            if (err) {
              return reject(err);
            }

            return resolve(info);
          });
        });
      
    }
};