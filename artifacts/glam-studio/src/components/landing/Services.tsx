import { Scissors, Sparkles, Wand2, Hand, Flower2, User } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  { icon: Scissors, name: "Hair Studio", desc: "Premium haircut, global colour, keratin smoothening, hair spa aur scalp treatment — ladies aur gents dono ke liye", price: "Starting ₹299" },
  { icon: User, name: "Men's Grooming", desc: "Signature haircut, beard sculpting, clean-up facial aur head massage — modern man ke liye complete package", price: "Starting ₹399" },
  { icon: Wand2, name: "Bridal & Party Makeup", desc: "HD aur airbrush makeup, draping aur hair styling — shaadi, sangeet aur events ke liye", price: "Starting ₹2,999" },
  { icon: Sparkles, name: "Skin Glow Facial", desc: "Hydra facial, deep cleansing, brightening aur anti-ageing therapies for radiant skin", price: "Starting ₹499" },
  { icon: Hand, name: "Nail Art & Extensions", desc: "Gel polish, 3D nail art, acrylic extensions, manicure aur pedicure", price: "Starting ₹199" },
  { icon: Flower2, name: "Spa & Body Care", desc: "Aromatherapy, deep tissue massage, body polishing aur threading-waxing", price: "Starting ₹599" }
];

export function Services() {
  return (
    <section id="services" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <span className="text-gold uppercase tracking-[0.2em] text-sm font-bold">What We Offer</span>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-dark">Our Premium Services</h2>
        <div className="w-16 h-1 bg-gradient-to-r from-dusty-rose to-gold mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group bg-white/60 backdrop-blur-lg border border-white rounded-3xl p-8 text-center hover:-translate-y-2 hover:bg-white/90 transition-all duration-500 shadow-sm hover:shadow-xl cursor-default"
          >
            <div className="mx-auto w-16 h-16 flex items-center justify-center mb-6 bg-blush-light rounded-2xl group-hover:scale-110 transition-transform">
              <service.icon className="w-8 h-8 text-rose-deep" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-text-dark mb-3">{service.name}</h3>
            <p className="text-text-mid text-sm mb-6 line-clamp-2">{service.desc}</p>
            <div className="text-xl font-semibold bg-gradient-to-r from-gold to-rose-deep bg-clip-text text-transparent">
              {service.price}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
