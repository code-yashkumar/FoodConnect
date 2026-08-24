import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendOtpMail = async (to, otp, name) => {
    const info = await transporter.sendMail({
        from: `"FoodConnect" <${process.env.SMTP_USER}>`,
        to,
        subject: "FoodConnect Password Reset Code",

        // Plain-text fallback
        text: `Hey ${name},

We received a request to reset your FoodConnect password.

Your password reset code is: ${otp}

This code will expire in 5 minutes.

If you didn't request a password reset, you can safely ignore this email. Your password will not be changed.

Thanks,
FoodConnect Team`,

        // HTML version
        html: `
            <div style="
                font-family: Arial, sans-serif;
                max-width: 500px;
                margin: 20px auto;
                padding: 30px;
                background-color: #ffffff;
                color: #333333;
                border: 1px solid #eeeeee;
                border-radius: 12px;
            ">

                <h2 style="
                    color: #4CAF50;
                    margin-bottom: 25px;
                ">
                    FoodConnect
                </h2>

                <h3 style="
                    margin-bottom: 15px;
                    color: #333333;
                ">
                    Hey ${name},
                </h3>

                <p style="
                    font-size: 15px;
                    line-height: 1.6;
                ">
                    We received a request to reset your FoodConnect password.
                    Use the verification code below to continue.
                </p>

                <div style="
                    margin: 30px 0;
                    padding: 18px;
                    text-align: center;
                    background-color: #f1f8f2;
                    border-radius: 8px;
                ">
                    <div style="
                        font-size: 32px;
                        font-weight: bold;
                        letter-spacing: 8px;
                        color: #4CAF50;
                    ">
                        ${otp}
                    </div>
                </div>

                <p style="
                    font-size: 14px;
                    line-height: 1.6;
                ">
                    This code will expire in
                    <strong>5 minutes</strong>.
                </p>

                <p style="
                    color: #777777;
                    font-size: 13px;
                    line-height: 1.6;
                ">
                    If you didn't request a password reset, you can safely
                    ignore this email. Your password will not be changed.
                </p>

                <p style="
                    margin-top: 30px;
                    font-size: 14px;
                    line-height: 1.6;
                ">
                    Thanks,<br />
                    <strong>FoodConnect Team</strong>
                </p>

            </div>
        `,
    });

    console.log("Password reset email sent:", info.messageId);
};