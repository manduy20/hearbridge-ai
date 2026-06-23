"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  email: string;
}

export default function LoginPage() {
  const router = useRouter();

  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!authName || !authEmail || !authPassword) {
      alert("Silakan isi nama, email, dan password!");
      return;
    }

    const loggedInUser: User = {
      name: authName,
      email: authEmail,
    };

    if (typeof window !== "undefined") {
      localStorage.setItem("hearbridge_user", JSON.stringify(loggedInUser));
    }

    router.push("/dashboard");
  };

  return (
    <div className="login-root">
      <style>{`
        .login-root {
          --bg: #101820;
          --bg-raised: #1B2530;
          --ink: #F5F3EF;
          --ink-70: rgba(245,243,239,0.72);
          --ink-50: rgba(245,243,239,0.45);
          --warm: #FF8B5E;
          --cool: #5EC8FF;
          --hairline: rgba(245,243,239,0.10);

          min-height: 100vh;
          background: var(--bg);
          color: var(--ink);
          font-family: 'Inter', system-ui, sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .login-card {
          width: 100%;
          max-width: 420px;
          background: var(--bg-raised);
          border: 1px solid var(--hairline);
          border-radius: 22px;
          padding: 40px 36px;
        }
        .login-back {
          font-size: 13px;
          color: var(--ink-50);
          background: none;
          border: none;
          cursor: pointer;
          margin-bottom: 28px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .login-back:hover { color: var(--ink); }
        .login-title {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-size: 26px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .login-sub {
          font-size: 14px;
          color: var(--ink-70);
          margin-bottom: 30px;
        }
        .login-field { margin-bottom: 18px; }
        .login-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 8px;
          color: var(--ink-70);
        }
        .login-input {
          width: 100%;
          padding: 13px 16px;
          border-radius: 12px;
          background: var(--bg);
          border: 1px solid var(--hairline);
          color: var(--ink);
          font-size: 14.5px;
          outline: none;
          transition: border-color 0.2s;
        }
        .login-input:focus { border-color: var(--cool); }
        .login-submit {
          width: 100%;
          margin-top: 8px;
          padding: 14px;
          border-radius: 12px;
          border: none;
          font-weight: 700;
          font-size: 15px;
          color: #101820;
          background: linear-gradient(135deg, var(--warm), var(--cool));
          cursor: pointer;
          transition: transform 0.15s;
        }
        .login-submit:hover { transform: translateY(-1px); }
        .login-submit:active { transform: translateY(0); }
      `}</style>

      <div className="login-card">
        <button className="login-back" onClick={() => router.push("/")}>
          ← Kembali
        </button>
        <h1 className="login-title">Masuk ke HearBridge AI</h1>
        <p className="login-sub">
          Isi data berikut untuk mulai menggunakan dashboard komunikasi digital Anda.
        </p>

        <form onSubmit={handleLogin}>
          <div className="login-field">
            <label className="login-label">Nama</label>
            <input
              type="text"
              required
              value={authName}
              onChange={(e) => setAuthName(e.target.value)}
              placeholder="Nama Anda"
              className="login-input"
            />
          </div>
          <div className="login-field">
            <label className="login-label">Email</label>
            <input
              type="email"
              required
              value={authEmail}
              onChange={(e) => setAuthEmail(e.target.value)}
              placeholder="nama@email.com"
              className="login-input"
            />
          </div>
          <div className="login-field">
            <label className="login-label">Password</label>
            <input
              type="password"
              required
              value={authPassword}
              onChange={(e) => setAuthPassword(e.target.value)}
              placeholder="••••••••"
              className="login-input"
            />
          </div>
          <button type="submit" className="login-submit">
            Masuk Ke Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
