import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import api from '../api';
import { toast } from 'react-toastify';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/contacts', formData);
            setIsSuccess(true);
            toast.success("Message sent successfully! We'll get back to you soon.");
            setFormData({ name: '', email: '', phone: '', message: '' });
            setTimeout(() => setIsSuccess(false), 5000);
        } catch (err) {
            console.error(err);
            toast.error("Failed to send message. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-32 pb-24"
        >
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-gold font-medium tracking-widest mb-4 uppercase">Contact Us</h2>
                        <h1 className="text-4xl md:text-6xl font-bold mb-8">Let's Create <br /> Something Icon.</h1>
                        <p className="opacity-70 mb-12 text-lg">
                            Whether you have a specific project in mind or just want to explore possibilities,
                            we're here to help you redefine your space.
                        </p>

                        <div className="space-y-8">
                            <div className="flex gap-6 items-start">
                                <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center shrink-0">
                                    <Mail className="text-gold" size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1">Email Us</h4>
                                    <p className="opacity-70">hello@intirior.studio</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-start">
                                <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center shrink-0">
                                    <Phone className="text-gold" size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1">Call Us</h4>
                                    <p className="opacity-70">+1 (234) 567-890</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-start">
                                <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center shrink-0">
                                    <MapPin className="text-gold" size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1">Visit Studio</h4>
                                    <p className="opacity-70">123 Design Avenue, Manhattan, NY</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <GlassCard>
                        <AnimatePresence mode="wait">
                            {isSuccess ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 className="text-gold" size={40} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">Message Sent!</h3>
                                    <p className="opacity-70">
                                        Thank you for reaching out. <br />
                                        Our team will contact you shortly.
                                    </p>
                                    <button
                                        onClick={() => setIsSuccess(false)}
                                        className="mt-8 text-gold font-bold uppercase tracking-widest text-sm hover:underline"
                                    >
                                        Send another message
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest font-bold opacity-60 mb-2">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:outline-none focus:border-gold transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs uppercase tracking-widest font-bold opacity-60 mb-2">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:outline-none focus:border-gold transition-colors"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs uppercase tracking-widest font-bold opacity-60 mb-2">Phone</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:outline-none focus:border-gold transition-colors"
                                                placeholder="+1 234..."
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest font-bold opacity-60 mb-2">Message</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="5"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:outline-none focus:border-gold transition-colors resize-none"
                                            placeholder="Tell us about your project..."
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-gold text-charcoal py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform hover-glow disabled:opacity-70 h-14"
                                    >
                                        {loading ? (
                                            <Loader2 className="animate-spin" size={20} />
                                        ) : (
                                            <>Send Message <Send size={18} /></>
                                        )}
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </GlassCard>
                </div>
            </div>
        </motion.div>
    );
};

export default Contact;
