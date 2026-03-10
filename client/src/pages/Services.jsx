import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home as HomeIcon, Building, Palette, Sparkles } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';

const Services = () => {
    const navigate = useNavigate();
    const services = [
        {
            icon: <HomeIcon className="text-gold" />,
            title: 'Residential Design',
            desc: 'Creating personalized sanctuaries that blend comfort with high-end luxury aesthetics.'
        },
        {
            icon: <Building className="text-gold" />,
            title: 'Commercial Spaces',
            desc: 'Designing productive and inspiring environments for modern businesses and retail.'
        },
        {
            icon: <Palette className="text-gold" />,
            title: 'Custom Furniture',
            desc: 'Bespoke furniture pieces crafted specifically to fit your space and style perfectly.'
        },
        {
            icon: <Sparkles className="text-gold" />,
            title: 'Landscape Planning',
            desc: 'Seamlessly integrating your indoor living spaces with the beauty of nature.'
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-32 pb-24"
        >
            <div className="container mx-auto px-6 text-center mb-20">
                <h2 className="text-gold font-medium tracking-widest mb-4 uppercase">Our Expertise</h2>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">Defining the Space <br /> Around You.</h1>
            </div>

            <div className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service, i) => (
                    <GlassCard key={i} className="group hover-glow">
                        <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gold transition-colors duration-500">
                            {React.cloneElement(service.icon, { size: 32, className: 'group-hover:text-white transition-colors' })}
                        </div>
                        <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                        <p className="opacity-70 mb-6">{service.desc}</p>
                        <button className="text-gold text-sm font-bold uppercase tracking-widest hover:translate-x-2 transition-transform">
                            Learn More +
                        </button>
                    </GlassCard>
                ))}
            </div>

            <div className="mt-32 bg-charcoal py-24 text-white relative overflow-hidden">
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-3xl font-bold mb-8">Ready to transform your space?</h2>
                    <p className="max-w-xl mx-auto mb-12 opacity-80">
                        Every project begins with a conversation. Let's discuss your vision and how we can bring it to life.
                    </p>
                    <button
                        onClick={() => navigate('/contact')}
                        className="bg-gold text-charcoal px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform hover-glow"
                    >
                        Start Your Journey
                    </button>
                </div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px]" />
            </div>
        </motion.div>
    );
};

export default Services;
