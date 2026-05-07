"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Zap } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import { EXPERIENCE } from "@/lib/data";

function highlightMetrics(text: string) {
  const parts = text.split(/(\d+[%×xXMKB]+|\d+\+|\d+(?:\.\d+)?(?:ms|s|x))/g);
  return parts.map((part, i) =>
    /\d/.test(part) && i % 2 === 1 ? (
      <span key={i} className="font-mono font-semibold text-emerald-400">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section-padding">
      <div className="section-container">
        <SectionHeading
          eyebrow="// experience"
          title="Where I've shipped"
          description="From research to production — every role has been about making ML systems faster, more reliable, and more impactful."
        />

        <div className="relative mt-14">
          {/* Vertical timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-purple-500/30 to-transparent md:left-8" />

          <div className="space-y-10">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={exp.company + exp.role}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.15, duration: 0.65 }}
                className="relative pl-12 md:pl-20"
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-0 top-6 flex h-8 w-8 items-center justify-center rounded-full border md:left-4 md:h-9 md:w-9 transition-all duration-300 ${
                    exp.isCurrent
                      ? "border-cyan-500/50 bg-cyan-500/20 shadow-glow-cyan"
                      : "border-white/20 bg-white/5"
                  }`}
                >
                  <Zap
                    size={14}
                    className={
                      exp.isCurrent ? "text-cyan-400" : "text-slate-500"
                    }
                  />
                </div>

                {/* Card */}
                <div
                  className={`glass rounded-2xl p-6 transition-all duration-300 hover:border-white/15 ${
                    exp.isCurrent
                      ? "border-cyan-500/20 shadow-glow-cyan/20"
                      : ""
                  }`}
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-heading text-lg font-bold text-white">
                          {exp.company}
                        </h3>
                        {exp.isCurrent && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Current
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-sm font-medium text-cyan-400">
                        {exp.role}
                      </p>
                    </div>
                    <div className="flex flex-col items-start gap-1 sm:items-end shrink-0">
                      {exp.period && (
                        <span className="flex items-center gap-1 font-mono text-xs text-slate-500">
                          <Calendar size={11} />
                          {exp.period}
                        </span>
                      )}
                      <span className="flex items-center gap-1 font-mono text-xs text-slate-600">
                        <MapPin size={11} />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                    {exp.description}
                  </p>

                  <ul className="mt-4 space-y-2.5">
                    {exp.bullets.map((bullet, bi) => (
                      <li key={bi} className="flex gap-2.5 text-sm text-slate-400">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500/60" />
                        <span>{highlightMetrics(bullet)}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <Badge key={t} variant="default">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
