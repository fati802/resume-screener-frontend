"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

const PRIMARY = "#404E3B";
const SECONDARY = "#7B9669";
const TEXT = "#BAC8B1";

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

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleRegister = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/register", {
        full_name: fullName,
        email,
        password,
        company,
      });
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const getStyle = (field: string) => ({
    ...inputBase,
    border: `1px solid ${focused === field ? SECONDARY : TEXT}`,
    boxShadow: focused === field ? `0 0 0 3px rgba(123,150,105,0.15)` : "none",
  });

  return (
    <main className="min-h-screen flex items-center justify-center px-4"
      style={{ background: `linear-gradient(135deg, #f0f4ee 0%, #e8efe5 50%, #dde8d8 100%)` }}
    >
      <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: PRIMARY }}>
            <span className="text-white text-xl font-bold">RS</span>
          </div>
          <h1 className="text-2xl font-bold" style={{ color: PRIMARY }}>Create account</h1>
          <p className="text-sm mt-1" style={{ color: "#888" }}>Start screening resumes today</p>
        </div>

        {error && (
          <div className="px-4 py-3 rounded-xl mb-5 text-sm" style={{ background: "#fee2e2", color: "#dc2626" }}>{error}</div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: PRIMARY }}>Full Name</label>
            <input type="text" value={fullName} onChange={e => setFullName(e.target.value)}
              placeholder="John Smith" required
              style={getStyle("name")}
              onFocus={() => setFocused("name")}
              onBlur={() => setFocused(null)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: PRIMARY }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com" required
              style={getStyle("email")}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: PRIMARY }}>
              Company <span className="font-normal" style={{ color: "#aaa" }}>(optional)</span>
            </label>
            <input type="text" value={company} onChange={e => setCompany(e.target.value)}
              placeholder="Acme Inc."
              style={getStyle("company")}
              onFocus={() => setFocused("company")}
              onBlur={() => setFocused(null)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: PRIMARY }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="Min 8 characters" required minLength={8}
              style={getStyle("password")}
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused(null)}
              onKeyDown={e => e.key === "Enter" && handleRegister()}
            />
          </div>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full text-white py-3 rounded-xl font-semibold text-sm transition-colors disabled:opacity-50"
            style={{ background: PRIMARY }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = SECONDARY}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = PRIMARY}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </div>

        <p className="text-center text-sm mt-6" style={{ color: "#888" }}>
          Already have an account?{" "}
          <Link href="/login"
            className="font-semibold transition-colors"
            style={{ color: SECONDARY }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = PRIMARY}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = SECONDARY}
          >Sign in</Link>
        </p>
      </div>
    </main>
  );
}