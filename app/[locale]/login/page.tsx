"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handler for custom credentials login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log(result);

    if (!result?.error) {
      router.push("/dashboard");
    } else {
     
      if (result.code === "email not verified")
        return alert("Email not verified. Verification email sent.");
      alert("Invalid credentials");
    }
  };

  // 👇 NEW: Handler for Google OAuth Login
  const handleGoogleLogin = async () => {
    // We let Auth.js redirect directly to Google, then back to our redirectTo page
    await signIn("google", { redirectTo: "/dashboard" });
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login with Email</button>
      </form>

      <hr style={{ margin: "20px 0" }} />

      {/* 👇 NEW: Google Login Button */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        style={{ backgroundColor: "#4285F4", color: "white" }}
      >
        Sign in with Google
      </button>
    </div>
  );
}
