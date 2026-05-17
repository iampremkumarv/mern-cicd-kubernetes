const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');

dotenv.config();

const projects = [
    {
        title: 'Golden Sands Villa',
        category: 'Residential',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
        description: 'Luxury beachfront living.',
        link: '#'
    },
    {
        title: 'Nexus Tech Office',
        category: 'Commercial',
        image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop',
        description: 'Modern workspace design.',
        link: '#'
    },
    {
        title: 'Azure Penthouse',
        category: 'Residential',
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop',
        description: 'Sky-high elegance.',
        link: '#'
    },
    {
        title: 'The Minimalist Loft',
        category: 'Residential',
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
        description: 'Clean lines and soft light.',
        link: '#'
    },
    {
        title: 'Velvet Lounge',
        category: 'Commercial',
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
        description: 'Boutique hospitality.',
        link: '#'
    },
    {
        title: 'Eco Glass House',
        category: 'Architecture',
        image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1200&auto=format&fit=crop',
        description: 'Sustainable architecture.',
        link: '#'
    }
];

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/interior_design')
    .then(async () => {
        console.log('MongoDB Connected for seeding...');
        await Project.deleteMany();
        await Project.insertMany(projects);
        console.log('Database seeded successfully!');
        process.exit();
    })
    .catch(err => {
        console.error('Seeding error:', err);
        process.exit(1);
    });
