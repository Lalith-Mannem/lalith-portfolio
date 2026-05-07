"use client";

import { motion } from "framer-motion";
import { MapPin, GraduationCap, Sparkles } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { MODEL_CARD_SPECS } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="section-padding">
      <div className="section-container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Bio — left 3 cols */}
          <div className="lg:col-span-3">
            <SectionHeading
              eyebrow="// about me"
              title="Building distributed systems that move petabytes"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mt-8 space-y-5 text-base text-slate-400 leading-relaxed"
            >
              <p>
                I&rsquo;m a Software Engineer at{" "}
                <strong className="text-white">Google</strong> on the Data
                Infrastructure &amp; Distributed Systems team, building the{" "}
                <span className="text-cyan-400">DV360 Audience Backend</span> —
                petabyte-scale pipelines for Customer Match, audience profiling,
                identity resolution, and serving-time eligibility checks
                handling <strong className="text-white">10M+ QPS</strong> and
                supporting{" "}
                <strong className="text-white">48% of global DV360 ad serving traffic</strong>.
              </p>
              <p>
                Before Google, I built serverless{" "}
                <span className="text-purple-400">control-plane infrastructure</span>{" "}
                at <strong className="text-white">AWS Redshift</strong>, distributed
                CI/CD systems at{" "}
                <strong className="text-white">Magic Leap</strong>, and
                event-driven backend platforms at{" "}
                <strong className="text-white">Openlane</strong>. Across every
                role, the constant has been: large-scale distributed systems,
                fault-tolerant pipelines, and engineering for reliability at
                production load.
              </p>
              <p>
                My work lives in the space where{" "}
                <span className="text-cyan-400">data infrastructure</span> meets{" "}
                <span className="text-purple-400">systems engineering</span> — C++
                pipelines processing 5 PB/day, streaming architectures reducing
                latency by 60%, serverless rewrites cutting costs by 50%. I care
                deeply about correctness, observability, and systems that stay
                stable under pressure.
              </p>
              <p>
                Outside of engineering, I mentor engineers on career transitions,
                review resumes for FAANG-bound candidates, and am building a
                presence as a{" "}
                <span className="text-emerald-400">LinkedIn tech content creator</span>{" "}
                — sharing real engineering lessons from Google, AWS, and beyond.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Open to ML Engineer roles · FAANG
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-400">
                <MapPin size={12} className="text-cyan-400" />
                Mountain View, CA
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-400">
                <GraduationCap size={12} className="text-purple-400" />
                M.S. Computer Engineering · ASU
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-400">
                <Sparkles size={12} className="text-yellow-400" />
                LinkedIn Content Creator
              </span>
            </motion.div>
          </div>

          {/* Model Card — right 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="lg:col-span-2"
          >
            <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-[#0a0f1e]">
              {/* Header bar */}
              <div className="flex items-center gap-2 border-b border-white/8 bg-white/3 px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-500/60" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/60" />
                </div>
                <span className="ml-2 font-mono text-xs text-slate-500">
                  lalith_mannem_model_card.yaml
                </span>
              </div>

              {/* Card content */}
              <div className="p-5">
                <div className="mb-4 flex items-center gap-2">
                  <span className="font-mono text-xs text-purple-400">model:</span>
                  <span className="font-mono text-xs font-bold text-white">lalith-mannem-v1</span>
                </div>

                <dl className="space-y-3">
                  {MODEL_CARD_SPECS.map((spec, i) => (
                    <motion.div
                      key={spec.key}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.06, duration: 0.4 }}
                      className="grid grid-cols-[auto,1fr] gap-3 items-start"
                    >
                      <dt className="font-mono text-xs text-cyan-600 whitespace-nowrap">
                        {spec.key}:
                      </dt>
                      <dd className="font-mono text-xs text-slate-300 break-words">
                        {spec.value}
                      </dd>
                    </motion.div>
                  ))}
                </dl>

                {/* Tags */}
                <div className="mt-5 flex flex-wrap gap-1.5 border-t border-white/6 pt-4">
                  {["distributed-systems", "google", "data-infra", "c++", "apache-beam", "faang-ready"].map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] text-purple-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-cyan-500/10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
