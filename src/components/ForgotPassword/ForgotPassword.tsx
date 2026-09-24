"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, ShieldCheck } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmitPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
     const response= await axios.post(
        `http://localhost:3000/auth/ForgotPassword`, {email, }
      );
if (response) {
  toast.success("Email sent well")
  // window.location.href="/auth/login"
}
setEmail("")
    } catch (error: any) {
 toast.error(error)
    } finally {
      
    }
  };
  return (
    <main className="signup-page">
      <div className="signup-container">

        {/* Logo */}
        <Link href="/" className="signup-logo">
          RCPMS
        </Link>

        {/* Card */}
        <div className="signup-card">
          {/* Header */}
          <div className="signup-header">
            <h1>Forgot Password?</h1>

            <p>
              Enter your email address and we will send you
              a secure link to reset your password.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="signup-error">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmitPassword} >

            <div className="form-group">
              <label htmlFor="email">
                Email Address
              </label>

              <div className="input-wrapper">
                <Mail />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
                 <button type="submit">
                  Send Reset Link
                  <ArrowRight size={16} />
                </button>   
    
          </form>

          {/* Login */}
          <p className="signin-text">
            Remember your password?{" "}
            <Link href="/login">
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </main>
  );
}