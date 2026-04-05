import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/common/GlassCard';
import api from '../api';
import { toast } from 'react-toastify';
import { Plus, Layout } from 'lucide-react';

const AdminDashboard = () => {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        image: '',
        description: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await api.post('/projects', formData);

            toast.success('Project added successfully!');

            setFormData({
                title: '',
                category: '',
                image: '',
                description: ''
            });
        } catch (error) {
            console.error('Error adding project:', error);
            toast.error('Failed to add project');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="min-h-screen py-24 px-6 bg-offwhite dark:bg-neutral-950 text-charcoal dark:text-white">
            <div className="container mx-auto max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-3 mb-8">
                        <Layout className="text-gold" size={28} />
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                            Admin Dashboard
                        </h1>
                    </div>

                    <p className="text-charcoal/70 dark:text-white/70 mb-10">
                        Add new portfolio projects to showcase on your website.
                    </p>

                    <GlassCard className="p-8 md:p-10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Project Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Enter project title"
                                    className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold transition"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Category
                                </label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    placeholder="e.g. Residential, Commercial"
                                    className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold transition"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Image URL
                                </label>
                                <input
                                    type="url"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    placeholder="Paste project image URL"
                                    className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold transition"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Write a short description of the project"
                                    rows="5"
                                    className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold transition resize-none"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gold text-white px-6 py-3 font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Plus size={18} />
                                {isLoading ? 'Adding Project...' : 'Add Project'}
                            </button>
                        </form>
                    </GlassCard>
                </motion.div>
            </div>
        </section>
    );
};

export default AdminDashboard;