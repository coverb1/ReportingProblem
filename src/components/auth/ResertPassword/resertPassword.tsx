"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lock, Eye, EyeOff, ArrowRight, ShieldCheck, } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";


export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setnewPassword] = useState("")

  const [confirmPassword, setConfirmPassword] = useState("")
  const searchParamas = useSearchParams()
  const token = searchParamas.get("token")

  const handleResertPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("resert Button clicked")

    console.log("token from url", token)
    console.log("New password", newPassword)

    if (newPassword !== confirmPassword) {
      console.log("does not match")
      return
    }

    try {

      const response = await axios.post(`http://localhost:3000/auth/reset-password`, {
        newPassword,
        token
      })
setnewPassword("")
setnewPassword("")
window.location.href="/auth/login"
      console.log(response.data, "password Resert Successfu")
    } catch (error) {
      console.log(error)
    }
  }

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
            {/* <div className="signup-icon">
              <ShieldCheck size={24} />
            </div> */}

            <h1>Reset Password</h1>

            <p>
              Create a new password for your account.
              Make sure your password is secure.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleResertPassword}>

            {/* New Password */}
            <div className="form-group">
              <label htmlFor="password">
                New Password
              </label>

              <div className="input-wrapper">
                <Lock />

                <input
                  id="password"
                  value={newPassword}
                  onChange={(e) => setnewPassword(e.target.value)}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                />

                <button
                  type="button"
                  className="eye-button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="confirmPassword">
                Confirm Password
              </label>

              <div className="input-wrapper">
                <Lock />

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your new password"
                />

                <button
                  type="button"
                  className="eye-button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>
            {/* Reset Button */}
            <button
              type='submit'
              onClick={() => console.log("button clicked")}
              className="create-account-button"
            >
              Reset Password
              <ArrowRight size={16} />
            </button>

          </form>

          {/* Login */}
          <p className="signin-text">
            Remember your password?{" "}
            <Link href="/auth/login">
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </main>
  );
}