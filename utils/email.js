const nodemailer = require('nodemailer'); 
const pug = require('pug');

module.exports = class Email{
    constructor(user){
        let firstname = "user"; 
        if(user.name){
            firstname = user.name.split(" ")[0]; 
        }

        this.user = user; 
        this.firstname = firstname; 
    }
    
    createTransporter(){
        return  nodemailer.createTransport({
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
    }
    /**
     * {
            from: process.env.EMAIL,
            to: email,
            subject: subject,
            text: message,
        }
     */

    async sendEmail(mailOptions) {
        await this.createTransporter().sendMail(mailOptions);
      }

    async sendPassowrdResetMail(otp){
        const template = pug.compileFile(`${__dirname}/../templates/passwordReset.pug`);
        const html = template({
            otp : otp
        });

        console.log(html); 
        const mailOptions = {
            from: process.env.EMAIL,
            to: this.user.email,
            subject: 'Password Reset',
            html : html
        }

        await this.sendEmail(mailOptions);
    }

}