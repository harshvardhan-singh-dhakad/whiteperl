import { motion } from "framer-motion";
import teamPriya from "@/assets/images/team-priya.png";
import teamRiya from "@/assets/images/team-riya.png";
import teamAnjali from "@/assets/images/team-anjali.png";
import teamKavya from "@/assets/images/team-kavya.png";

const team = [
  { name: "Priya Sharma", role: "Creative Director · Hair", exp: "8 yrs", image: teamPriya },
  { name: "Riya Malhotra", role: "Senior Makeup Artist", exp: "6 yrs", image: teamRiya },
  { name: "Anjali Verma", role: "Nail Art Specialist", exp: "5 yrs", image: teamAnjali },
  { name: "Kavya Nair", role: "Skin & Spa Therapist", exp: "7 yrs", image: teamKavya }
];

export function Team() {
  return (
    <section id="team" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <span className="text-gold uppercase tracking-[0.2em] text-sm font-bold">The Artists</span>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-dark">Meet Our Experts</h2>
        <div className="w-16 h-1 bg-gradient-to-r from-dusty-rose to-gold mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {team.map((member, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/60 backdrop-blur-lg border border-white rounded-3xl p-6 text-center hover:-translate-y-2 transition-all shadow-sm hover:shadow-xl"
          >
            <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-6 object-cover border-4 border-white shadow-md" />
            <h3 className="font-serif text-xl font-bold text-text-dark mb-1">{member.name}</h3>
            <p className="text-sm font-medium text-dusty-rose mb-2 uppercase tracking-wide">{member.role}</p>
            <p className="text-xs font-semibold text-gold">{member.exp} Experience</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
