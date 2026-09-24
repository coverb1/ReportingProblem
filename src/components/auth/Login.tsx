"use client";

import React, { useState } from "react";
import Link from "next/link";
import {Lock,Mail,Eye,EyeOff,ArrowRight,} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

const handleLogin=async(e:React.FormEvent<HTMLElement>)=>{
  e.preventDefault()
  try {
    const response=await axios.post(`http://localhost:3000/auth/login`,{
      email,password
    })
    setEmail(""),
    setPassword("")
    toast.success("Login successful successful!");
    console.log(response)
    window.location.href="http://http://localhost:3001/"
  } catch (error) {
    console.log(error)
    toast.error("login failed");
  }
}

  return (
    <main className="!min-h-screen !bg-[var(--background-secondary)] !px-4 !py-8 sm:!px-6 sm:!py-12">
      <div className="!mx-auto !w-full !max-w-[560px]">

        {/* Card */}
        <div className="!w-full !overflow-hidden !rounded-[var(--radius-lg)] !border !border-[var(--border-light)] !bg-[var(--background)] !shadow-sm">

          {/* Card Content */}
          <div className="!p-6 sm:!p-10">

            {/* Header */}
            <div className="!mb-8">

              {/* Lock Icon */}
              <div className="!mb-5 !flex !h-14 !w-14 !items-center !text-[var(--primary)]">
                <Lock
                  size={25}
                  strokeWidth={1.8}
                />
              </div>

              <h1 className="!m-0 !text-3xl !font-bold !leading-tight !text-[var(--text-primary)] sm:!text-[36px]">
                Welcome back
              </h1>

              <p className="!m-0 !mt-2 !max-w-[460px] !text-sm !font-normal !leading-6 !text-[var(--text-secondary)] sm:!text-[15px]">
                Sign in to your account to continue reporting
                and tracking community problems.
              </p>

            </div>
{/* /////////////////// */}
            {/* Form UI */}
            <form onSubmit={handleLogin} className="!m-0">

              {/* Email */}
              <div className="!mb-5">

                <label
                  htmlFor="email"
                  className="!mb-1.5 !block !text-sm !font-medium !text-[var(--text-primary)]"
                >
                  Email
                </label>

                <div className="!relative">

                  <Mail
                    size={19}
                    strokeWidth={1.8}
                    className="pointer-events-none !absolute !left-3.5 !top-1/2 !z-10 !-translate-y-1/2 !text-[var(--text-muted)]"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder="Enter your email"
                    autoComplete="email"
                    className="!m-0 !block !h-12 !w-full !rounded-[var(--radius-md)] !border !border-[var(--border)] !bg-[var(--background)] !px-4 !py-3 !pl-11 !text-sm !font-normal !text-[var(--text-primary)] !outline-none !transition-all !placeholder:text-[var(--text-muted)] focus:!border-[var(--primary)] focus:!ring-2 focus:!ring-[var(--primary-light)]"
                  />

                </div>

              </div>

              {/* Password */}
              <div className="!mb-6">

                <div className="!mb-1.5 !flex !items-center !justify-between !gap-4">

                  <label
                    htmlFor="password"
                    className="!m-0 !block !text-sm !font-medium !text-[var(--text-primary)]"
                  >
                    Password
                  </label>

                  <Link
                    href="/auth/ForgetPassword"
                    className="!m-0 !text-sm !font-semibold !text-[var(--primary)] !no-underline hover:!text-[var(--primary-dark)]"
                  >
                    Forgot password?
                  </Link>

                </div>

                <div className="!relative">

                  <Lock
                    size={19}
                    strokeWidth={1.8}
                    className="pointer-events-none !absolute !left-3.5 !top-1/2 !z-10 !-translate-y-1/2 !text-[var(--text-muted)]"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="!m-0 !block !h-12 !w-full !rounded-[var(--radius-md)] !border !border-[var(--border)] !bg-[var(--background)] !px-4 !py-3 !pl-11 !pr-12 !text-sm !font-normal !text-[var(--text-primary)] !outline-none !transition-all !placeholder:text-[var(--text-muted)] focus:!border-[var(--primary)] focus:!ring-2 focus:!ring-[var(--primary-light)]"
                  />

                  {/* Show / Hide Password */}
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="!absolute !right-0 !top-0 !m-0 !flex !h-12 !w-12 !items-center !justify-center !border-0 !bg-transparent !p-0 !text-[var(--text-muted)] !shadow-none hover:!text-[var(--text-primary)]"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>

              </div>

              {/* Sign In Button */}


     <button
                type="submit"
                className="!m-0 !flex !h-12 !w-full !items-center !justify-center !rounded-[var(--radius-md)] !border-0 !bg-[var(--primary)] !px-5 !py-3 !text-sm !font-semibold !text-white !shadow-none !transition-colors hover:!bg-[var(--primary-dark)] focus:!outline-none focus:!ring-2 focus:!ring-[var(--primary-light)] focus:!ring-offset-2"
              >
                Sign In

                <ArrowRight
                  size={19}
                  strokeWidth={2}
                  className="!ml-2"
                />
              </button>

            </form>
{/* /////////////////// */}
          </div>

          {/* Bottom */}
          <div className="!border-t !border-[var(--border-light)] !px-6 !py-5 sm:!px-10">

            <p className="!m-0 !text-center !text-sm !font-normal !text-[var(--text-secondary)]">
              Don't have an account?{" "}

              <Link
                href="/auth/register"
                className="!font-bold !text-[var(--primary)] !no-underline hover:!text-[var(--primary-dark)]"
              >
                Sign Up
              </Link>

            </p>

          </div>

        </div>

      </div>
    </main>
  );
}