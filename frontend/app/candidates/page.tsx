"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";

const PRIMARY = "#404E3B";
const SECONDARY = "#7B9669";
const TEXT = "#BAC8B1";

const Icons = {
  upload: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>,
  file: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  trash: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>,
};

export default function CandidatesPage() {
  const router = useRouter();
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await api.get("/resume/?page=1&page_size=50");
      setCandidates(res.data.candidates || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete ${name}'s resume? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await api.delete(`/resume/${id}`);
      setCandidates(candidates.filter(c => c.id !== id));
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(null);
    }
  };

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
          {[["Dashboard", "/dashboard"], ["Jobs", "/jobs"], ["Candidates", "/candidates"], ["Upload", "/upload"], ["Ranking", "/ranking"]].map(([label, href]) => (
            <Link key={label} href={href}
              className="text-sm transition-colors"
              style={{ color: label === "Candidates" ? PRIMARY : "#666", fontWeight: label === "Candidates" ? 600 : 400 }}
            >{label}</Link>
          ))}
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: PRIMARY }}>Candidates</h1>
            <p className="text-sm mt-1" style={{ color: "#888" }}>{candidates.length} resume{candidates.length !== 1 ? "s" : ""} uploaded</p>
          </div>
          <Link href="/upload"
            className="flex items-center gap-2 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors"
            style={{ background: PRIMARY }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = SECONDARY}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = PRIMARY}
          >
            {Icons.upload} Upload Resume
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20 text-sm" style={{ color: "#888" }}>Loading...</div>
        ) : candidates.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: TEXT, color: PRIMARY }}>
              {Icons.file}
            </div>
            <h3 className="font-semibold mb-2" style={{ color: PRIMARY }}>No candidates yet</h3>
            <p className="text-sm mb-6" style={{ color: "#888" }}>Upload resumes to start screening candidates.</p>
            <Link href="/upload"
              className="inline-block text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
              style={{ background: PRIMARY }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = SECONDARY}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = PRIMARY}
            >
              Upload Resume
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead style={{ background: "#f5f5f3", borderBottom: `1px solid ${TEXT}` }}>
                <tr>
                  {["Name", "Email", "File", "Experience", "Skills", "Actions"].map(h => (
                    <th key={h} className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wide" style={{ color: "#888" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {candidates.map((c: any) => (
                  <tr key={c.id} style={{ borderBottom: `1px solid #f0f0ee` }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#f9faf8"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
                  >
                    <td className="px-6 py-4">
                      <Link href={`/candidates/${c.id}`}
                        className="font-semibold text-sm transition-colors"
                        style={{ color: PRIMARY }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = SECONDARY}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = PRIMARY}
                      >
                        {c.full_name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm" style={{ color: "#666" }}>{c.email}</td>
                    <td className="px-6 py-4 text-sm" style={{ color: "#888" }}>{c.original_filename}</td>
                    <td className="px-6 py-4 text-sm font-medium" style={{ color: PRIMARY }}>{c.total_experience_years} yrs</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {c.skills?.slice(0, 3).map((skill: string) => (
                          <span key={skill} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#f0f4ee", color: PRIMARY }}>
                            {skill}
                          </span>
                        ))}
                        {c.skills?.length > 3 && (
                          <span className="text-xs" style={{ color: TEXT }}>+{c.skills.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(c.id, c.full_name)}
                        disabled={deleting === c.id}
                        className="flex items-center gap-1 text-sm font-medium disabled:opacity-50 transition-colors"
                        style={{ color: "#dc2626" }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#b91c1c"}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#dc2626"}
                      >
                        {Icons.trash} {deleting === c.id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}