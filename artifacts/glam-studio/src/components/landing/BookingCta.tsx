import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function BookingCta() {
  return (
    <section id="booking" className="py-24 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-white/80 backdrop-blur-2xl border border-white rounded-[2rem] p-10 md:p-16 text-center shadow-2xl overflow-hidden"
        >
          {/* Subtle glow behind */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-md bg-rose-deep/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-deep/10 text-rose-deep text-sm font-bold tracking-wide uppercase rounded-full">
              <Sparkles className="w-4 h-4" />
              Hurry! Only 1-2 slots left for today
            </div>

            <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-dark leading-tight">
              Ready to Glow?
            </h2>

            <p className="text-text-mid text-lg max-w-lg mx-auto pb-4">
              Book your appointment via WhatsApp and experience the ultimate luxury beauty treatment.
            </p>

            <button
              onClick={() => window.open('https://wa.me/919876543210?text=Hello%20Glam%20Studio!%20I%20would%20like%20to%20book%20an%20appointment.%20Please%20let%20me%20know%20the%20available%20slots.', '_blank')}
              className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-dusty-rose to-rose-deep text-white rounded-full text-lg font-semibold tracking-wide hover:shadow-2xl hover:scale-105 transition-all relative overflow-hidden group"
            >
              <span className="relative z-10">BOOK AN APPOINTMENT</span>
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shimmer" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
