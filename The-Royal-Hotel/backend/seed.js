const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Room = require('./models/Room');
const Service = require('./models/Service');
const Booking = require('./models/Booking');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/TheRoyalObsidian';

const seedData = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await User.deleteMany({});
        await Room.deleteMany({});
        await Service.deleteMany({});
        await Booking.deleteMany({}); // Clear bookings too if any

        console.log('Cleared existing data.');

        // 1. Create Users (all verified for immediate login)
        const adminUser = new User({
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@royalobsidian.com',
            password: 'admin123',
            role: 'admin',
            phone: '1234567890',
            address: { city: 'Hotel City' },
            isVerified: true
        });
        await adminUser.save();

        const staffUser = new User({
            firstName: 'Staff',
            lastName: 'Member',
            email: 'staff@royalobsidian.com',
            password: 'staff123',
            role: 'staff',
            department: 'Front Desk',
            phone: '0987654321',
            address: { city: 'Hotel City' },
            isVerified: true
        });
        await staffUser.save();

        const guestUser = new User({
            firstName: 'Guest',
            lastName: 'User',
            email: 'guest@royalobsidian.com',
            password: 'guest123',
            role: 'guest',
            phone: '5555555555',
            address: { city: 'Guest City' },
            isVerified: true
        });
        await guestUser.save();

        console.log('Users created: Admin, Staff, Guest');

        // 2. Create Rooms (6 types as requested)
        const roomTypes = [
            { type: 'Deluxe Room', title: 'Deluxe King', price: 200, desc: 'Spacious room with King bed' },
            { type: 'Executive Suite', title: 'Executive Suite', price: 350, desc: 'Luxury suite with workspace' },
            { type: 'Presidential Suite', title: 'The Royal Presidential', price: 1000, desc: 'Ultimate luxury with ocean view' },
            { type: 'Standard Room', title: 'Standard Twin', price: 150, desc: 'Comfortable twin beds' },
            { type: 'Family Suite', title: 'Family Connection', price: 400, desc: 'Connected rooms for families' },
            { type: 'Penthouse', title: 'Skyline Penthouse', price: 800, desc: 'Top floor with panoramic view' }
        ];

        for (const r of roomTypes) {
            await new Room({
                title: r.title,
                type: r.type,
                description: r.desc,
                price: r.price,
                amenities: ['Wifi', 'TV', 'AC'],
                imagePath: 'uploads/sample_room.jpg', // Placeholder
                isBooked: false
            }).save();
        }
        console.log(`${roomTypes.length} Rooms created.`);

        // 3. Create Services
        const services = [
            { title: 'Spa & Wellness', desc: 'Relaxing treatments' },
            { title: 'Fine Dining', desc: 'Gourmet experience' },
            { title: 'Concierge', desc: '24/7 Assistance' }
        ];

        for (const s of services) {
            await new Service({
                title: s.title,
                description: s.desc,
                imagePath: 'uploads/sample_service.jpg'
            }).save();
        }
        console.log(`${services.length} Services created.`);

        console.log('Seeding completed successfully!');
        process.exit();

    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

seedData();
