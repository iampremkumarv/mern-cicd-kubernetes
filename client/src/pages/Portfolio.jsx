import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/common/GlassCard';
import api from '../api';

const Portfolio = () => {
    const [projects, setProjects] = useState([]);
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(true);

    // Categories
    const categories = ['All', 'Residential', 'Commercial', 'Architecture', 'Furniture'];

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await api.get('/projects');
                setProjects(res.data);
            } catch (err) {
                console.error("Error fetching projects:", err);
                // Fallback dummy data if backend is not running
                setProjects([
                    { _id: '1', title: 'Golden Sands Villa', category: 'Residential', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80', description: 'Luxury beachfront living.' },
                    { _id: '2', title: 'Nexus Tech Office', category: 'Commercial', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', description: 'Modern workspace design.' },
                    { _id: '3', title: 'Azure Penthouse', category: 'Residential', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80', description: 'Sky-high elegance.' },
                    { _id: '4', title: 'The Minimalist Loft', category: 'Residential', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80', description: 'Clean lines and soft light.' },
                    { _id: '5', title: 'Velvet Lounge', category: 'Commercial', image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=800&q=80', description: 'Boutique hospitality.' },
                    { _id: '6', title: 'Eco Glass House', category: 'Architecture', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', description: 'Sustainable architecture.' },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-32 pb-24"
        >
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-gold font-medium tracking-widest mb-4 uppercase">Our Gallery</h2>
                    <h1 className="text-4xl md:text-6xl font-bold mb-8">Iconic Spaces.</h1>

                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${filter === cat ? 'bg-gold text-charcoal' : 'glass hover:bg-white/20'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <motion.div
                        layout
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <AnimatePresence>
                            {filteredProjects.map((project) => (
                                <motion.div
                                    key={project._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <GlassCard className="p-0 h-full flex flex-col group overflow-hidden" tilt={false}>
                                        <div className="aspect-[3/2] overflow-hidden">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <p className="text-xs text-gold font-bold uppercase tracking-widest mb-2">{project.category}</p>
                                            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                            <p className="text-sm opacity-70 flex-grow">{project.description}</p>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default Portfolio;
