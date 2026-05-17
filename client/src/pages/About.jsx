
import { motion } from 'framer-motion';
import GlassCard from '../components/common/GlassCard';

const About = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-32 pb-24"
        >
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-gold font-medium tracking-widest mb-4 uppercase">Legacy of Elegance</h2>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">The Essence of Our Studio</h1>
                    <p className="max-w-2xl mx-auto text-charcoal/70 dark:text-white/70">
                        We believe that every space has a story to tell. Our mission is to listen, translate, and elevate
                        that story into a physical reality that transcends time.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {[
                        { title: 'The Vision', desc: 'Pushing boundaries of modern architecture with sustainable and innovative solutions.' },
                        { title: 'The Craft', desc: 'Uncompromising attention to detail and partnership with the finest artisans.' },
                        { title: 'The Result', desc: 'Bespoke environments that reflect the unique personality of our clients.' },
                    ].map((item, i) => (
                        <GlassCard key={i} className="text-center">
                            <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                            <p className="opacity-70 leading-relaxed">{item.desc}</p>
                        </GlassCard>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="aspect-square glass rounded-3xl overflow-hidden"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=800&q=80"
                            alt="Studio"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                    <div>
                        <h3 className="text-3xl font-bold mb-6 italic font-serif">"Design is not just what it looks like and feels like. Design is how it works."</h3>
                        <p className="text-lg opacity-80 mb-8">
                            At INTERIOR, we balance the delicate dance between form and function. Our studio is a collaborative
                            ecosystem where architects, designers, and craftsmen work in harmony to produce extraordinary results.
                        </p>
                        <div className="flex gap-4 items-center">
                            <div className="w-12 h-12 rounded-full glass flex items-center justify-center font-bold text-gold">JD</div>
                            <div>
                                <p className="font-bold">Prem</p>
                                <p className="text-xs uppercase tracking-widest opacity-60">Principle Architect</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default About;
