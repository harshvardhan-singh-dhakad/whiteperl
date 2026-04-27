import { motion } from "framer-motion";

const gallery = [
  { img: "/assets/images/gallery-bridal.png", title: "Bridal Elegance" },
  { img: "/assets/images/gallery-hair.png", title: "Luxury Hair Care" },
  { img: "/assets/images/gallery-nails.png", title: "Creative Nail Art" },
  { img: "/assets/images/gallery-spa.png", title: "Relaxing Spa" }
];

export function Gallery() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <span className="text-gold uppercase tracking-[0.2em] text-sm font-bold">Our Portfolio</span>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-dark">A Glimpse of Perfection</h2>
        <div className="w-16 h-1 bg-gradient-to-r from-dusty-rose to-gold mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gallery.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group relative rounded-3xl overflow-hidden shadow-lg aspect-4/3 cursor-pointer"
          >
            <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-text-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
              <h3 className="font-serif text-2xl font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                {item.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
