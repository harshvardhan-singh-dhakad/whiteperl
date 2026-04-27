import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center flex-col text-center px-6 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        <p className="text-gold font-semibold tracking-[0.2em] uppercase text-sm">
          Soft Luxury Beauty Experience
        </p>
        
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-tight bg-gradient-to-br from-text-dark via-rose-deep to-gold bg-clip-text text-transparent drop-shadow-sm">
          Glamour <br />
          <span className="italic font-display font-normal">Redefined</span>
        </h1>
        
        <p className="font-display text-xl md:text-3xl text-text-mid italic max-w-2xl mx-auto">
          Where Every Woman Becomes a Masterpiece
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <button onClick={() => window.open('https://wa.me/919876543210', '_blank')} className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-dusty-rose to-rose-deep text-white rounded-full text-sm font-medium tracking-wide hover:shadow-xl hover:-translate-y-1 transition-all">
            Book Appointment
          </button>
          <a href="#services" className="w-full sm:w-auto px-8 py-4 bg-white/50 backdrop-blur-sm border border-dusty-rose text-rose-deep rounded-full text-sm font-medium tracking-wide hover:bg-dusty-rose hover:text-white transition-all">
            Explore Services
          </a>
        </div>
      </motion.div>
    </section>
  );
}
