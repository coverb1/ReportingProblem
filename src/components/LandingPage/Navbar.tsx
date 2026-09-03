"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, UserRound, Check } from "lucide-react";

const ROLE_OPTIONS = ["Citizen", "Organisation", "Staff", "Admin"];

export default function Navbar() {
  const [role, setRole] = useState("Citizen");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e:any) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function handleEscape(e:any) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header style={{ position: "fixed", inset: "0 0 auto 0", zIndex: 50 }}>

      {/* TOP BORDER */}
      <div style={{ height: 4, background: "#1d242c" }} />

      <nav
        style={{
          height: 64,
          background: "#060d16",
          borderBottom: "1px solid #162638",
        }}
      >
        <div
          style={{
            height: "100%",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* LEFT */}
          <div style={{ display: "flex", alignItems: "center" }}>

            {/* LOGO */}
            <Link
              href="/"
              style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                <span style={{ width: 10, height: 28, borderRadius: 3, background: "#16a05d" }} />
                <span style={{ width: 10, height: 28, borderRadius: 3, background: "#ffcf00" }} />
                <span style={{ width: 10, height: 28, borderRadius: 3, background: "#08aeea" }} />
              </div>

              <div style={{ marginLeft: 10, lineHeight: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.2px", color: "#f5f7fa" }}>
                  RCMS
                </div>
                <div style={{ marginTop: 3, fontSize: 8, fontWeight: 500, letterSpacing: "1.4px", color: "#55708e" }}>
                  COMMUNITY PLATFORM
                </div>
              </div>
            </Link>

            {/* NAV LINKS */}
            <div style={{ marginLeft: 31, display: "flex", alignItems: "center", gap: 2 }}>

              {/* HOME */}
              <Link
                href="/"
                style={{
                  height: 38,
                  padding: "0 14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 8,
                  border: "1px solid #087aa5",
                  background: "#0b2232",
                  color: "#08aeea",
                  fontSize: 13,
                  fontWeight: 500,
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                  transition: "background-color 0.15s",
                }}
              >
                Home
              </Link>

              {/* MY REPORTS */}
              <Link
                href="/myReport"
                style={{
                  height: 38,
                  padding: "0 14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 8,
                  color: "#7890aa",
                  fontSize: 13,
                  fontWeight: 500,
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                  transition: "color 0.15s",
                }}
              >
                My Reports
              </Link>

              {/* PUBLIC MAP */}
              <Link
                href="/map"
                style={{
                  height: 38,
                  padding: "0 14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 8,
                  color: "#7890aa",
                  fontSize: 13,
                  fontWeight: 500,
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                  transition: "color 0.15s",
                }}
              >
                Public Map
              </Link>

            </div>
          </div>

          {/* RIGHT */}
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>

            {/* ROLE DROPDOWN */}
            <div ref={dropdownRef} style={{ position: "relative" }}>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={open}
                style={{
                  height: 38,
                  minWidth: 110,
                  padding: "0 13px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  borderRadius: 8,
                  border: open ? "1px solid #08aeea" : "1px solid #173b54",
                  background: "#091725",
                  color: "#dce5ed",
                  fontSize: 13,
                  fontWeight: 600,
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  transition: "background-color 0.15s, border-color 0.15s",
                }}
              >
                <UserRound size={14} strokeWidth={1.8} color="#9ba8b5" />
                <span>{role}</span>
                <ChevronDown
                  size={11}
                  strokeWidth={2}
                  color="#55708e"
                  style={{
                    transform: open ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.15s",
                  }}
                />
              </button>

              {open && (
                <ul
                  role="listbox"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 6px)",
                    right: 0,
                    minWidth: 160,
                    background: "#0b1622",
                    border: "1px solid #173b54",
                    borderRadius: 10,
                    padding: 6,
                    margin: 0,
                    listStyle: "none",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                    zIndex: 60,
                  }}
                >
                  {ROLE_OPTIONS.map((option) => {
                    const active = option === role;
                    return (
                      <li key={option} role="option" aria-selected={active}>
                        <button
                          type="button"
                          onClick={() => {
                            setRole(option);
                            setOpen(false);
                          }}
                          style={{
                            width: "100%",
                            height: 36,
                            padding: "0 10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 8,
                            borderRadius: 6,
                            border: "none",
                            background: active ? "#0d2436" : "transparent",
                            color: active ? "#08aeea" : "#c3ceda",
                            fontSize: 13,
                            fontWeight: active ? 600 : 500,
                            lineHeight: 1,
                            cursor: "pointer",
                            textAlign: "left",
                          }}
                          onMouseEnter={(e) => {
                            if (!active) e.currentTarget.style.background = "#101f30";
                          }}
                          onMouseLeave={(e) => {
                            if (!active) e.currentTarget.style.background = "transparent";
                          }}
                        >
                          <span>{option}</span>
                          {active && <Check size={13} strokeWidth={2.5} color="#08aeea" />}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* REPORT */}
            <Link
              href="/reports/new"
              style={{
                height: 38,
                width: 94,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                background: "#08aeea",
                color: "#ffffff",
                fontSize: 13,
                fontWeight: 700,
                lineHeight: 1,
                whiteSpace: "nowrap",
                transition: "background-color 0.15s",
              }}
            >
              + Report
            </Link>

            {/* AVATAR */}
            <button
              type="button"
              aria-label="User profile"
              style={{
                width: 34,
                height: 34,
                flexShrink: 0,
                borderRadius: "9999px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#102235",
                border: "1px solid #14547a",
                color: "#08aeea",
                fontSize: 11,
                fontWeight: 700,
                lineHeight: 1,
                cursor: "pointer",
                transition: "background-color 0.15s",
              }}
            >
              <UserRound size={16} strokeWidth={2}/>
            </button>

          </div>
        </div>
      </nav>

      {/* BOTTOM ACCENT */}
      <div style={{ height: 4, width: "100%", display: "flex" }}>
        <div style={{ width: "25%", background: "#16a05d" }} />
        <div style={{ width: "25%", background: "#ffcf00" }} />
        <div style={{ width: "50%", background: "#08aeea" }} />
      </div>

    </header>
  );
}