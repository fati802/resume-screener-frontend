"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";

const PRIMARY = "#404E3B";
const SECONDARY = "#7B9669";
const TEXT = "#BAC8B1";

const Icons = {
  briefcase: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  plus: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  eye: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  users: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  clock: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
};

export default function JobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs/?page=1&page_size=20");
      setJobs(res.data.jobs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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
          {[["Dashboard","/dashboard"],["Jobs","/jobs"],["Candidates","/candidates"],["Upload","/upload"],["Ranking","/ranking"]].map(([label, href]) => (
            <Link key={label} href={href} className="text-sm transition-colors"
              style={{ color: label === "Jobs" ? PRIMARY : "#666", fontWeight: label === "Jobs" ? 600 : 400 }}
            >{label}</Link>
          ))}
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: PRIMARY }}>Jobs</h1>
            <p className="text-sm mt-1" style={{ color: "#888" }}>{jobs.length} job{jobs.length !== 1 ? "s" : ""} posted</p>
          </div>
          <Link href="/jobs/create"
            className="flex items-center gap-2 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors"
            style={{ background: PRIMARY }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = SECONDARY}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = PRIMARY}
          >
            {Icons.plus} Post New Job
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20 text-sm" style={{ color: "#888" }}>Loading...</div>
        ) : jobs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#f0f4ee", color: SECONDARY }}>
              {Icons.briefcase}
            </div>
            <h3 className="font-semibold mb-2" style={{ color: PRIMARY }}>No jobs yet</h3>
            <p className="text-sm mb-6" style={{ color: "#888" }}>Post your first job to start screening candidates.</p>
            <Link href="/jobs/create"
              className="inline-block text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
              style={{ background: PRIMARY }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = SECONDARY}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = PRIMARY}
            >Post a Job</Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {jobs.map((job: any) => (
              <div key={job.id} className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-between"
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px rgba(64,78,59,0.1)`}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)"}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-lg" style={{ color: PRIMARY }}>{job.title}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: job.is_active ? "#f0f4ee" : "#fee2e2", color: job.is_active ? PRIMARY : "#dc2626" }}>
                      {job.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs mb-3" style={{ color: "#888" }}>
                    {job.company && <span style={{ color: SECONDARY, fontWeight: 500 }}>{job.company}</span>}
                    <span className="flex items-center gap-1">{Icons.clock} {job.min_experience_years} yrs exp</span>
                    <span className="flex items-center gap-1">{Icons.users} {job.candidate_count} candidate{job.candidate_count !== 1 ? "s" : ""}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {job.required_skills?.slice(0, 5).map((skill: string) => (
                      <span key={skill} className="text-xs px-2.5 py-1 rounded-full" style={{ background: "#f0f4ee", color: PRIMARY }}>{skill}</span>
                    ))}
                    {job.required_skills?.length > 5 && (
                      <span className="text-xs" style={{ color: TEXT }}>+{job.required_skills.length - 5} more</span>
                    )}
                  </div>
                </div>
                <Link href={`/jobs/${job.id}`}
                  className="flex items-center gap-1.5 text-white px-4 py-2 rounded-xl text-sm font-medium ml-4 transition-colors"
                  style={{ background: PRIMARY }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = SECONDARY}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = PRIMARY}
                >
                  {Icons.eye} View
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}