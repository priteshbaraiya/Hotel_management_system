const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendOtpEmail, sendPasswordResetEmail } = require('../config/emailService');

// Generate JWT Helper
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '30d'
    });
};

// @route   POST api/auth/register
// @desc    Register a new user (Guest)
// @access  Public
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, phone, address } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const crypto = require('crypto');
        const verificationToken = crypto.randomBytes(20).toString('hex');

        user = new User({
            firstName,
            lastName,
            email,
            password,
            phone,
            address,
            role: 'guest',
            isVerified: true // Auto-verify
        });

        await user.save();

        res.status(201).json({
            msg: 'Registration successful. You can now login.'
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token (or request OTP)
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // OTP verification will serve as email verification for Guest/Staff

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Login directly for all users
        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role)
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



// @route   POST api/auth/forgot-password
// @desc    Send password reset email
// @access  Public
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'No account with that email exists' });
        }

        const crypto = require('crypto');
        const resetToken = crypto.randomBytes(20).toString('hex');

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 30 * 60 * 1000; // 30 minutes
        await user.save();

        // Try to send real password reset email, fallback to console log
        const resetLink = `http://localhost:4200/reset-password/${resetToken}`;
        try {
            await sendPasswordResetEmail(email, resetLink);
        } catch (emailError) {
            console.log(`[EMAIL FAILED] Fallback - Reset link for ${email}: ${resetLink}`);
        }

        res.json({ msg: 'Password reset link sent to your email' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/auth/reset-password
// @desc    Reset password using token
// @access  Public
router.post('/reset-password', async (req, res) => {
    const { token, password } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid or expired reset token' });
        }

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ msg: 'Password reset successful. You can now login with your new password.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
