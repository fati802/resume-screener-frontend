"use client";
import Link from "next/link";

const PRIMARY = "#404E3B";
const SECONDARY = "#7B9669";
const TEXT = "#BAC8B1";

const Icons = {
  briefcase: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  mail: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
};

const openings = [
  { title: "Frontend Developer", type: "Remote", dept: "Engineering", desc: "Build beautiful, fast React/Next.js interfaces for our platform." },
  { title: "ML Engineer", type: "Remote", dept: "AI & Data", desc: "Improve our candidate ranking models and NLP pipeline." },
  { title: "HR Product Specialist", type: "Hybrid", dept: "Product", desc: "Help shape product features based on recruiter needs." },
  { title: "Backend Developer", type: "Remote", dept: "Engineering", desc: "Expand our FastAPI backend with new features and integrations." },
];

export default function CareersPage() {
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
          {[["About", "/about"], ["Careers", "/careers"], ["Contact", "/contact"]].map(([label, href]) => (
            <Link key={label} href={href}
              className="text-sm transition-colors"
              style={{ color: label === "Careers" ? "#fff" : TEXT, fontWeight: label === "Careers" ? 600 : 400 }}
              onMouseEnter={e => { if (label !== "Careers") (e.currentTarget as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={e => { if (label !== "Careers") (e.currentTarget as HTMLElement).style.color = TEXT; }}
            >{label}</Link>
          ))}
          <Link href="/dashboard"
            className="text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            style={{ background: SECONDARY }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#6a8559"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = SECONDARY}
          >Dashboard</Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="px-8 py-20 text-center" style={{ background: PRIMARY }}>
        <h1 className="text-4xl font-bold text-white mb-4">Join Our Team</h1>
        <p className="text-lg max-w-xl mx-auto" style={{ color: TEXT }}>We're building the future of hiring. Come build it with us.</p>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-16">
        <h2 className="text-xl font-bold mb-6" style={{ color: PRIMARY }}>Open Positions</h2>
        <div className="space-y-4">
          {openings.map((job, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-between transition-all duration-200"
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px rgba(64,78,59,0.12)`}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)"}
            >
              <div>
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <h3 className="font-semibold" style={{ color: PRIMARY }}>{job.title}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#f0f4ee", color: PRIMARY }}>{job.dept}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: TEXT, color: PRIMARY }}>{job.type}</span>
                </div>
                <p className="text-sm" style={{ color: "#777" }}>{job.desc}</p>
              </div>
              <Link href="/contact"
                className="text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors ml-6 flex-shrink-0"
                style={{ background: PRIMARY }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = SECONDARY}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = PRIMARY}
              >Apply</Link>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl p-8 text-center" style={{ background: "#f0f4ee" }}>
          <p className="font-semibold mb-2" style={{ color: PRIMARY }}>Don't see your role?</p>
          <p className="text-sm mb-4" style={{ color: "#777" }}>Send us your CV anyway — we'd love to hear from you.</p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors"
            style={{ background: PRIMARY }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = SECONDARY}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = PRIMARY}
          >
            {Icons.mail} Send an Open Application
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-8 py-8 text-center text-xs" style={{ background: PRIMARY, color: TEXT }}>
        <div className="flex justify-center gap-8 mb-4 flex-wrap">
          {[["About", "/about"], ["Careers", "/careers"], ["Privacy Policy", "/privacy"], ["Terms", "/terms"], ["Contact", "/contact"]].map(([label, href]) => (
            <Link key={label} href={href} className="transition-colors hover:text-white" style={{ color: TEXT }}>{label}</Link>
          ))}
        </div>
        <p style={{ opacity: 0.6 }}>© {new Date().getFullYear()} ResumeScreener. All rights reserved.</p>
      </footer>
    </div>
  );
}