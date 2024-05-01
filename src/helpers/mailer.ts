import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import User from '@/models/user.model';

export const sendMail = async ({email, emailType, userID}: any) => {
    try {
        let user = undefined;
        const hashedToken = await bcryptjs.hash(userID.toString(), 10);

        if ( emailType === "Verification" ) {
            user = await User.findByIdAndUpdate( userID,
                {
                    $set: {
                        verifyToken: hashedToken,
                        verifyTokenExpiry: Date.now() + 3600000
                    }
                }
            )
        }
        else if ( emailType === "Reset" ) {
            user = await User.findByIdAndUpdate( userID,
                {
                    $set: {
                        forgotPasswordToken: hashedToken,
                        forgotPasswordTokenExpiry: Date.now() + 3600000
                    }
                }
            )
        }

        let transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "9be6355e30008f",
              pass: "1f9e95a0ca2d4c"
            }
        });

        const mailOption = {
            from: 'nextauthmail.io',
            to: email,
            subject: `${emailType} mail`,
            html: `<p>Hello ${user.username}
                Here is your verify email link <br>
                <h4>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</h4>
            </p>`
        };

        const info = await transport.sendMail(mailOption);

        console.log(info);

        return info;

    } 
    catch (error: any) {
        console.log('Could not send email.')
        console.log(error.message)
    }
}