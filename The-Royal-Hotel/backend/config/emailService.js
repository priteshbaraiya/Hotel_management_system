const nodemailer = require('nodemailer');

// Create transporter using Gmail SMTP
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: process.env.EMAIL_PORT || 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

// Send OTP Email
const sendOtpEmail = async (to, otp) => {
    const transporter = createTransporter();

    const mailOptions = {
        from: process.env.EMAIL_FROM || 'The Royal Obsidian <noreply@royalobsidian.com>',
        to: to,
        subject: 'Your Login OTP - The Royal Obsidian',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 10px;">
                <div style="text-align: center; padding: 20px;">
                    <h1 style="color: #d4af37; margin: 0; font-size: 28px;">The Royal Obsidian</h1>
                    <p style="color: #888; margin: 10px 0;">Luxury Hotel & Resort</p>
                </div>
                <div style="background: rgba(255,255,255,0.1); padding: 30px; border-radius: 8px; margin: 20px 0;">
                    <h2 style="color: #fff; text-align: center; margin-bottom: 20px;">Your Login OTP</h2>
                    <div style="background: linear-gradient(135deg, #d4af37 0%, #b5952f 100%); padding: 20px; border-radius: 8px; text-align: center;">
                        <span style="font-size: 36px; letter-spacing: 10px; font-weight: bold; color: #1a1a2e;">${otp}</span>
                    </div>
                    <p style="color: #ccc; text-align: center; margin-top: 20px; font-size: 14px;">
                        This OTP is valid for <strong>10 minutes</strong>.<br>
                        Do not share this code with anyone.
                    </p>
                </div>
                <div style="text-align: center; color: #666; font-size: 12px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
                    <p>If you didn't request this code, please ignore this email.</p>
                    <p>© 2026 The Royal Obsidian. All rights reserved.</p>
                </div>
            </div>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`[EMAIL] OTP sent to ${to}: ${info.messageId}`);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error(`[EMAIL ERROR] Failed to send OTP to ${to}:`, error.message);
        // Fallback: log to console if email fails
        console.log(`[FALLBACK] OTP for ${to}: ${otp}`);
        return { success: false, error: error.message };
    }
};

// Send Password Reset Email
const sendPasswordResetEmail = async (to, resetLink) => {
    const transporter = createTransporter();

    const mailOptions = {
        from: process.env.EMAIL_FROM || 'The Royal Obsidian <noreply@royalobsidian.com>',
        to: to,
        subject: 'Password Reset - The Royal Obsidian',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 10px;">
                <div style="text-align: center; padding: 20px;">
                    <h1 style="color: #d4af37; margin: 0; font-size: 28px;">The Royal Obsidian</h1>
                    <p style="color: #888; margin: 10px 0;">Luxury Hotel & Resort</p>
                </div>
                <div style="background: rgba(255,255,255,0.1); padding: 30px; border-radius: 8px; margin: 20px 0;">
                    <h2 style="color: #fff; text-align: center; margin-bottom: 20px;">Reset Your Password</h2>
                    <p style="color: #ccc; text-align: center;">Click the button below to reset your password:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetLink}" style="background: linear-gradient(135deg, #d4af37 0%, #b5952f 100%); color: #1a1a2e; padding: 15px 40px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">
                            Reset Password
                        </a>
                    </div>
                    <p style="color: #ccc; text-align: center; font-size: 14px;">
                        This link is valid for <strong>30 minutes</strong>.
                    </p>
                </div>
                <div style="text-align: center; color: #666; font-size: 12px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
                    <p>If you didn't request this, please ignore this email.</p>
                    <p>© 2026 The Royal Obsidian. All rights reserved.</p>
                </div>
            </div>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`[EMAIL] Password reset email sent to ${to}: ${info.messageId}`);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error(`[EMAIL ERROR] Failed to send password reset to ${to}:`, error.message);
        console.log(`[FALLBACK] Reset link for ${to}: ${resetLink}`);
        return { success: false, error: error.message };
    }
};

module.exports = {
    sendOtpEmail,
    sendPasswordResetEmail
};
