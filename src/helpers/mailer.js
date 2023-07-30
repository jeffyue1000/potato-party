import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
 
export const sendEmail = async({email, emailType, userID}) => {
    try{
        const hashedToken = await bcryptjs.hash(userID.toString(), 10);

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userID, {
                verifyToken: hashedToken,
                verifyTokenExpiration: Date.now() + 3600000
            });
        }
        else if(emailType === "FORGOT"){ 
            await User.findByIdAndUpdate(userID, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiration: Date.now() + 3600000
            });
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "1b904b919bce3b",
              pass: "8cce3af9a4fe6c"
            }
          });

        const mailOptions = {
            from: "jeffyue1000@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
            html: emailType === "VERIFY" ? 
                    `<p>Click 
                    <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> 
                    to verify your email. Alternatively, copy paste the link below in your browser. 
                    <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                    </p>`
                    :
                    `<p>Click 
                    <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">here</a> 
                    to reset your password. Alternatively, copy paste the link below in your browser. 
                    <br> ${process.env.DOMAIN}/resetpassword?token=${hashedToken}
                    </p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch(error){
        throw new Error(error.message);
    }
}