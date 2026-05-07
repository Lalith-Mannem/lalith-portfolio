import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/6 bg-[#030712]">
      <div className="section-container flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <p className="font-mono text-xs text-slate-600">
          © {new Date().getFullYear()} Lalith Mannem. Built with Next.js.
        </p>
        <div className="flex items-center gap-4">
          {[
            { icon: Github, href: "https://github.com/Lalith-Mannem", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/lalith-mannem/", label: "LinkedIn" },
            { icon: Mail, href: "mailto:lalithchandrilreddy@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 transition-colors hover:text-slate-400"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
