"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";

const links = [
  {
    icon: Mail,
    label: "Email",
    href: "mailto:lalithchandrilreddy@gmail.com",
    description: "Drop me a note",
    color: "from-cyan-500/20 to-cyan-600/10",
    border: "border-cyan-500/20",
    iconColor: "text-cyan-400",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/lalith-mannem/",
    description: "Connect professionally",
    color: "from-blue-500/20 to-blue-600/10",
    border: "border-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/Lalith-Mannem",
    description: "See my code",
    color: "from-purple-500/20 to-purple-600/10",
    border: "border-purple-500/20",
    iconColor: "text-purple-400",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background pulse */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="h-[600px] w-[600px] rounded-full bg-gradient-radial from-cyan-500 to-transparent"
        />
      </div>
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="h-[400px] w-[400px] rounded-full bg-gradient-radial from-purple-500 to-transparent" />
      </motion.div>

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="eyebrow">// contact</span>
          <h2 className="mt-4 font-heading text-4xl font-black text-white sm:text-5xl lg:text-6xl">
            Let&rsquo;s build the future{" "}
            <span className="gradient-text">of AI — together.</span>
          </h2>
          <p className="mt-5 mx-auto max-w-lg text-base text-slate-400 leading-relaxed">
            Whether you&rsquo;re looking to hire an ML engineer, collaborate on
            open-source, or just talk systems design — I&rsquo;d love to hear
            from you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {links.map(({ icon: Icon, label, href, description, color, border, iconColor }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 + i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.04, y: -2 }}
              className={`group flex items-center gap-3 rounded-2xl border ${border} bg-gradient-to-br ${color} px-6 py-4 backdrop-blur-sm transition-all duration-300 hover:shadow-lg min-w-[180px]`}
            >
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl border ${border} bg-white/5`}>
                <Icon size={18} className={iconColor} />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-white">{label}</div>
                <div className="text-xs text-slate-500">{description}</div>
              </div>
              <ArrowUpRight
                size={14}
                className="ml-auto text-slate-600 transition-all group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
