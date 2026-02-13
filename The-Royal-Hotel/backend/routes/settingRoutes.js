const express = require('express');
const router = express.Router();
const Setting = require('../models/Setting');
const jwt = require('jsonwebtoken');

// Middleware
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        // Allow public GET for some settings like hotel info (maybe?)
        if (req.method === 'GET') return next();
        return res.status(401).json({ msg: 'No token' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ msg: 'Token invalid' });
    }
};

// @route   GET api/settings
// @desc    Get all settings
// @access  Public (or semi-private)
router.get('/', async (req, res) => {
    try {
        const settings = await Setting.find();

        // Transform to key-value object
        const settingsMap = {};
        settings.forEach(s => {
            settingsMap[s.key] = s.value;
        });

        res.json(settingsMap);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/settings
// @desc    Create/Update setting
// @access  Private (Admin)
router.post('/', auth, async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Access denied' });
    }

    const { key, value, description } = req.body;

    try {
        let setting = await Setting.findOne({ key });
        if (setting) {
            setting.value = value;
            if (description) setting.description = description;
            await setting.save();
        } else {
            setting = new Setting({ key, value, description });
            await setting.save();
        }
        res.json(setting);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
