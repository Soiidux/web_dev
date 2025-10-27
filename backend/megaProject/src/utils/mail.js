import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { SMTP_HOST, SMTP_PASS, SMTP_PORT, SMTP_SENDER, SMTP_USER } from "./env_constants.js";
import ApiError from "./api-errors.js";

/**
 * Sends an email with nodemailer and Mailgen.
 * 
 * @param {Object} options
 * @param {string} options.email - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {Object} options.mailGenContent - Email content in Mailgen format
 * @throws Throws an ApiError on failure
 */
export const sendEmail = async (options)=>{
    const mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            // Appears in header & footer of e-mails
            name: 'Task Manager',
            link: 'https://mailgen.js/'
            // Optional product logo
            // logo: 'https://mailgen.js/img/logo.png'
        }
    });
    // Generate an HTML email with the provided contents
    var emailHTML = mailGenerator.generate(options.mailGenContent);
    // Generate the plaintext version of the e-mail (for clients that do not support HTML)
    var emailText = mailGenerator.generatePlaintext(options.mailGenContent);

    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: false,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS
        },
    });

    const mailOptions = {
        from: `'Task Manager' <${SMTP_SENDER}>`,
        to: options.email,
        subject: options.subject,
        text: emailText,
        html: emailHTML
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.log("Error while sending email: ", error);
        throw new ApiError(500,"Email could not be sent",error);
    }

} 

/**
 * Returns MailGenContent for Email Verification
 * @param {*} username 
 * @param {*} verificationUrl 
 * @returns MailGenContent for MailGen to use
 */
export const emailVerificationMailGenContent = (username,verificationUrl)=>{
    return {
        body : {
            name : username,
            intro: "Welcome to Task Manager! We're very excited to have you on board.",
            action: {
                instructions: "To get started with Task Manager, please click here:",
                button: {
                    color: "#22BC66",
                    text: "Verify your account",
                    link: verificationUrl
                }
            },
            outro:"Need help, or have questions? Just reply to this email, we'd love to help."
        }
    }
};

/**
 * Returns MailGenContent for Password Reset
 * @param {*} username 
 * @param {*} verificationUrl 
 * @returns MailGenContent for MailGen to use
 */
export const passwordResetMailGenContent = (username,resetUrl)=>{
    return {
        body : {
            name : username,
            intro: "You have requested to reset your password, if this wasnt done by you, please ignore this email.",
            action: {
                instructions: "To reset your password, please click here:",
                button: {
                    color: "#22BC66",
                    text: "Reset your password",
                    link: resetUrl
                }
            },
            outro:"Need help, or have questions? Just reply to this email, we'd love to help."
        }
    }
};
