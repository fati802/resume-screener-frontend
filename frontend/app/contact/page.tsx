"use client";
import { useState } from "react";
import Link from "next/link";

const PRIMARY = "#404E3B";
const SECONDARY = "#7B9669";
const TEXT = "#BAC8B1";

const Icons = {
  mail: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  pin: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  clock: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  check: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>,
  send: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
};

const inputStyle = {
  width: "100%",
  border: `1px solid ${TEXT}`,
  borderRadius: "12px",
  padding: "12px 16px",
  fontSize: "14px",
  outline: "none",
  background: "#fff",
  color: "#333",
};

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setSent(true), 600);
  };

  const getFocusStyle = (field: string) => ({
    ...inputStyle,
    border: `1px solid ${focused === field ? SECONDARY : TEXT}`,
    boxShadow: focused === field ? `0 0 0 3px rgba(123,150,105,0.15)` : "none",
  });

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
              style={{ color: label === "Contact" ? "#fff" : TEXT, fontWeight: label === "Contact" ? 600 : 400 }}
              onMouseEnter={e => { if (label !== "Contact") (e.currentTarget as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={e => { if (label !== "Contact") (e.currentTarget as HTMLElement).style.color = TEXT; }}
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
        <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
        <p className="text-lg" style={{ color: TEXT }}>We'd love to hear from you.</p>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Form */}
        <div>
          <h2 className="text-xl font-bold mb-6" style={{ color: PRIMARY }}>Get in Touch</h2>
          {sent ? (
            <div className="rounded-2xl p-10 text-center" style={{ background: "#f0f4ee" }}>
              <div className="flex justify-center mb-4" style={{ color: SECONDARY }}>{Icons.check}</div>
              <h3 className="font-semibold text-lg mb-1" style={{ color: PRIMARY }}>Message Sent!</h3>
              <p className="text-sm" style={{ color: "#777" }}>We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {[
                { label: "Name", field: "name", type: "text", value: name, setter: setName, placeholder: "Your full name" },
                { label: "Email", field: "email", type: "email", value: email, setter: setEmail, placeholder: "you@example.com" },
                { label: "Subject", field: "subject", type: "text", value: subject, setter: setSubject, placeholder: "How can we help?" },
              ].map(({ label, field, type, value, setter, placeholder }) => (
                <div key={field}>
                  <label className="block text-sm font-medium mb-1" style={{ color: PRIMARY }}>{label}</label>
                  <input
                    type={type}
                    value={value}
                    onChange={e => setter(e.target.value)}
                    placeholder={placeholder}
                    required
                    style={getFocusStyle(field)}
                    onFocus={() => setFocused(field)}
                    onBlur={() => setFocused(null)}
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: PRIMARY }}>Message</label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  required
                  rows={5}
                  placeholder="Tell us more..."
                  style={{ ...getFocusStyle("message"), resize: "vertical" }}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                />
              </div>
              <button
                onClick={handleSubmit}
                className="w-full flex items-center justify-center gap-2 text-white py-3 rounded-xl font-semibold text-sm transition-colors"
                style={{ background: PRIMARY }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = SECONDARY}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = PRIMARY}
              >
                {Icons.send} Send Message
              </button>
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-6" style={{ color: PRIMARY }}>Contact Info</h2>
          {[
            { icon: Icons.mail, label: "Email", value: "fatihasheikh235@gmail.com" },
            { icon: Icons.pin, label: "Location", value: "NUST, H-12, Islamabad, Pakistan" },
            { icon: Icons.clock, label: "Response Time", value: "Within 24 hours" },
          ].map(item => (
            <div key={item.label} className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#f0f4ee", color: SECONDARY }}>
                {item.icon}
              </div>
              <div>
                <p className="text-xs mb-0.5" style={{ color: "#888" }}>{item.label}</p>
                <p className="font-medium text-sm" style={{ color: PRIMARY }}>{item.value}</p>
              </div>
            </div>
          ))}
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