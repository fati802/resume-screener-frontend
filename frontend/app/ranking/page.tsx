"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";

const PRIMARY = "#404E3B";
const SECONDARY = "#7B9669";
const TEXT = "#BAC8B1";

const Icons = {
  zap: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  trophy: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>,
  chevron: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
};

export default function RankingPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [ranking, setRanking] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [rankingLoading, setRankingLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectFocused, setSelectFocused] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/jobs/?page=1&page_size=20");
      setJobs(res.data.jobs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRank = async () => {
    if (!selectedJob) return;
    setRankingLoading(true);
    setError("");
    setRanking(null);
    try {
      const res = await api.post("/ranking/rank", { job_id: selectedJob });
      setRanking(res.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Ranking failed.");
    } finally {
      setRankingLoading(false);
    }
  };

  const getScoreStyle = (score: number) => {
    if (score >= 80) return { color: "#16a34a", background: "#f0fdf4" };
    if (score >= 60) return { color: "#ca8a04", background: "#fefce8" };
    return { color: "#dc2626", background: "#fef2f2" };
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
          {[["Dashboard","/dashboard"],["Jobs","/jobs"],["Candidates","/candidates"],["Upload","/upload"],["Ranking","/ranking"]].map(([label, href]) => (
            <Link key={label} href={href} className="text-sm transition-colors"
              style={{ color: label === "Ranking" ? PRIMARY : "#666", fontWeight: label === "Ranking" ? 600 : 400 }}
            >{label}</Link>
          ))}
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold" style={{ color: PRIMARY }}>Candidate Ranking</h1>
          <p className="text-sm mt-1" style={{ color: "#888" }}>Select a job to rank all candidates against it.</p>
        </div>

        {/* Job selector */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <select
                value={selectedJob}
                onChange={e => setSelectedJob(e.target.value)}
                onFocus={() => setSelectFocused(true)}
                onBlur={() => setSelectFocused(false)}
                style={{
                  width: "100%",
                  border: `1px solid ${selectFocused ? SECONDARY : TEXT}`,
                  borderRadius: "10px",
                  padding: "11px 36px 11px 14px",
                  fontSize: "14px",
                  outline: "none",
                  background: "#fff",
                  color: selectedJob ? "#333" : "#aaa",
                  boxShadow: selectFocused ? `0 0 0 3px rgba(123,150,105,0.15)` : "none",
                  appearance: "none",
                  cursor: "pointer",
                }}
              >
                <option value="">Select a job...</option>
                {jobs.map((job: any) => (
                  <option key={job.id} value={job.id}>
                    {job.title}{job.company ? ` — ${job.company}` : ""}
                  </option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: TEXT }}>
                {Icons.chevron}
              </span>
            </div>
            <button
              onClick={handleRank}
              disabled={!selectedJob || rankingLoading}
              className="flex items-center gap-2 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors disabled:opacity-40"
              style={{ background: PRIMARY }}
              onMouseEnter={e => { if (selectedJob) (e.currentTarget as HTMLElement).style.background = SECONDARY; }}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = PRIMARY}
            >
              {Icons.zap} {rankingLoading ? "Ranking..." : "Rank Candidates"}
            </button>
          </div>
        </div>

        {error && (
          <div className="px-4 py-3 rounded-xl mb-5 text-sm" style={{ background: "#fee2e2", color: "#dc2626" }}>{error}</div>
        )}

        {/* Results */}
        {ranking ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold" style={{ color: PRIMARY }}>
                Results for: <span style={{ color: SECONDARY }}>{ranking.job_title}</span>
              </h2>
              <span className="text-xs px-3 py-1 rounded-full" style={{ background: "#f0f4ee", color: PRIMARY }}>
                {ranking.total_candidates} candidates ranked
              </span>
            </div>
            <div className="space-y-4">
              {ranking.ranked_candidates.map((candidate: any) => (
                <div key={candidate.candidate_id} className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                        style={{ background: "#f0f4ee", color: PRIMARY }}
                      >#{candidate.rank}</div>
                      <div>
                        <h3 className="font-semibold text-sm" style={{ color: PRIMARY }}>{candidate.full_name}</h3>
                        <p className="text-xs mt-0.5" style={{ color: "#888" }}>{candidate.email}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm font-bold" style={getScoreStyle(candidate.scores.overall_score)}>
                      {candidate.scores.overall_score.toFixed(1)}%
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
                    {[
                      { label: "Skill Match", val: candidate.scores.skill_match_score },
                      { label: "Semantic", val: candidate.scores.semantic_score },
                      { label: "Experience", val: candidate.scores.experience_score },
                      { label: "Education", val: candidate.scores.education_score },
                    ].map(({ label, val }) => (
                      <div key={label} className="rounded-xl p-3 text-center" style={{ background: "#f5f5f3" }}>
                        <p className="text-xs mb-1" style={{ color: "#888" }}>{label}</p>
                        <p className="font-bold text-sm" style={{ color: PRIMARY }}>{val.toFixed(1)}%</p>
                      </div>
                    ))}
                  </div>

                  {candidate.skill_gap.missing_required.length > 0 && (
                    <div className="mt-4 pt-4" style={{ borderTop: `1px solid #f0f0ee` }}>
                      <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "#888" }}>Missing Required Skills</p>
                      <div className="flex flex-wrap gap-1.5">
                        {candidate.skill_gap.missing_required.map((skill: string) => (
                          <span key={skill} className="text-xs px-2.5 py-1 rounded-full" style={{ background: "#fee2e2", color: "#dc2626" }}>{skill}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : !rankingLoading && (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="flex justify-center mb-4" style={{ color: TEXT }}>{Icons.trophy}</div>
            <h3 className="font-semibold mb-2" style={{ color: PRIMARY }}>No rankings yet</h3>
            <p className="text-sm" style={{ color: "#888" }}>Select a job above and click Rank Candidates to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}