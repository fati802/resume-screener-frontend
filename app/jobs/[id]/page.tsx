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
  edit: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  trash: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>,
  zap: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  trophy: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>,
  briefcase: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  users: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  circle: <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>,
};

export default function JobDetailPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.id as string;
  const [job, setJob] = useState<any>(null);
  const [ranking, setRanking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [rankingLoading, setRankingLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const res = await api.get(`/jobs/${jobId}`);
      setJob(res.data);
      fetchRanking();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRanking = async () => {
    try {
      const res = await api.get(`/ranking/${jobId}`);
      setRanking(res.data);
    } catch (err) {}
  };

  const handleRank = async () => {
    setRankingLoading(true);
    setError("");
    try {
      const res = await api.post("/ranking/rank", { job_id: jobId });
      setRanking(res.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Ranking failed.");
    } finally {
      setRankingLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this job? This cannot be undone.")) return;
    try {
      await api.delete(`/jobs/${jobId}`);
      router.push("/jobs");
    } catch (err) {
      console.error(err);
    }
  };

  const getScoreStyle = (score: number) => {
    if (score >= 80) return { color: "#16a34a", background: "#f0fdf4" };
    if (score >= 60) return { color: "#ca8a04", background: "#fefce8" };
    return { color: "#dc2626", background: "#fef2f2" };
  };

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

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Back */}
        <button onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-medium mb-5 transition-colors"
          style={{ color: PRIMARY }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = SECONDARY}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = PRIMARY}
        >{Icons.back} Back to Jobs</button>

        {/* Job Header Card */}
        {job && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold" style={{ color: PRIMARY }}>{job.title}</h1>
                {job.company && <p className="text-sm mt-1" style={{ color: SECONDARY }}>{job.company}</p>}
                <div className="flex items-center gap-4 mt-3 text-sm flex-wrap">
                  <span className="flex items-center gap-1.5" style={{ color: "#777" }}>
                    {Icons.briefcase} Min {job.min_experience_years} yrs exp
                  </span>
                  <span className="flex items-center gap-1.5" style={{ color: "#777" }}>
                    {Icons.users} {job.candidate_count} candidates
                  </span>
                  <span className="flex items-center gap-1.5" style={{ color: job.is_active ? "#16a34a" : "#dc2626" }}>
                    {Icons.circle} {job.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href={`/jobs/${jobId}/edit`}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                  style={{ background: "#f0f4ee", color: PRIMARY }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = TEXT}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#f0f4ee"}
                >{Icons.edit} Edit</Link>
                <button onClick={handleDelete}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                  style={{ background: "#fee2e2", color: "#dc2626" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#fecaca"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#fee2e2"}
                >{Icons.trash} Delete</button>
              </div>
            </div>

            <p className="text-sm leading-relaxed mt-4" style={{ color: "#555" }}>{job.description}</p>

            <div className="grid grid-cols-2 gap-4 mt-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "#888" }}>Required Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {job.required_skills?.map((skill: string) => (
                    <span key={skill} className="text-xs px-2.5 py-1 rounded-full" style={{ background: "#f0f4ee", color: PRIMARY }}>{skill}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "#888" }}>Preferred Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {job.preferred_skills?.map((skill: string) => (
                    <span key={skill} className="text-xs px-2.5 py-1 rounded-full" style={{ background: TEXT, color: PRIMARY }}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rank Button Row */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold" style={{ color: PRIMARY }}>Candidate Rankings</h2>
          <button onClick={handleRank} disabled={rankingLoading}
            className="flex items-center gap-2 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors disabled:opacity-50"
            style={{ background: PRIMARY }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = SECONDARY}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = PRIMARY}
          >
            {Icons.zap} {rankingLoading ? "Ranking..." : "Rank Candidates"}
          </button>
        </div>

        {error && (
          <div className="px-4 py-3 rounded-xl mb-5 text-sm" style={{ background: "#fee2e2", color: "#dc2626" }}>{error}</div>
        )}

        {/* Rankings List */}
        {ranking ? (
          <div className="space-y-4">
            {ranking.ranked_candidates.map((candidate: any) => (
              <div key={candidate.candidate_id} className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: "#f0f4ee", color: PRIMARY }}>
                      #{candidate.rank}
                    </div>
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
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="flex justify-center mb-4" style={{ color: TEXT }}>{Icons.trophy}</div>
            <h3 className="font-semibold mb-2" style={{ color: PRIMARY }}>No rankings yet</h3>
            <p className="text-sm mb-6" style={{ color: "#888" }}>Click Rank Candidates to score and rank all uploaded resumes against this job.</p>
          </div>
        )}
      </div>
    </div>
  );
}