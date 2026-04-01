import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="pt-20 pb-10 bg-charcoal text-white/80 overflow-hidden relative">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link
              to="/"
              className="text-2xl font-bold tracking-tighter text-gold flex items-center gap-2 mb-6"
            >
              INTERIOR
            </Link>

            <p className="text-sm leading-relaxed mb-8">
              Transforming visions into reality through sophisticated design and unparalleled
              craftsmanship. Elevating the standard of luxury living since 2010.
            </p>

            <div className="flex gap-4">
              <a
                href="#"
                className="p-3 glass rounded-full hover:bg-gold hover:text-charcoal transition-all"
              >
                <Instagram size={18} />
              </a>

              <a
                href="#"
                className="p-3 glass rounded-full hover:bg-gold hover:text-charcoal transition-all"
              >
                <Twitter size={18} />
              </a>

              <a
                href="#"
                className="p-3 glass rounded-full hover:bg-gold hover:text-charcoal transition-all"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/about" className="hover:text-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gold transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-gold transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold transition-colors">
                  Book Consult
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Services</h4>
            <ul className="space-y-4 text-sm">
              <li>Residential Interior</li>
              <li>Commercial Spaces</li>
              <li>Architecture Design</li>
              <li>Furniture Curation</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Newsletter</h4>
            <p className="text-sm mb-4">Subscribe to receive design inspiration and updates.</p>

            <div className="relative">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 text-sm focus:outline-none focus:border-gold transition-colors"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gold p-2">
                <Mail size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-widest uppercase">
          <p>© 2026 INTERIOR DESIGN STUDIO. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-gold transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gold transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;