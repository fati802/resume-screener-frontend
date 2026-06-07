"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";

const PRIMARY = "#404E3B";
const SECONDARY = "#7B9669";
const TEXT = "#BAC8B1";

const Icons = {
  upload: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>,
  file: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  check: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>,
  x: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
};

export default function UploadResumePage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      await api.post("/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 2000);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
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
              style={{ color: label === "Upload" ? PRIMARY : "#666", fontWeight: label === "Upload" ? 600 : 400 }}
            >{label}</Link>
          ))}
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold" style={{ color: PRIMARY }}>Upload Resume</h1>
          <p className="text-sm mt-1" style={{ color: "#888" }}>Upload a PDF or DOCX resume to parse and screen.</p>
        </div>

        {success ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="flex justify-center mb-4" style={{ color: SECONDARY }}>{Icons.check}</div>
            <h3 className="font-semibold text-lg mb-1" style={{ color: PRIMARY }}>Resume uploaded successfully!</h3>
            <p className="text-sm" style={{ color: "#888" }}>Redirecting to dashboard...</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-6">

            {error && (
              <div className="px-4 py-3 rounded-xl mb-5 text-sm" style={{ background: "#fee2e2", color: "#dc2626" }}>{error}</div>
            )}

            {/* Drop zone */}
            <div
              onDrop={handleDrop}
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onClick={() => document.getElementById("fileInput")?.click()}
              className="rounded-xl p-12 text-center cursor-pointer transition-all"
              style={{
                border: `2px dashed ${dragOver ? SECONDARY : file ? SECONDARY : TEXT}`,
                background: dragOver ? "#f0f4ee" : file ? "#f9faf8" : "#fafaf9",
              }}
            >
              <div className="flex justify-center mb-4"
                style={{ color: file ? SECONDARY : dragOver ? SECONDARY : TEXT }}
              >
                {file ? Icons.file : Icons.upload}
              </div>

              {file ? (
                <div>
                  <p className="font-semibold text-sm" style={{ color: PRIMARY }}>{file.name}</p>
                  <p className="text-xs mt-1" style={{ color: "#888" }}>{(file.size / 1024).toFixed(1)} KB</p>
                  <p className="text-xs mt-2" style={{ color: SECONDARY }}>Click to change file</p>
                </div>
              ) : (
                <div>
                  <p className="font-semibold text-sm" style={{ color: PRIMARY }}>
                    {dragOver ? "Drop to upload" : "Drop your resume here"}
                  </p>
                  <p className="text-xs mt-1" style={{ color: "#888" }}>or click to browse</p>
                  <p className="text-xs mt-2" style={{ color: TEXT }}>PDF or DOCX · max 10MB</p>
                </div>
              )}
            </div>

            <input
              id="fileInput"
              type="file"
              accept=".pdf,.docx"
              className="hidden"
              onChange={e => setFile(e.target.files?.[0] || null)}
            />

            <div className="flex gap-3 mt-5">
              <button
                onClick={handleUpload}
                disabled={!file || uploading}
                className="flex-1 text-white py-3 rounded-xl font-semibold text-sm transition-colors disabled:opacity-40"
                style={{ background: PRIMARY }}
                onMouseEnter={e => { if (file) (e.currentTarget as HTMLElement).style.background = SECONDARY; }}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = PRIMARY}
              >
                {uploading ? "Uploading..." : "Upload Resume"}
              </button>
              {file && (
                <button
                  onClick={() => setFile(null)}
                  className="flex items-center gap-1.5 px-5 py-3 rounded-xl font-semibold text-sm transition-colors"
                  style={{ background: "#f0f4ee", color: PRIMARY }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = TEXT}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#f0f4ee"}
                >
                  {Icons.x} Clear
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}