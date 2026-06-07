"use client";
import { useState } from "react";
import Link from "next/link";

const PRIMARY = "#404E3B";
const SECONDARY = "#7B9669";
const TEXT = "#BAC8B1";

const Icons = {
  search: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  plus: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  minus: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  mail: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
};

const faqs = [
  { q: "How do I upload a resume?", a: "Go to Upload Resume from the dashboard. You can upload PDF or DOCX files up to 10MB." },
  { q: "How does candidate ranking work?", a: "The system compares candidate skills, experience, education, and semantic similarity against job requirements." },
  { q: "Can I upload multiple resumes at once?", a: "Currently, resumes are uploaded individually. Bulk upload support is planned." },
  { q: "How do I create a job posting?", a: "Navigate to Jobs and click 'Post New Job'. Fill in the required details and submit." },
  { q: "What file formats are supported?", a: "PDF and DOCX files are supported." },
  { q: "How is the match score calculated?", a: "The score is based on skills, experience, education, and semantic matching between the resume and job description." },
  { q: "Can I delete a candidate?", a: "Yes. Open the candidate profile and click Delete." },
  { q: "Is my data secure?", a: "Yes. Your data is protected and only accessible through your account." },
];

export default function HelpPage() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState<number | null>(null);
  const [focused, setFocused] = useState(false);

  const filtered = faqs.filter(f =>
    f.q.toLowerCase().includes(search.toLowerCase()) ||
    f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ color: PRIMARY }}>Help & Support</h1>
        <p className="mt-2 text-sm" style={{ color: "#888" }}>Find answers to common questions about ResumeScreener.</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: focused ? SECONDARY : TEXT }}>
          {Icons.search}
        </span>
        <input
          type="text"
          placeholder="Search FAQs..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            border: `1px solid ${focused ? SECONDARY : TEXT}`,
            borderRadius: "12px",
            padding: "12px 16px 12px 42px",
            fontSize: "14px",
            outline: "none",
            boxShadow: focused ? `0 0 0 3px rgba(123,150,105,0.15)` : "none",
            background: "#fff",
            color: "#333",
          }}
        />
      </div>

      {/* FAQs */}
      <div className="space-y-3 mb-10">
        {filtered.length === 0 ? (
          <p className="text-sm text-center py-8" style={{ color: "#888" }}>No results for "{search}"</p>
        ) : filtered.map((faq, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: `1px solid ${open === i ? TEXT : "#f0f0ee"}` }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex justify-between items-center px-6 py-5 text-left transition-colors"
              style={{ background: open === i ? "#f9faf8" : "#fff" }}
            >
              <span className="font-medium text-sm" style={{ color: PRIMARY }}>{faq.q}</span>
              <span className="flex-shrink-0 ml-4" style={{ color: SECONDARY }}>
                {open === i ? Icons.minus : Icons.plus}
              </span>
            </button>
            {open === i && (
              <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: "#555", borderTop: `1px solid #f0f0ee` }}>
                <div className="pt-4">{faq.a}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact CTA */}
      <div className="rounded-2xl p-8 text-center" style={{ background: "#f0f4ee" }}>
        <h2 className="text-lg font-semibold mb-2" style={{ color: PRIMARY }}>Still Need Help?</h2>
        <p className="text-sm mb-5" style={{ color: "#777" }}>Our support team is here to assist you.</p>
        <Link href="/contact"
          className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
          style={{ background: PRIMARY }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = SECONDARY}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = PRIMARY}
        >
          {Icons.mail} Contact Support
        </Link>
      </div>
    </div>
  );
}