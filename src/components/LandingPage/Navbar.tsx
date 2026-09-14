"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ChevronDown,
  UserRound,
  Check,
  LogIn,
  UserPlus,
} from "lucide-react";
import { usePathname } from "next/navigation";

type NavLink = {
  label: string;
  href: string;
};

const LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "My Reports", href: "/myReport" },
  { label: "Public Map", href: "/locationmap" },
];

const ROLE_OPTIONS = ["Citizen", "Organisation", "Staff", "Admin"];

export default function Navbar() {
  const pathname = usePathname();

  const [role, setRole] = useState("Citizen");
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(target)
      ) {
        setProfileOpen(false);
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        inset: "0 0 auto 0",
        zIndex: 50,
      }}
    >
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
          {/* ================= LEFT ================= */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* ================= LOGO ================= */}
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
                textDecoration: "none",
              }}
            >
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

              <div
                style={{
                  marginLeft: 10,
                  lineHeight: 1,
                }}
              >
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    letterSpacing: "-0.2px",
                    color: "var(--text-primary)",
                  }}
                >
                  RCPMS
                </div>

                <div
                  style={{
                    marginTop: 3,
                    fontSize: 10,
                    fontWeight: 500,
                    color: "var(--text-muted)",
                  }}
                >
                  Rwanda Community Problem Management System
                </div>
              </div>
            </Link>

            {/* ================= NAV LINKS ================= */}
            <div
              style={{
                marginLeft: 40,
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontWeight: 700,
              }}
            >
              {LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname === link.href ||
                      pathname.startsWith(link.href + "/");

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`nav-link${
                      isActive ? " active" : ""
                    }`}
                    style={{
                      height: 38,
                      padding: "0 14px",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "var(--radius-sm)",
                      background: isActive
                        ? "var(--primary-light)"
                        : "transparent",
                      fontSize: 14,
                      lineHeight: 1,
                      whiteSpace: "nowrap",
                      transition:
                        "background-color 0.15s, color 0.15s",
                      textDecoration: "none",
                      color: "var(--text-primary)",
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            {/* ================= ROLE DROPDOWN ================= */}
            <div
              ref={dropdownRef}
              style={{
                position: "relative",
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setOpen((v) => !v);
                  setProfileOpen(false);
                }}
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
                  border: open
                    ? "1px solid var(--primary)"
                    : "1px solid var(--border)",
                  background: "var(--card)",
                  color: "var(--text-primary)",
                  fontSize: 13,
                  fontWeight: 600,
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  transition:
                    "background-color 0.15s, border-color 0.15s",
                }}
              >
                <UserRound
                  size={14}
                  strokeWidth={1.8}
                  color="var(--text-muted)"
                />

                <span>{role}</span>

                <ChevronDown
                  size={11}
                  strokeWidth={2}
                  color="var(--text-muted)"
                  style={{
                    transform: open
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.15s",
                  }}
                />
              </button>

              {/* ROLE MENU */}
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
                      <li
                        key={option}
                        role="option"
                        aria-selected={active}
                      >
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
                            borderRadius:
                              "var(--radius-sm)",
                            border: "none",
                            background: active
                              ? "var(--primary-light)"
                              : "transparent",
                            color: active
                              ? "var(--primary)"
                              : "var(--text-secondary)",
                            fontSize: 13,
                            fontWeight: active ? 600 : 500,
                            lineHeight: 1,
                            cursor: "pointer",
                            textAlign: "left",
                          }}
                          onMouseEnter={(e) => {
                            if (!active) {
                              e.currentTarget.style.background =
                                "var(--background-secondary)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!active) {
                              e.currentTarget.style.background =
                                "transparent";
                            }
                          }}
                        >
                          <span>{option}</span>

                          {active && (
                            <Check
                              size={13}
                              strokeWidth={2.5}
                              color="var(--primary)"
                            />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* ================= REPORT BUTTON ================= */}
            <Link
              href="/reports/new"
              className="btn-primary"
              style={{
                width: 100,
                fontSize: 13,
                textDecoration: "none",
              }}
            >
              + Report
            </Link>

            {/* ================================================= */}
            {/*                  ACCOUNT DROPDOWN                  */}
            {/* ================================================= */}
            <div
              ref={profileRef}
              style={{
                position: "relative",
              }}
              onMouseEnter={() => setProfileOpen(true)}
              onMouseLeave={() => setProfileOpen(false)}
            >
              {/* ================= USER ICON ================= */}
              <button
                type="button"
                aria-label="Account menu"
                aria-haspopup="menu"
                aria-expanded={profileOpen}
                onClick={() => {
                  setProfileOpen((v) => !v);
                  setOpen(false);
                }}
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
                  transition:
                    "background-color 0.15s, border-color 0.15s",
                }}
              >
                <UserRound
                  size={17}
                  strokeWidth={2}
                />
              </button>

              {/* ================= AUTH DROPDOWN ================= */}
              {profileOpen && (
                <div
                  role="menu"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: 0,
                    width: 300,
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 18,
                    padding: 8,
                    boxShadow:
                      "0 18px 45px rgba(0, 0, 0, 0.12)",
                    zIndex: 100,
                  }}
                >
                  {/* ================= SIGN IN ================= */}
                  <Link
                    href="/signin"
                    role="menuitem"
                    onClick={() => setProfileOpen(false)}
                    style={{
                      width: "100%",
                      height: 52,
                      padding: "0 14px",
                      display: "flex",
                      alignItems: "center",
                      gap: 13,
                      borderRadius: 12,
                      color: "var(--text-primary)",
                      fontSize: 14,
                      fontWeight: 500,
                      textDecoration: "none",
                      transition:
                        "background-color 0.15s, color 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "var(--primary-light)";

                      e.currentTarget.style.color =
                        "var(--primary)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "transparent";

                      e.currentTarget.style.color =
                        "var(--text-primary)";
                    }}
                  >
                    <LogIn
                      size={19}
                      strokeWidth={1.8}
                      color="var(--text-muted)"
                    />

                    <span>Sign In</span>
                  </Link>

                  {/* ================= DIVIDER ================= */}
                  <div
                    style={{
                      height: 1,
                      background: "var(--border)",
                      margin: "4px 8px",
                    }}
                  />

                  {/* ================= SIGN UP ================= */}
                  <Link
                    href="/signup"
                    role="menuitem"
                    onClick={() => setProfileOpen(false)}
                    style={{
                      width: "100%",
                      height: 52,
                      padding: "0 14px",
                      display: "flex",
                      alignItems: "center",
                      gap: 13,
                      borderRadius: 12,
                      color: "var(--text-primary)",
                      fontSize: 14,
                      fontWeight: 500,
                      textDecoration: "none",
                      transition:
                        "background-color 0.15s, color 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "var(--primary-light)";

                      e.currentTarget.style.color =
                        "var(--primary)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "transparent";

                      e.currentTarget.style.color =
                        "var(--text-primary)";
                    }}
                  >
                    <UserPlus
                      size={19}
                      strokeWidth={1.8}
                      color="var(--text-muted)"
                    />

                    <span>Sign Up</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}