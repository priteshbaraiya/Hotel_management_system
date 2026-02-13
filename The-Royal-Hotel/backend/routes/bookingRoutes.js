const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
};

// @route   POST api/bookings
// @desc    Create a new booking
// @access  Private
router.post('/', auth, async (req, res) => {
    const { roomId, checkInDate, checkOutDate, guestDetails, totalPrice } = req.body;

    try {
        // Basic Availability Check
        const overlappingBooking = await Booking.findOne({
            room: roomId,
            status: { $in: ['pending', 'confirmed'] },
            $or: [
                { checkInDate: { $lt: new Date(checkOutDate), $gte: new Date(checkInDate) } },
                { checkOutDate: { $gt: new Date(checkInDate), $lte: new Date(checkOutDate) } }
            ]
        });

        if (overlappingBooking) {
            return res.status(400).json({ msg: 'Room is already booked for these dates' });
        }

        const newBooking = new Booking({
            user: req.user.id,
            room: roomId,
            checkInDate,
            checkOutDate,
            guestDetails,
            totalPrice,
            status: 'pending'
        });

        const booking = await newBooking.save();
        res.json(booking);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/bookings/my-bookings
// @desc    Get all bookings for logged in user
// @access  Private
router.get('/my-bookings', auth, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id })
            .populate('room')
            .sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/bookings
// @desc    Get all bookings (Admin/Staff)
// @access  Private (Admin/Staff only logic needed)
router.get('/', auth, async (req, res) => {
    try {
        // In a real app, check role here
        if (req.user.role === 'guest') {
            return res.status(403).json({ msg: 'Access denied' });
        }

        const bookings = await Booking.find()
            .populate('room')
            .populate('user', '-password') // Exclude password
            .sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/bookings/:id/status
// @desc    Update booking status (Accept/Cancel)
// @access  Private (Staff/Admin)
router.put('/:id/status', auth, async (req, res) => {
    const { status } = req.body;
    try {
        if (req.user.role === 'guest') {
            // Guests can only cancel their own pending bookings
            const booking = await Booking.findById(req.params.id);
            if (!booking) return res.status(404).json({ msg: 'Booking not found' });

            if (booking.user.toString() !== req.user.id) {
                return res.status(403).json({ msg: 'Access denied' });
            }
            if (status !== 'cancelled') {
                return res.status(403).json({ msg: 'Guests can only cancel bookings' });
            }
            booking.status = status;
            await booking.save();
            return res.json(booking);
        }

        // Staff/Admin can set any status
        let booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ msg: 'Booking not found' });

        booking.status = status;
        await booking.save();
        res.json(booking);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/bookings/:id
// @desc    Delete a booking
// @access  Private (Admin/Staff)
router.delete('/:id', auth, async (req, res) => {
    try {
        if (req.user.role === 'guest') {
            return res.status(403).json({ msg: 'Access denied' });
        }

        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ msg: 'Booking not found' });

        await booking.deleteOne();
        res.json({ msg: 'Booking removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
