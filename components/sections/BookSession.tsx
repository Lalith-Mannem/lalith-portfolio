"use client";

import Script from "next/script";
import { motion } from "framer-motion";
import {
  FileText,
  Linkedin,
  BrainCircuit,
  Server,
  Binary,
  Clock,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

/* ── Cal.com username — update this after creating your Cal.com account ── */
const CAL_USERNAME = "lmannem"; // → cal.com/lmannem

/* ── Session types — slugs must match your Cal.com event type slugs ──── */
const SESSIONS = [
  {
    icon: FileText,
    title: "Resume Review",
    tagline: "Land that FAANG interview",
    description:
      "I'll give you a detailed, honest critique of your tech resume — structure, impact metrics, ATS optimization, and what ML hiring managers actually look for.",
    duration: "30 min",
    price: "Free",
    calSlug: "resume-review-faang-ready-feedback",
    gradient: "from-cyan-500/15 to-cyan-600/5",
    border: "border-cyan-500/20",
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-500/10",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  {
    icon: Linkedin,
    title: "LinkedIn Strategy",
    tagline: "Build your tech brand",
    description:
      "Profile audit, content strategy, and growth playbook for engineers who want to build an audience. I'll share exactly what worked for me going from 0 to traction.",
    duration: "45 min",
    price: "Free",
    calSlug: "linkedin-growth-strategy-for-engineers",
    gradient: "from-blue-500/15 to-blue-600/5",
    border: "border-blue-500/20",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  {
    icon: BrainCircuit,
    title: "SWE Career Mentorship",
    tagline: "Navigate your SWE career at FAANG",
    description:
      "Career roadmap, leveling advice, and a concrete plan for growing as a Software Engineer — whether you're targeting FAANG, transitioning into ML, or figuring out your next move.",
    duration: "30 min",
    price: "Free",
    calSlug: "ml-career-chat-swe-to-ml-engineer",
    gradient: "from-purple-500/15 to-purple-600/5",
    border: "border-purple-500/20",
    iconColor: "text-purple-400",
    iconBg: "bg-purple-500/10",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  {
    icon: Server,
    title: "Mock System Design Interview",
    tagline: "Ace the design round",
    description:
      "45-min live FAANG system design mock followed by a 15-min debrief. I'll run you through the exact format used at Google — ML systems, distributed backends, or general architecture.",
    duration: "60 min",
    price: "Free",
    calSlug: "mock-system-design-interview-faang-style",
    gradient: "from-emerald-500/15 to-emerald-600/5",
    border: "border-emerald-500/20",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  {
    icon: Binary,
    title: "Mock DSA Interview",
    tagline: "Crack the coding round",
    description:
      "Timed LeetCode-style mock (medium/hard) with real-time hints, followed by a 15-min debrief on complexity, code quality, and communication. Pick your language — Python, Java, C++, or Go.",
    duration: "60 min",
    price: "Free",
    calSlug: "mock-dsa-coding-interview-faang-style",
    gradient: "from-orange-500/15 to-orange-600/5",
    border: "border-orange-500/20",
    iconColor: "text-orange-400",
    iconBg: "bg-orange-500/10",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
];


export default function BookSession() {
  return (
    <>
      {/* Cal.com official embed snippet — must run before buttons render */}
      <Script
        id="cal-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function (C, A, L) {
              let p = function (a, ar) { a.q.push(ar); };
              let d = C.document;
              C.Cal = C.Cal || function () {
                let cal = C.Cal; let ar = arguments;
                if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; }
                if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; typeof namespace === "string" ? (cal.ns[namespace] = api) && p(api, ar) : p(cal, ar); return; }
                p(cal, ar);
              };
            })(window, "https://app.cal.com/embed/embed.js", "init");
            Cal("init", { origin: "https://cal.com" });
            Cal("ui", {
              styles: { branding: { brandColor: "#06b6d4" } },
              hideEventTypeDetails: false,
              layout: "month_view"
            });
          `,
        }}
      />
    <section id="book" className="section-padding relative overflow-hidden">
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/8 to-transparent" />

      <div className="section-container relative">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="// book a session"
            title="Let's work together"
            description="Whether you want to level up your resume, grow on LinkedIn, or break into ML — pick a session and let's make it happen."
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="shrink-0 pb-1"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              All sessions free · limited slots
            </span>
          </motion.div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {SESSIONS.map((session, i) => {
            const Icon = session.icon;
            return (
              <motion.div
                key={session.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group flex flex-col"
              >
                <div
                  className={`flex flex-1 flex-col rounded-2xl border ${session.border} bg-gradient-to-b ${session.gradient} p-5 backdrop-blur-sm transition-all duration-300 hover:border-opacity-50 hover:shadow-lg`}
                >
                  {/* Icon */}
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${session.iconBg} border ${session.border}`}
                  >
                    <Icon size={20} className={session.iconColor} />
                  </div>

                  {/* Title & tagline */}
                  <div className="mt-4">
                    <h3 className="font-heading text-base font-bold text-white">
                      {session.title}
                    </h3>
                    <p className={`mt-0.5 text-xs font-medium ${session.iconColor}`}>
                      {session.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="mt-3 flex-1 text-xs text-slate-400 leading-relaxed">
                    {session.description}
                  </p>

                  {/* Meta */}
                  <div className="mt-4 flex items-center gap-2">
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock size={11} />
                      {session.duration}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${session.badgeColor}`}
                    >
                      {session.price}
                    </span>
                  </div>

                  {/* CTA */}
                  <button
                    data-cal-link={`${CAL_USERNAME}/${session.calSlug}`}
                    data-cal-config='{"layout":"month_view"}'
                    className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl border ${session.border} bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] cursor-pointer`}
                  >
                    <Sparkles size={14} className={session.iconColor} />
                    Book Now
                    <ArrowUpRight
                      size={13}
                      className="ml-auto text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-xs text-slate-700 font-mono"
        >
          Powered by Cal.com · slots update in real time · no spam, promise
        </motion.p>
      </div>
    </section>
    </>
  );
}
