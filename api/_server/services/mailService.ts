import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.GMAIL_SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.GMAIL_SMTP_PORT) || 465,
    secure: process.env.GMAIL_SMTP_SECURE === 'true',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

console.log(`[MAIL CONFIG] Loaded User: ${process.env.GMAIL_USER}`);
const pass = process.env.GMAIL_PASS || '';
console.log(`[MAIL CONFIG] Loaded Pass: ${pass.substring(0, 3)}...${pass.substring(pass.length - 3)} (Length: ${pass.length})`);

export const sendOTPEmail = async (email: string, code: string) => {
    const mailOptions = {
        from: `RevisionLab <${process.env.GMAIL_USER}>`,
        to: email,
        subject: 'Your RevisionLab Verification Code',
        html: `
            <div style="font-family: sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #ff8c00;">Welcome to RevisionLab!</h2>
                <p>Thank you for joining our learning community. Please use the verification code below to activate your account:</p>
                <div style="background: #f4f4f4; padding: 20px; text-align: center; border-radius: 10px; margin: 20px 0;">
                    <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #007bff;">${code}</span>
                </div>
                <p>This code will expire in 10 minutes. If you did not request this, please ignore this email.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                <p style="font-size: 12px; color: #999;">RevisionLab - Gamified Learning for Malaysia</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email successfully sent to ${email}`);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        const logMsg = `[${new Date().toISOString()}] SENDER: ${process.env.GMAIL_USER} | RECIPIENT: ${email} | ERROR: ${error}\n`;
        fs.appendFileSync('mail_errors.log', logMsg);
        return false;
    }
};
