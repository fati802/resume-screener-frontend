"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";

const PRIMARY = "#404E3B";
const SECONDARY = "#7B9669";
const TEXT = "#BAC8B1";

const Icons = {
  back: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
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

export default function EditJobPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.id as string;
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [preferredSkills, setPreferredSkills] = useState("");
  const [minExperience, setMinExperience] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const res = await api.get(`/jobs/${jobId}`);
      const job = res.data;
      setTitle(job.title);
      setCompany(job.company || "");
      setDescription(job.description);
      setRequiredSkills(job.required_skills?.join(", ") || "");
      setPreferredSkills(job.preferred_skills?.join(", ") || "");
      setMinExperience(job.min_experience_years);
      setIsActive(job.is_active);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setSaving(true);
    setError("");
    try {
      await api.patch(`/jobs/${jobId}`, {
        title, company, description,
        required_skills: requiredSkills.split(",").map(s => s.trim()).filter(Boolean),
        preferred_skills: preferredSkills.split(",").map(s => s.trim()).filter(Boolean),
        min_experience_years: minExperience,
        is_active: isActive,
      });
      router.push(`/jobs/${jobId}`);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to update job.");
    } finally {
      setSaving(false);
    }
  };

  const getStyle = (field: string) => ({
    ...inputBase,
    border: `1px solid ${focused === field ? SECONDARY : TEXT}`,
    boxShadow: focused === field ? `0 0 0 3px rgba(123,150,105,0.15)` : "none",
  });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#f5f5f3" }}>
      <div className="text-sm font-semibold" style={{ color: PRIMARY }}>Loading...</div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: "#f5f5f3" }}>

      {/* Navbar */}
      <nav className="px-6 py-4 flex items-center justify-between sticky top-0 z-10 bg-white" style={{ borderBottom: `1px solid ${TEXT}` }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: PRIMARY }}>
            <span className="text-white text-xs font-bold">RS</span>
          </div>
          <span className="font-bold text-sm" style={{ color: PRIMARY }}>ResumeScreener</span>
        </div>
        <div className="flex items-center gap-6">
          {[["Dashboard","/dashboard"],["Jobs","/jobs"],["Candidates","/candidates"],["Upload","/upload"],["Ranking","/ranking"]].map(([label, href]) => (
            <Link key={label} href={href} className="text-sm transition-colors"
              style={{ color: label === "Jobs" ? PRIMARY : "#666", fontWeight: label === "Jobs" ? 600 : 400 }}
            >{label}</Link>
          ))}
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-8">

        {/* Back */}
        <button onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-medium mb-6 transition-colors"
          style={{ color: PRIMARY }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = SECONDARY}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = PRIMARY}
        >{Icons.back} Back</button>

        <div className="mb-6">
          <h1 className="text-2xl font-bold" style={{ color: PRIMARY }}>Edit Job</h1>
          <p className="text-sm mt-1" style={{ color: "#888" }}>Update the job description and requirements.</p>
        </div>

        {error && (
          <div className="px-4 py-3 rounded-xl mb-5 text-sm" style={{ background: "#fee2e2", color: "#dc2626" }}>{error}</div>
        )}

        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-5">

          {[
            { label: "Job Title", field: "title", value: title, setter: setTitle, type: "text", required: true },
            { label: "Company", field: "company", value: company, setter: setCompany, type: "text", required: false },
          ].map(({ label, field, value, setter, type, required }) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1" style={{ color: PRIMARY }}>{label}</label>
              <input type={type} value={value} onChange={e => setter(e.target.value)} required={required}
                style={getStyle(field)}
                onFocus={() => setFocused(field)}
                onBlur={() => setFocused(null)}
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: PRIMARY }}>Job Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} required rows={5}
              style={{ ...getStyle("description"), resize: "vertical" }}
              onFocus={() => setFocused("description")}
              onBlur={() => setFocused(null)}
            />
          </div>

          {[
            { label: "Required Skills", field: "required", value: requiredSkills, setter: setRequiredSkills, placeholder: "e.g. Python, React, SQL" },
            { label: "Preferred Skills", field: "preferred", value: preferredSkills, setter: setPreferredSkills, placeholder: "e.g. Docker, AWS, GraphQL" },
          ].map(({ label, field, value, setter, placeholder }) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1" style={{ color: PRIMARY }}>{label}</label>
              <input type="text" value={value} onChange={e => setter(e.target.value)} placeholder={placeholder}
                style={getStyle(field)}
                onFocus={() => setFocused(field)}
                onBlur={() => setFocused(null)}
              />
              <p className="text-xs mt-1" style={{ color: "#aaa" }}>Comma separated</p>
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: PRIMARY }}>Minimum Experience (years)</label>
            <input type="number" value={minExperience} onChange={e => setMinExperience(Number(e.target.value))} min={0}
              style={{ ...getStyle("exp"), maxWidth: "140px" }}
              onFocus={() => setFocused("exp")}
              onBlur={() => setFocused(null)}
            />
          </div>

          {/* Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsActive(!isActive)}
              className="relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0"
              style={{ background: isActive ? SECONDARY : TEXT }}
            >
              <span className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
                style={{ transform: isActive ? "translateX(20px)" : "translateX(0)" }}
              />
            </button>
            <label className="text-sm font-medium" style={{ color: PRIMARY }}>
              Job is {isActive ? "Active" : "Inactive"}
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button onClick={handleSubmit} disabled={saving}
              className="flex items-center gap-2 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors disabled:opacity-50"
              style={{ background: PRIMARY }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = SECONDARY}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = PRIMARY}
            >
              {Icons.save} {saving ? "Saving..." : "Save Changes"}
            </button>
            <Link href={`/jobs/${jobId}`}
              className="px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
              style={{ background: "#f0f4ee", color: PRIMARY }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = TEXT}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#f0f4ee"}
            >Cancel</Link>
          </div>
        </div>
      </div>
    </div>
  );
}