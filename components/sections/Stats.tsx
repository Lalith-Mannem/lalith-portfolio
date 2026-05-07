"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/lib/data";

function AnimatedCounter({
  target,
  suffix,
  started,
}: {
  target: number;
  suffix: string;
  started: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const duration = 1800;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * target);
      setCount(start);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [started, target]);

  return (
    <span aria-hidden="true">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative border-y border-white/6">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-emerald-500/5" />

      <div className="section-container relative">
        <div className="grid grid-cols-2 gap-px lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group flex flex-col items-center py-10 px-6 text-center"
            >
              <div
                className="font-heading text-4xl font-black text-white sm:text-5xl"
                aria-label={`${stat.value}${stat.suffix}`}
              >
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  started={inView}
                />
              </div>
              <div className="mt-2 text-sm font-semibold text-cyan-400">
                {stat.label}
              </div>
              <div className="mt-1 text-xs text-slate-500">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
