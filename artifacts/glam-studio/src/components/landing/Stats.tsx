import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

function Counter({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (inView) {
      let startTimestamp: number;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        setCount(Math.floor(progress * (to - from) + from));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, from, to, duration]);

  return <span ref={ref}>{count}</span>;
}

export function Stats() {
  const stats = [
    { value: 500, suffix: "+", label: "Happy Clients" },
    { value: 12, suffix: "+", label: "Years Experience" },
    { value: 50, suffix: "+", label: "Premium Services" },
    { value: 100, suffix: "%", label: "Satisfaction" }
  ];

  return (
    <section className="relative z-10 py-12 px-6">
      <div className="max-w-6xl mx-auto bg-white/40 backdrop-blur-xl border-y border-white/50 grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/40">
        {stats.map((stat, idx) => (
          <div key={idx} className="p-8 text-center">
            <div className="font-serif text-4xl md:text-5xl font-bold bg-gradient-to-br from-gold to-rose-deep bg-clip-text text-transparent mb-2 flex items-center justify-center">
              <Counter from={0} to={stat.value} />
              <span>{stat.suffix}</span>
            </div>
            <div className="text-xs font-semibold tracking-[0.2em] text-text-mid uppercase">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
