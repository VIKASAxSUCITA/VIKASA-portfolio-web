"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import { useAuth } from "@/app/components/auth/AuthProvider";

function authErrorMessage(error: unknown) {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
        return "Incorrect email or password.";
      case "auth/too-many-requests":
        return "Too many attempts. Try again later.";
      case "auth/popup-closed-by-user":
        return "Google sign-in was cancelled.";
      default:
        return error.message;
    }
  }
  return "Unable to sign in. Please try again.";
}

export default function AdminLoginForm() {
  const router = useRouter();
  const { signInEmail, signInGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleEmailLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      await signInEmail(email.trim(), password);
      router.replace("/admin");
    } catch (err) {
      setError(authErrorMessage(err));
    } finally {
      setPending(false);
    }
  }

  async function handleGoogleLogin() {
    setError("");
    setPending(true);
    try {
      await signInGoogle();
      router.replace("/admin");
    } catch (err) {
      setError(authErrorMessage(err));
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="admin-login-card">
      <div className="admin-login-brand">
        <img
          src="/assets/img/vikasa/vikasa_logo.png"
          alt="VIKASA"
          width={108}
          height={40}
        />
        <h1 className="heading text-36">Admin</h1>
        <p className="text text-16">Sign in to edit site content</p>
      </div>

      <form className="admin-login-form" onSubmit={handleEmailLogin}>
        <label className="admin-field">
          <span>Email</span>
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={pending}
          />
        </label>
        <label className="admin-field">
          <span>Password</span>
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={pending}
          />
        </label>

        {error ? <p className="admin-login-error">{error}</p> : null}

        <button
          type="submit"
          className="button button--primary"
          disabled={pending}
        >
          {pending ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <div className="admin-login-divider">
        <span>or</span>
      </div>

      <button
        type="button"
        className="button button--secondary admin-google-btn"
        onClick={handleGoogleLogin}
        disabled={pending}
      >
        Continue with Google
      </button>
    </div>
  );
}
