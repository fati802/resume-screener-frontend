"use client";
import Link from "next/link";

const PRIMARY = "#404E3B";
const SECONDARY = "#7B9669";
const TEXT = "#BAC8B1";

const Icons = {
  target: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  zap: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  shield: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  user: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  mail: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
};

const features = [
  { icon: Icons.zap, title: "Fast", desc: "Screen hundreds of CVs in seconds, not hours." },
  { icon: Icons.target, title: "Accurate", desc: "Multi-factor scoring based on skills, experience, and semantic matching." },
  { icon: Icons.shield, title: "Secure", desc: "Your data stays private. JWT-secured, locally stored." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: "#f5f5f3" }}>

      {/* Navbar */}
      <nav className="px-8 py-4 flex items-center justify-between" style={{ background: PRIMARY }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: SECONDARY }}>
            <span className="text-white text-xs font-bold">RS</span>
          </div>
          <span className="text-white font-bold text-sm">ResumeScreener</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/about" className="text-sm font-semibold" style={{ color: "#fff" }}>About</Link>
          <Link href="/careers" className="text-sm transition-colors" style={{ color: TEXT }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#fff"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = TEXT}>Careers</Link>
          <Link href="/contact" className="text-sm transition-colors" style={{ color: TEXT }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#fff"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = TEXT}>Contact</Link>
          <Link href="/dashboard"
            className="text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            style={{ background: SECONDARY }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#6a8559"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = SECONDARY}>
            Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="px-8 py-20 text-center" style={{ background: PRIMARY }}>
        <h1 className="text-4xl font-bold text-white mb-4">About ResumeScreener</h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: TEXT }}>
          Built to help recruiters find the right talent faster — using smart parsing, semantic matching, and automated ranking.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-16 space-y-10">

        {/* Mission */}
        <div className="bg-white rounded-2xl shadow-sm p-8" style={{ borderLeft: `4px solid ${SECONDARY}` }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: TEXT, color: PRIMARY }}>
              {Icons.target}
            </div>
            <h2 className="text-xl font-bold" style={{ color: PRIMARY }}>Our Mission</h2>
          </div>
          <p className="leading-relaxed text-sm" style={{ color: "#555" }}>
            ResumeScreener was built to eliminate the pain of manual CV screening. We believe every candidate deserves a fair evaluation based on their actual skills and experience — not just keywords on a page. Our platform uses intelligent parsing and weighted scoring to give recruiters a clear, objective ranking of every applicant.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(item => (
            <div key={item.title} className="bg-white rounded-2xl shadow-sm p-6 text-center transition-all duration-200"
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px rgba(64,78,59,0.12)`}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)"}
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: TEXT, color: PRIMARY }}>
                {item.icon}
              </div>
              <h3 className="font-bold mb-2" style={{ color: PRIMARY }}>{item.title}</h3>
              <p className="text-sm" style={{ color: "#777" }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Built By */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: TEXT, color: PRIMARY }}>
              {Icons.user}
            </div>
            <h2 className="text-xl font-bold" style={{ color: PRIMARY }}>Built By</h2>
          </div>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white flex-shrink-0" style={{ background: SECONDARY }}>
              F
            </div>
            <div>
              <p className="font-bold text-lg" style={{ color: PRIMARY }}>Fatiha Sheikh</p>
              <p className="text-sm mt-0.5" style={{ color: SECONDARY }}>Electrical Engineering Student, NUST Islamabad</p>
              <p className="text-sm mt-1" style={{ color: "#777" }}>Full-stack developer · ML enthusiast · Problem solver</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/contact"
            className="inline-flex items-center gap-2 text-white px-8 py-3 rounded-xl font-semibold text-sm transition-colors"
            style={{ background: PRIMARY }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = SECONDARY}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = PRIMARY}
          >
            {Icons.mail}
            Get In Touch
          </Link>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}

function PublicFooter() {
  return (
    <footer className="px-8 py-8 text-center text-xs" style={{ background: PRIMARY, color: TEXT }}>
      <div className="flex justify-center gap-8 mb-4 flex-wrap">
        {[["About", "/about"], ["Careers", "/careers"], ["Privacy Policy", "/privacy"], ["Terms", "/terms"], ["Contact", "/contact"]].map(([label, href]) => (
          <Link key={label} href={href}
            className="transition-colors hover:text-white"
            style={{ color: TEXT }}
          >{label}</Link>
        ))}
      </div>
      <p style={{ color: TEXT, opacity: 0.6 }}>© {new Date().getFullYear()} ResumeScreener. All rights reserved.</p>
    </footer>
  );
}