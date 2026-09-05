"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, UserRound, Check } from "lucide-react";
import { usePathname } from "next/navigation";

type NavLink = {
  label: string;
  href: string;
};

const LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "My Reports", href: "/myReport" },
  { label: "Public Map", href: "/map" },
];

const ROLE_OPTIONS = ["Citizen", "Organisation", "Staff", "Admin"];

export default function Navbar() {
  const pathname = usePathname();
  const [role, setRole] = useState("Citizen");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
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
      <nav
        style={{
          height: 72,
          background: "var(--background)",
          borderBottom: "1px solid var(--border)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div
          className="container"
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* LEFT */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* LOGO */}
            <Link href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "var(--radius-sm)",
                  background: "var(--primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontSize: 15,
                  fontWeight: 700,
                }}
              >
                R
              </div>

              <div style={{ marginLeft: 10, lineHeight: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.2px", color: "var(--text-primary)" }}>
                  RCPMS
                </div>
                <div style={{ marginTop: 3, fontSize: 10, fontWeight: 500, color: "var(--text-muted)" }}>
                  Rwanda Community Problem Management System
                </div>
              </div>
            </Link>

            {/* NAV LINKS */}

            <div style={{ marginLeft: 40, display: "flex", alignItems: "center", gap: 4, fontWeight:700}}>
              {LINKS.map((link) => {
                // "/" only matches the exact homepage.
                // Other links also match their own sub-routes (e.g. /myreport/123).
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname === link.href || pathname.startsWith(link.href + "/");

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`nav-link${isActive ? " active" : ""}`}
                    style={{
                      height: 38,
                      padding: "0 14px",
                      fontWeight:700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "var(--radius-sm)",
                      background: isActive ? "var(--primary-light)" : "transparent",
                      fontSize: 14,
                      lineHeight: 1,
                      whiteSpace: "nowrap",
                      transition: "background-color 0.15s, color 0.15s",
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>


          </div>

          {/* RIGHT */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* ROLE DROPDOWN */}
            <div ref={dropdownRef} style={{ position: "relative" }}>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={open}
                style={{
                  height: 38,
                  minWidth: 112,
                  padding: "0 13px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  borderRadius: "var(--radius-sm)",
                  border: open ? "1px solid var(--primary)" : "1px solid var(--border)",
                  background: "var(--card)",
                  color: "var(--text-primary)",
                  fontSize: 13,
                  fontWeight: 600,
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  transition: "background-color 0.15s, border-color 0.15s",
                }}
              >
                <UserRound size={14} strokeWidth={1.8} color="var(--text-muted)" />
                <span>{role}</span>
                <ChevronDown
                  size={11}
                  strokeWidth={2}
                  color="var(--text-muted)"
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
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-md)",
                    padding: 6,
                    margin: 0,
                    listStyle: "none",
                    boxShadow: "var(--shadow-lg)",
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
                            borderRadius: "var(--radius-sm)",
                            border: "none",
                            background: active ? "var(--primary-light)" : "transparent",
                            color: active ? "var(--primary)" : "var(--text-secondary)",
                            fontSize: 13,
                            fontWeight: active ? 600 : 500,
                            lineHeight: 1,
                            cursor: "pointer",
                            textAlign: "left",
                          }}
                          onMouseEnter={(e) => {
                            if (!active) e.currentTarget.style.background = "var(--background-secondary)";
                          }}
                          onMouseLeave={(e) => {
                            if (!active) e.currentTarget.style.background = "transparent";
                          }}
                        >
                          <span>{option}</span>
                          {active && <Check size={13} strokeWidth={2.5} color="var(--primary)" />}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* REPORT */}
            <Link href="/reports/new" className="btn-primary" style={{ width: 100, fontSize: 13 }}>
              + Report
            </Link>

            {/* AVATAR */}
            <button
              type="button"
              aria-label="User profile"
              style={{
                width: 38,
                height: 38,
                flexShrink: 0,
                borderRadius: "9999px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--primary-light)",
                border: "1px solid var(--border)",
                color: "var(--primary)",
                cursor: "pointer",
                transition: "background-color 0.15s",
              }}
            >
              <UserRound size={16} strokeWidth={2} />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}