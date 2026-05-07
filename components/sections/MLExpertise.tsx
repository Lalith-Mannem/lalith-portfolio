"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { SKILL_GROUPS } from "@/lib/data";

function SkillBar({ name, confidence, delay }: { name: string; confidence: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay, duration: 0.5 }}
      className="space-y-1.5"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-300">{name}</span>
        <span className="font-mono text-xs text-cyan-400">{confidence}%</span>
      </div>
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/8">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: delay + 0.1, duration: 0.9, ease: [0.25, 0.4, 0.25, 1] }}
          style={{ transformOrigin: "left", width: `${confidence}%` }}
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
        />
      </div>
    </motion.div>
  );
}

export default function MLExpertise() {
  return (
    <section id="expertise" className="section-padding">
      <div className="section-container">
        <SectionHeading
          eyebrow="// ml expertise"
          title="Confidence-weighted skills"
          description="Not every engineer knows every tool equally. Here's an honest snapshot of where I'm strongest and where I'm growing."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: gi * 0.1, duration: 0.6 }}
            >
              <GlassCard hover className="h-full p-6">
                <div className="mb-5 flex items-center gap-2.5">
                  <span className="text-xl">{group.icon}</span>
                  <h3 className="font-heading text-sm font-semibold text-white">
                    {group.category}
                  </h3>
                </div>

                <div className="space-y-4">
                  {group.skills.map((skill, si) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      confidence={skill.confidence}
                      delay={gi * 0.1 + si * 0.07}
                    />
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 text-center text-xs text-slate-600 font-mono"
        >
          confidence scores calibrated over 4+ years of production use, not tutorial completion
        </motion.p>
      </div>
    </section>
  );
}
