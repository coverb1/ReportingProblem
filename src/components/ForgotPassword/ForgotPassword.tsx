
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, LoaderCircle } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmitPassword = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      await axios.post(
        "http://localhost:3000/auth/ForgotPassword",
        { email }
      );

      toast.success("Password reset link sent successfully!");
      setEmail("");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message;

        if (
          status === 404 ||
          (typeof message === "string" &&
            message.toLowerCase().includes("user does not exist"))
        ) {
          toast.error("User does not exist!");
        } else {
          toast.error(
            typeof message === "string"
              ? message
              : "Failed to send reset link. Please try again."
          );
        }
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="signup-page">
      <div className="signup-container">
        <Link href="/" className="signup-logo">
          RCPMS
        </Link>

        <div className="signup-card">
          <div className="signup-header">
            <h1>Forgot Password?</h1>

            <p>
              Enter your email address and we will send you
              a secure link to reset your password.
            </p>
          </div>

          {/*
            Keep your existing design.
            Toastify handles success and error messages.
          */}

          <form onSubmit={handleSubmitPassword}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>

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
                  disabled={loading}
                />
              </div>
            </div>


            <button
              type="submit"
              className="btn-primary forgot-password-submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <LoaderCircle
                    size={18}
                    className="forgot-password-spinner"
                  />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send Reset Link</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>

          </form>

          <p className="signin-text">
            Remember your password?{" "}
            <Link href="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
