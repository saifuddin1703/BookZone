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
    // sendEmail(email, subject, message) {
    //   ApiClient.apiKey = process.env.SEND_IN_BLUE_API_KEY;
    //   return new Promise((resolve, reject) => {
    //   console.log('line 13');
    //   const sendinblue = new SibApiV3Sdk.TransactionalEmailsApi();

    //   console.log('line 17');
    //   console.log(process.env.EMAIL)

    //   sendinblue.sendTransacEmail({
    //     sender: {
    //       name: 'BookZone',
    //       email: process.env.EMAIL
    //     },
    //     to: [
    //       {
    //         email: email,
    //         name: 'BookZone'
    //       }
    //     ],
    //     subject: subject,
    //     htmlContent: message,
    //     templateId: 1
    //     // htmlContent: message,
    //     // params: {
    //     //   subject: subject,
    //     //   message : message
    //     // }
    //   }).then(function(data) {
    //     console.log('API called successfully. Returned data: ' + data);
    //     resolve(data);
    //     }, function(error) {
    //       console.error(error);
    //       reject(error);
    //       }); 
    //   });
    // }
};