"use client";
import { useState } from "react";

const PRIMARY = "#404E3B";
const SECONDARY = "#7B9669";
const TEXT = "#BAC8B1";

const Icons = {
  save: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
};

const inputBase = {
  width: "100%",
  border: `1px solid ${TEXT}`,
  borderRadius: "10px",
  padding: "11px 14px",
  fontSize: "14px",
  outline: "none",
  background: "#fff",
  color: "#333",
};

export default function SettingsPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [focused, setFocused] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const getStyle = (field: string) => ({
    ...inputBase,
    border: `1px solid ${focused === field ? SECONDARY : TEXT}`,
    boxShadow: focused === field ? `0 0 0 3px rgba(123,150,105,0.15)` : "none",
  });

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ color: PRIMARY }}>Settings</h1>
        <p className="text-sm mt-2" style={{ color: "#888" }}>Manage your profile and account preferences.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="font-semibold mb-5" style={{ color: PRIMARY }}>Profile Settings</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: PRIMARY }}>Full Name</label>
            <input type="text" value={fullName} onChange={e => setFullName(e.target.value)}
              placeholder="Your full name"
              style={getStyle("name")}
              onFocus={() => setFocused("name")}
              onBlur={() => setFocused(null)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: PRIMARY }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={getStyle("email")}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: PRIMARY }}>Company</label>
            <input type="text" value={company} onChange={e => setCompany(e.target.value)}
              placeholder="Your company"
              style={getStyle("company")}
              onFocus={() => setFocused("company")}
              onBlur={() => setFocused(null)}
            />
          </div>

          <div className="pt-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
              style={{ background: saved ? SECONDARY : PRIMARY }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = SECONDARY}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = saved ? SECONDARY : PRIMARY}
            >
              {Icons.save} {saved ? "Saved!" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}