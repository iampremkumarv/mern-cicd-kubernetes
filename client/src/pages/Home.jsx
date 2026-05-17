
import Hero from '../components/sections/Hero';
import { motion } from 'framer-motion';
import { Home as HomeIcon, Building, Palette, Sparkles } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Hero />

            {/* Services Preview Section */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-gold font-medium tracking-widest mb-4 uppercase">Our Services</h2>
                        <h3 className="text-4xl font-bold">Specialized Design Solutions</h3>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: <HomeIcon size={32} />, title: 'Residential', desc: 'Luxury home interiors.' },
                            { icon: <Building size={32} />, title: 'Commercial', desc: 'Modern office designs.' },
                            { icon: <Palette size={32} />, title: 'Custom', desc: 'Bespoke furniture pieces.' },
                            { icon: <Sparkles size={32} />, title: 'Landscape', desc: 'Outdoor living spaces.' }
                        ].map((s, i) => (
                            <GlassCard key={i} className="hover-glow group">
                                <div className="text-gold mb-6 group-hover:scale-110 transition-transform duration-500">
                                    {s.icon}
                                </div>
                                <h4 className="text-xl font-bold mb-2">{s.title}</h4>
                                <p className="text-sm opacity-70 mb-6">{s.desc}</p>
                                <Link to="/services" className="text-xs font-bold uppercase tracking-widest text-gold hover:translate-x-1 transition-transform inline-block">
                                    Explore +
                                </Link>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Projects Section */}
            <section className="py-24 bg-neutral-50 dark:bg-black/20">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-end mb-16">
                        <div>
                            <h2 className="text-gold font-medium tracking-widest mb-4 uppercase">Portfolio</h2>
                            <h3 className="text-4xl font-bold">Featured Projects</h3>
                        </div>
                        <Link to="/portfolio" className="text-gold font-bold hover:underline mb-2">
                            View All Projects →
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: 'Golden Sands Villa', cat: 'Residential', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80' },
                            { title: 'Nexus Tech Office', cat: 'Commercial', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
                            { title: 'The Minimalist Loft', cat: 'Residential', img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80' }
                        ].map((p, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="group relative overflow-hidden rounded-3xl aspect-[4/5]"
                            >
                                <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform">
                                    <p className="text-gold text-xs font-bold uppercase tracking-widest mb-2">{p.cat}</p>
                                    <h4 className="text-xl font-bold text-white">{p.title}</h4>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Short About Preview on Home */}
            <section className="py-24 bg-beige/30 dark:bg-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="aspect-[4/5] bg-gray-200 rounded-3xl overflow-hidden glass">
                                <img
                                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
                                    alt="Luxury Interior"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                            <div className="absolute -bottom-10 -right-10 glass p-8 rounded-2xl hidden lg:block">
                                <h4 className="text-4xl font-bold text-gold">15</h4>
                                <p className="text-sm uppercase tracking-widest">Global Awards</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-gold font-medium tracking-widest mb-4 uppercase">Our Story</h2>
                            <h3 className="text-4xl font-bold mb-6">Designing for the <br /> modern visionary.</h3>
                            <p className="text-charcoal/70 dark:text-white/70 mb-8 leading-relaxed">
                                Founded in 2010, INTERIOR has been at the forefront of luxury design. We don't just decorate rooms;
                                we curate experiences. Our philosophy is rooted in minimalism, quality, and the pursuit of perfection.
                            </p>
                            <button className="text-gold font-bold flex items-center gap-2 group">
                                Read More About Us
                                <span className="w-8 h-[2px] bg-gold group-hover:w-12 transition-all"></span>
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Final Contact CTA on Home */}
            <section className="py-24">
                <div className="container mx-auto px-6 text-center">
                    <GlassCard className="max-w-4xl mx-auto py-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Start your dream project today.</h2>
                        <p className="opacity-70 mb-10 max-w-2xl mx-auto">
                            Our team of experts is ready to help you transform your space into a work of art.
                            Let's discuss your vision.
                        </p>
                        <Link to="/contact" className="bg-gold text-charcoal px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform inline-block hover-glow">
                            Get in Touch
                        </Link>
                    </GlassCard>
                </div>
            </section>
        </motion.div>
    );
};

export default Home;
