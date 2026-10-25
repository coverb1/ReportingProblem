
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ChevronDown,
  UserRound,
  LogIn,
  UserPlus,
  MapPin,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import { usePathname } from "next/navigation";
import axios from "axios";

type CurrentUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

const LINKS = [
  { label: "Home", href: "/" },
  { label: "My Reports", href: "/MyReport" },
  { label: "Public Map", href: "/locationmap" },
];

export default function Navbar() {
  const pathname = usePathname();

  const [user, setUser] = useState<CurrentUser | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      return;
    }

    axios
      .get("http://localhost:3000/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Failed to get logged-in user:", error);

        if (
          error.response?.status === 401 ||
          error.response?.status === 403
        ) {
          localStorage.removeItem("token");
          setUser(null);
        }
      });
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
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

  useEffect(() => {
    setProfileOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setProfileOpen(false);
    window.location.href = "/";
  };

  const getInitials = (name: string) =>
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "U";

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
        background: "var(--background)",
        borderBottom: "1px solid var(--border)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <nav style={{ minHeight: 72, display: "flex", alignItems: "center" }}>
        <div
          className="container"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          {/* Brand and navigation */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 32,
              minWidth: 0,
            }}
          >
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

              <div style={{ marginLeft: 10, lineHeight: 1 }}>
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

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
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
                    className={`nav-link${isActive ? " active" : ""}`}
                    style={{
                      height: 38,
                      padding: "0 14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "var(--radius-sm)",
                      background: isActive
                        ? "var(--primary-light)"
                        : "transparent",
                      fontSize: 14,
                      fontWeight: isActive ? 600 : 500,
                      lineHeight: 1,
                      whiteSpace: "nowrap",
                      textDecoration: "none",
                      color: isActive
                        ? "var(--primary)"
                        : "var(--text-secondary)",
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Report and account */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexShrink: 0,
            }}
          >
            <Link
              href="/reports/new"
              className="btn-primary"
              style={{
                padding: "10px 16px",
                fontSize: 13,
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              + Report
            </Link>

            <div ref={profileRef} style={{ position: "relative" }}>
              {user ? (
                <button
                  type="button"
                  onClick={() => setProfileOpen((value) => !value)}
                  aria-label="Open account menu"
                  aria-haspopup="menu"
                  aria-expanded={profileOpen}
                  style={{
                    height: 42,
                    padding: "0 10px",
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border)",
                    background: "var(--card)",
                    color: "var(--text-primary)",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "var(--primary-light)",
                      color: "var(--primary)",
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {getInitials(user.name)}
                  </div>

                  <span
                    style={{
                      maxWidth: 130,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    {user.name}
                  </span>

                  <ChevronDown
                    size={15}
                    style={{
                      transform: profileOpen
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.15s",
                    }}
                  />
                </button>
              ) : (
                <button
                  type="button"
                  aria-label="Account menu"
                  aria-haspopup="menu"
                  aria-expanded={profileOpen}
                  onClick={() => setProfileOpen((value) => !value)}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--primary-light)",
                    border: "1px solid var(--border)",
                    color: "var(--primary)",
                    cursor: "pointer",
                  }}
                >
                  <UserRound size={17} strokeWidth={2} />
                </button>
              )}

              {profileOpen && (
                <div
                  role="menu"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: 0,
                    width: 280,
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-lg)",
                    padding: 8,
                    boxShadow: "var(--shadow-lg)",
                    zIndex: 100,
                  }}
                >
                  {user ? (
                    <>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          padding: "12px 10px",
                        }}
                      >
                        <div
                          style={{
                            width: 42,
                            height: 42,
                            flexShrink: 0,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "var(--primary-light)",
                            color: "var(--primary)",
                            fontWeight: 700,
                          }}
                        >
                          {getInitials(user.name)}
                        </div>

                        <div style={{ minWidth: 0 }}>
                          <div
                            style={{
                              fontSize: 14,
                              fontWeight: 600,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              color: "var(--text-primary)",
                            }}
                          >
                            {user.name}
                          </div>

                          <div
                            style={{
                              marginTop: 3,
                              fontSize: 12,
                              color: "var(--text-muted)",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {user.email}
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          height: 1,
                          background: "var(--border)",
                          margin: "4px 8px",
                        }}
                      />

                      <Link
                        href="/profile"
                        role="menuitem"
                        onClick={() => setProfileOpen(false)}
                        style={{
                          width: "100%",
                          minHeight: 46,
                          padding: "0 12px",
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          borderRadius: "var(--radius-md)",
                          color: "var(--text-primary)",
                          fontSize: 14,
                          fontWeight: 500,
                          textDecoration: "none",
                        }}
                      >
                        <UserRound size={18} />
                        <span>My Profile</span>
                      </Link>

                      <Link
                        href="/profile/location"
                        role="menuitem"
                        onClick={() => setProfileOpen(false)}
                        style={{
                          width: "100%",
                          minHeight: 46,
                          padding: "0 12px",
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          borderRadius: "var(--radius-md)",
                          color: "var(--text-primary)",
                          fontSize: 14,
                          fontWeight: 500,
                          textDecoration: "none",
                        }}
                      >
                        <MapPin size={18} />
                        <span>My Location</span>
                      </Link>

                      <Link
                        href="/profile/security"
                        role="menuitem"
                        onClick={() => setProfileOpen(false)}
                        style={{
                          width: "100%",
                          minHeight: 46,
                          padding: "0 12px",
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          borderRadius: "var(--radius-md)",
                          color: "var(--text-primary)",
                          fontSize: 14,
                          fontWeight: 500,
                          textDecoration: "none",
                        }}
                      >
                        <ShieldCheck size={18} />
                        <span>Security</span>
                      </Link>

                      <div
                        style={{
                          height: 1,
                          background: "var(--border)",
                          margin: "4px 8px",
                        }}
                      />

                      <button
                        type="button"
                        role="menuitem"
                        onClick={handleLogout}
                        style={{
                          width: "100%",
                          minHeight: 46,
                          padding: "0 12px",
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          borderRadius: "var(--radius-md)",
                          border: "none",
                          background: "transparent",
                          color: "var(--danger)",
                          fontSize: 14,
                          fontWeight: 500,
                          textAlign: "left",
                          cursor: "pointer",
                        }}
                      >
                        <LogOut size={18} />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/auth/login"
                        role="menuitem"
                        onClick={() => setProfileOpen(false)}
                        style={{
                          width: "100%",
                          minHeight: 46,
                          padding: "0 12px",
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          borderRadius: "var(--radius-md)",
                          color: "var(--text-primary)",
                          fontSize: 14,
                          fontWeight: 500,
                          textDecoration: "none",
                        }}
                      >
                        <LogIn size={19} />
                        <span>Sign In</span>
                      </Link>

                      <div
                        style={{
                          height: 1,
                          background: "var(--border)",
                          margin: "4px 8px",
                        }}
                      />

                      <Link
                        href="/auth/register"
                        role="menuitem"
                        onClick={() => setProfileOpen(false)}
                        style={{
                          width: "100%",
                          minHeight: 46,
                          padding: "0 12px",
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          borderRadius: "var(--radius-md)",
                          color: "var(--text-primary)",
                          fontSize: 14,
                          fontWeight: 500,
                          textDecoration: "none",
                        }}
                      >
                        <UserPlus size={19} />
                        <span>Sign Up</span>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
