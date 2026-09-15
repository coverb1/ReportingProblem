"use client";

import { useState } from "react";
import Link from "next/link";
import {UserRound,Mail,Lock,Eye,EyeOff,MapPin,ChevronDown,ArrowRight,} from "lucide-react";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    district: "",
    sector: "",
    cell: "",
    village: "",
  });

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    console.log("Registration data:", formData);

    // Connect your backend registration API here.
  };

  return (
    <main className="signup-page">
      <div className="signup-container">
       
        {/* Card */}
        <div className="signup-card">
          {/* Header */}
          <div className="signup-header">
            <div className="signup-icon">
              <UserRound size={25} strokeWidth={1.8} />
            </div>

            <h1>Create your account</h1>

            <p>
              Join RCPMS and help make your community better.
            </p>
          </div>

          {error && <div className="signup-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="signup-columns">
              {/* LEFT COLUMN */}
              <div className="signup-column">
                <h2 className="column-title">Personal Information</h2>

                {/* Full Name */}
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>

                  <div className="input-wrapper">
                    <UserRound size={18} />

                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="form-group">
                  <label htmlFor="email">Email</label>

                  <div className="input-wrapper">
                    <Mail size={18} />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="form-group">
                  <label htmlFor="password">Password</label>

                  <div className="input-wrapper">
                    <Lock size={18} />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />

                    <button
                      type="button"
                      className="eye-button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
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
                    <Lock size={18} />

                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={
                        showConfirmPassword ? "text" : "password"
                      }
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />

                    <button
                      type="button"
                      className="eye-button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
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
              </div>

              {/* RIGHT COLUMN */}
              <div className="signup-column">
                <h2 className="column-title">
                  Location Information
                </h2>

                {/* District */}
                <div className="form-group">
                  <label htmlFor="district">District</label>

                  <div className="select-wrapper">
                    <MapPin size={18} className="select-icon" />

                    <select
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select District</option>
                      <option value="Gasabo">Gasabo</option>
                      <option value="Kicukiro">Kicukiro</option>
                      <option value="Nyarugenge">
                        Nyarugenge
                      </option>
                    </select>

                    <span className="select-arrow">
                      <ChevronDown
                        size={17}
                        strokeWidth={1.8}
                      />
                    </span>
                  </div>
                </div>

                {/* Sector */}
                <div className="form-group">
                  <label htmlFor="sector">Sector</label>

                  <div className="select-wrapper">
                    <MapPin size={18} className="select-icon" />

                    <select
                      id="sector"
                      name="sector"
                      value={formData.sector}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Sector</option>
                      <option value="Remera">Remera</option>
                      <option value="Kimironko">
                        Kimironko
                      </option>
                      <option value="Kacyiru">Kacyiru</option>
                      <option value="Gisozi">Gisozi</option>
                    </select>

                    <span className="select-arrow">
                      <ChevronDown
                        size={17}
                        strokeWidth={1.8}
                      />
                    </span>
                  </div>
                </div>

                {/* Cell */}
                <div className="form-group">
                  <label htmlFor="cell">Cell</label>

                  <div className="select-wrapper">
                    <MapPin size={18} className="select-icon" />

                    <select
                      id="cell"
                      name="cell"
                      value={formData.cell}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Cell</option>
                      <option value="Rukiri">Rukiri</option>
                      <option value="Nyabisindu">
                        Nyabisindu
                      </option>
                      <option value="Kibagabaga">
                        Kibagabaga
                      </option>
                    </select>

                    <span className="select-arrow">
                      <ChevronDown
                        size={17}
                        strokeWidth={1.8}
                      />
                    </span>
                  </div>
                </div>

                {/* Village */}
                <div className="form-group">
                  <label htmlFor="village">Village</label>

                  <div className="select-wrapper">
                    <MapPin size={18} className="select-icon" />

                    <select
                      id="village"
                      name="village"
                      value={formData.village}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Village</option>
                      <option value="Amahoro">Amahoro</option>
                      <option value="Umucyo">Umucyo</option>
                      <option value="Isano">Isano</option>
                    </select>

                    <span className="select-arrow">
                      <ChevronDown
                        size={17}
                        strokeWidth={1.8}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="create-account-button"
            >
              Create Account
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Sign In */}
          <p className="signin-text">
            Already have an account?{" "}
            <Link href="/signin">Sign in</Link>
          </p>
        </div>
      </div>
    </main>
  );
}