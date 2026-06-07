"use client";
import Link from "next/link";

const PRIMARY = "#404E3B";
const SECONDARY = "#7B9669";
const TEXT = "#BAC8B1";

const sections = [
  { title: "1. Information We Collect", body: "We collect information you provide when registering (name, email, company) and resumes you upload for screening. We do not share this data with third parties." },
  { title: "2. How We Use Your Data", body: "Your data is used solely to provide resume screening and candidate ranking features. Resumes are parsed locally and stored securely in your account." },
  { title: "3. Data Storage", body: "All data is stored in a secure local database. Resume files are stored on the server that hosts your instance. You can delete your data at any time." },
  { title: "4. Authentication", body: "We use JWT (JSON Web Tokens) for secure authentication. Passwords are hashed using bcrypt and never stored in plain text." },
  { title: "5. Your Rights", body: "You can delete your account and all associated data at any time by contacting us. You have the right to access, correct, or delete your personal information." },
  { title: "6. Contact", body: "For privacy concerns, contact us at fatihasheikh235@gmail.com." },
];

export default function PrivacyPage() {
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
        <Link href="/dashboard"
          className="text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          style={{ background: SECONDARY }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#6a8559"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = SECONDARY}
        >Dashboard</Link>
      </nav>

      {/* Hero */}
      <div className="px-8 py-16 text-center" style={{ background: PRIMARY }}>
        <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-sm" style={{ color: TEXT }}>Last updated: June 2025</p>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-8 py-16">
        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-8">
          {sections.map((section, i) => (
            <div key={section.title}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: "#f0f4ee", color: PRIMARY }}
                >{i + 1}</div>
                <h2 className="font-semibold" style={{ color: PRIMARY }}>{section.title.replace(/^\d+\.\s/, "")}</h2>
              </div>
              <p className="text-sm leading-relaxed pl-10" style={{ color: "#555" }}>{section.body}</p>
              {i < sections.length - 1 && (
                <div className="mt-8 border-b" style={{ borderColor: "#f0f0ee" }} />
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-xs mt-8" style={{ color: "#aaa" }}>
          Questions? {" "}
          <Link href="/contact"
            className="font-medium transition-colors"
            style={{ color: SECONDARY }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = PRIMARY}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = SECONDARY}
          >Contact us</Link>
        </p>
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