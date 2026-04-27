import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  { name: "Neha Gupta", location: "Bhopal", text: "Mere wedding ka HD makeup itna flawless tha — 12 ghante baad bhi vaisa hi fresh laga. Hair styling aur draping bhi top class. Highly recommend!" },
  { name: "Rohan Mehta", location: "Indore", text: "Best men's grooming experience in town. Beard sculpting, fade haircut aur clean-up facial — sab on point. Ambience bhi premium hai, rushed feel nahi hota." },
  { name: "Prachi Joshi", location: "Raisen", text: "Hydra facial aur gel nail extensions dono yahan se karwati hoon. International products use karte hain aur hygiene ka full dhyaan rakhte hain." }
];

export function Testimonials() {
  return (
    <section id="reviews" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <span className="text-gold uppercase tracking-[0.2em] text-sm font-bold">Client Stories</span>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-dark">Hamare Clients Ki Zubaani</h2>
        <div className="w-16 h-1 bg-gradient-to-r from-dusty-rose to-gold mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testi, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/60 backdrop-blur-lg border border-white rounded-3xl p-8 text-center shadow-sm hover:shadow-xl transition-all"
          >
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-gold text-gold" />
              ))}
            </div>
            <p className="font-display italic text-xl text-text-dark mb-6 leading-relaxed">
              "{testi.text}"
            </p>
            <h4 className="font-serif font-bold text-lg text-text-dark">{testi.name}</h4>
            <p className="text-sm font-medium text-dusty-rose">{testi.location}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
