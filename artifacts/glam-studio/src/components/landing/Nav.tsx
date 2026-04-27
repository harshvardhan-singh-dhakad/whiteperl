import { Sparkles, Menu, X } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { href: "#services", label: "Services" },
    { href: "#team", label: "Team" },
    { href: "#reviews", label: "Reviews" },
    { href: "#booking", label: "Booking" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 bg-white/80 backdrop-blur-md border-b border-white/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-serif text-2xl font-bold bg-gradient-to-br from-rose-deep to-gold bg-clip-text text-transparent relative z-50">
          <Sparkles className="w-6 h-6 text-gold" />
          Glam Studio
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-wider text-text-dark">
          {menuItems.map(item => (
            <a key={item.label} href={item.href} className="hover:text-dusty-rose transition-colors">{item.label}</a>
          ))}
        </div>

        <button onClick={() => window.open('https://wa.me/919876543210', '_blank')} className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-dusty-rose to-rose-deep text-white rounded-full text-sm font-medium tracking-wide hover:shadow-lg hover:scale-105 transition-all">
          Book Now
        </button>

        <button className="md:hidden relative z-50 p-2 text-text-dark" onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-bg-base/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8"
          >
            {menuItems.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="font-serif text-4xl font-bold text-text-dark hover:text-dusty-rose transition-colors"
              >
                {item.label}
              </motion.a>
            ))}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => window.open('https://wa.me/919876543210', '_blank')}
              className="mt-8 px-10 py-4 bg-gradient-to-r from-dusty-rose to-rose-deep text-white rounded-full text-lg font-medium tracking-wide shadow-xl"
            >
              Book Appointment
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
