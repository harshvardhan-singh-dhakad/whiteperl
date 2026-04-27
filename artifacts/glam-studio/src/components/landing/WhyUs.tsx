import { Star, ShieldCheck, Gem, Users } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Users, title: "Expert Stylists", desc: "Highly trained professionals with years of experience in luxury beauty." },
  { icon: Gem, title: "Premium Products", desc: "Top-tier international brands for flawless and safe results." },
  { icon: Star, title: "5-Star Reviews", desc: "Loved by hundreds of happy brides and regular clients." },
  { icon: ShieldCheck, title: "Hygienic & Safe", desc: "Strict sanitization protocols for a worry-free experience." }
];

export function WhyUs() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <span className="text-gold uppercase tracking-[0.2em] text-sm font-bold">Why Choose Us</span>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-dark">The Glam Difference</h2>
        <div className="w-16 h-1 bg-gradient-to-r from-dusty-rose to-gold mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/60 backdrop-blur-lg border border-white rounded-3xl p-8 text-center hover:-translate-y-2 transition-all shadow-sm hover:shadow-xl"
          >
            <div className="mx-auto w-14 h-14 flex items-center justify-center mb-6">
              <feature.icon className="w-10 h-10 text-gold" />
            </div>
            <h3 className="font-serif text-xl font-bold text-text-dark mb-3">{feature.title}</h3>
            <p className="text-text-mid text-sm leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
