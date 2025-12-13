
import React, { useRef } from 'react';
import {
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
  Globe,
  ArrowUp
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CrisisBanner from './CrisisBanner';

// interface FooterProps { }

interface FooterLink {
  name: string;
  view: string;
  id?: string;
}

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  // Scroll animations for parallax effect
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent, view: string, id?: string) => {
    e.preventDefault();
    if (view === 'home') navigate('/');
    else if (view === 'category' && id) navigate(`/category/${id}`);
    else if (view === 'clarity-score') navigate('/clarity-score');
    else if (view === 'providers') navigate('/providers');
    else if (view === 'about') navigate('/about');
    else if (view === 'contact') navigate('/contact');
    else if (view === 'privacy') navigate('/legal/privacy');
    else if (view === 'terms') navigate('/legal/terms');
    else navigate(`/${view}`);
  };

  const footerLinks: Record<string, FooterLink[]> = {
    learn: [
      { name: 'Anxiety & Panic', view: 'category', id: 'Anxiety' },
      { name: 'Depression', view: 'category', id: 'Depression' },
      { name: 'Wellness', view: 'category', id: 'Wellness' },
    ],
    popular: [
      { name: 'Clarity Score™', view: 'clarity-score' },
      { name: 'Find a Provider', view: 'providers' },
      { name: 'Articles', view: 'home' }, // Just Scroll to top for now
    ],
    company: [
      { name: 'About Us', view: 'about' },
      { name: 'Careers', view: 'about' }, // Reusing about for now
    ],
    connect: [
      { name: 'Contact Support', view: 'contact' },
      { name: 'Crisis Resources', view: 'contact' },
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer ref={footerRef} className="bg-white text-gray-900 relative font-sans overflow-hidden flex flex-col border-t border-gray-100 transition-colors duration-500">
      {/* Crisis Banner floats on top */}
      <div className="relative z-30 border-b border-gray-100">
        <CrisisBanner />
      </div>

      <div className="container mx-auto px-6 pt-24 max-w-[1600px] relative z-20 flex-grow flex flex-col">

        {/* Footer Hero / Statement */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-24 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <h2 className="font-display font-bold text-5xl md:text-8xl tracking-tight leading-[0.9] mb-8 text-gray-900">
              Mental health <br />
              <span className="text-gray-500">is just health.</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-500 max-w-xl leading-relaxed font-light">
              Building a future where quality care is accessible, understandable, and destigmatized for everyone.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8 items-start"
          >
            <button onClick={(e) => handleLinkClick(e, 'about')} className="group flex items-center gap-4 text-xl md:text-3xl font-semibold hover:text-teal-600 transition-colors">
              Join the movement
              <span className="bg-gray-900 text-white rounded-full p-2 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                <ArrowRight className="group-hover:-rotate-45 transition-transform duration-300" size={24} />
              </span>
            </button>

            <div className="flex items-center gap-2 text-gray-600 text-sm font-medium border border-gray-300 rounded-full px-4 py-2 hover:border-gray-400 transition-colors cursor-pointer">
              <Globe size={16} />
              <span>United States (English)</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="h-px w-full bg-gray-100 mb-20 origin-left"
        />

        {/* Massive Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-16 flex-grow">
          {[
            { title: "Learn", links: footerLinks.learn },
            { title: "Popular", links: footerLinks.popular },
            { title: "Company", links: footerLinks.company },
            { title: "Connect", links: footerLinks.connect }
          ].map((column, colIndex) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: colIndex * 0.1 }}
            >
              <h4 className="text-sm font-bold text-gray-400 mb-8 uppercase tracking-widest">{column.title}</h4>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href="#"
                      onClick={(e) => handleLinkClick(e, link.view, link.id)}
                      className="group flex items-center gap-2 text-lg text-gray-600 hover:text-gray-900 transition-colors duration-300"
                    >
                      <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-teal-600" />
                      <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Socials & Legal */}
        <div className="bg-white border-t border-gray-100 pt-16 pb-8 mt-24 mb-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div className="flex gap-4">
            {socialLinks.map((social, idx) => (
              <MagneticButton key={idx}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  className="w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-black hover:text-white transition-colors duration-300"
                >
                  <social.icon size={22} />
                </a>
              </MagneticButton>
            ))}
          </div>

          <div className="flex flex-col md:items-end gap-4 text-xs text-gray-500 font-medium tracking-wide">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-gray-900 hover:text-teal-600 transition-colors mb-4 text-sm font-bold uppercase tracking-widest group"
            >
              Back to Top <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
            </button>
            <div className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
              <button onClick={(e) => handleLinkClick(e, 'privacy')} className="hover:text-gray-900 transition-colors">Privacy</button>
              <button onClick={(e) => handleLinkClick(e, 'terms')} className="hover:text-gray-900 transition-colors">Terms</button>
              <button className="hover:text-gray-900 transition-colors">Sitemap</button>
              <button className="hover:text-gray-900 transition-colors">Choices</button>
            </div>
            <p>© {currentYear} Psychage Health, Inc.</p>
          </div>
        </div>
      </div>

      {/* Interactive Watermark */}
      <motion.div
        style={{ y, opacity }}
        className="w-full flex justify-center items-end select-none pointer-events-none mt-[-5vw] overflow-hidden"
      >
        <h1 className="font-display font-black text-[24vw] leading-[0.7] text-transparent bg-clip-text bg-gradient-to-b from-gray-50 via-gray-50 to-white tracking-tighter opacity-50 whitespace-nowrap">
          psychage
        </h1>
      </motion.div>
    </footer >
  );
};

// Magnetic Button Component for Socials
const MagneticButton: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

export default Footer;
