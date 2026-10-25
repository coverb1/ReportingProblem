
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {ChevronDown,UserRound,LogIn,UserPlus,MapPin,ShieldCheck,LogOut,Settings,} from "lucide-react";
import { usePathname } from "next/navigation";
import axios from "axios";

type NavLink = {
  label: string;
  href: string;
};

type CurrentUser = {
  id?: string;
  name: string;
  email: string;
  role: string;
};

const LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "My Reports", href: "/MyReport" },
  { label: "Public Map", href: "/locationmap" },
];

export default function Navbar() {
  const pathname = usePathname();

  const [user, setUser] = useState<CurrentUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  const profileRef = useRef<HTMLDivElement>(null);

  // Get the saved authentication token.
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);
  }, []);

  // Get the authenticated user's information.
  useEffect(() => {
    let cancelled = false;

    const handleGetMe = async () => {
      if (!token) {
        setUser(null);
        setLoadingUser(false);
        return;
      }

      setLoadingUser(true);

      try {
        const response = await axios.get(
          "http://localhost:3000/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (cancelled) return;

        setUser({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          role: response.data.role,
        });
      } catch (error) {
        if (cancelled) return;

        console.error("GET ME ERROR:", error);

        // Clear the token only when the server rejects authentication.
        if (
          axios.isAxiosError(error) &&
          (error.response?.status === 401 ||
            error.response?.status === 403)
        ) {
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
        }
      } finally {
        if (!cancelled) {
          setLoadingUser(false);
        }
      }
    };

    void handleGetMe();

    return () => {
      cancelled = true;
    };
  }, [token]);

  // Close the menu when clicking outside or pressing Escape.
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

  // Close the dropdown when navigating to another page.
  useEffect(() => {
    setProfileOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setProfileOpen(false);
    window.location.href = "/";
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/).filter(Boolean);

    if (parts.length === 0) return "U";

    return parts
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
  };

  const getRoleName = (backendRole: string) => {
    const roleNames: Record<string, string> = {
      CITIZEN: "Citizen",
      VILLAGE_LEADER: "Village Leader",
      CELL_LEADER: "Cell Leader",
      SECTOR_LEADER: "Sector Leader",
      DISTRICT_ADMIN: "District Admin",
      SUPER_ADMIN: "Super Admin",
      RBC_ADMIN: "RBC Admin",
      DH_COUNSELOR: "DH Counselor",
      HC_USER: "Health Centre User",
      SCHOOL_COUNSELOR: "School Counselor",
    };

    return roleNames[backendRole] ?? backendRole;
  };

  const menuLinkStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 12,
    width: "100%",
    minHeight: 44,
    padding: "0 12px",
    borderRadius: "var(--radius-sm)",
    color: "var(--text-primary)",
    textDecoration: "none",
    fontSize: 13,
    fontWeight: 500,
    transition: "background-color 0.15s",
  };

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
            gap: 20,
          }}
        >
          {/* Logo and navigation */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
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
                    whiteSpace: "nowrap",
                  }}
                >
                  Rwanda Community Problem Management System
                </div>
              </div>
            </Link>

            <div
              className="rcpms-navbar-links"
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
                    className={`nav-link${isActive ? " active" : ""}`}
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

          {/* User actions */}
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
                minWidth: 100,
                fontSize: 13,
                textDecoration: "none",
              }}
            >
              + Report
            </Link>

            {/* Authenticated profile dropdown */}
            <div
              ref={profileRef}
              style={{
                position: "relative",
              }}
            >
              {user ? (
                <>
                  <button
                    type="button"
                    onClick={() => setProfileOpen((value) => !value)}
                    aria-label="Open profile menu"
                    aria-haspopup="menu"
                    aria-expanded={profileOpen}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      minWidth: 0,
                      maxWidth: 260,
                      padding: "5px 8px 5px 5px",
                      border: profileOpen
                        ? "1px solid var(--primary)"
                        : "1px solid transparent",
                      borderRadius: "var(--radius-md)",
                      background: profileOpen
                        ? "var(--primary-light)"
                        : "transparent",
                      color: "var(--text-primary)",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        flexShrink: 0,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "var(--primary-light)",
                        border: "1px solid var(--border)",
                        color: "var(--primary)",
                        fontSize: 13,
                        fontWeight: 700,
                      }}
                    >
                      {getInitials(user.name)}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                        minWidth: 0,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          lineHeight: 1.2,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {user.name}
                      </span>

                      <span
                        style={{
                          fontSize: 11,
                          color: "var(--text-muted)",
                          lineHeight: 1.2,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {user.email}
                      </span>
                    </div>

                    <ChevronDown
                      size={15}
                      color="var(--text-muted)"
                      style={{
                        flexShrink: 0,
                        transform: profileOpen
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "transform 0.15s",
                      }}
                    />
                  </button>

                  {profileOpen && (
                    <div
                      role="menu"
                      style={{
                        position: "absolute",
                        top: "calc(100% + 10px)",
                        right: 0,
                        width: 280,
                        padding: 8,
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-lg)",
                        boxShadow: "var(--shadow-lg)",
                        zIndex: 100,
                      }}
                    >
                      {/* Profile identity */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          padding: "12px 10px 14px",
                        }}
                      >
                        <div
                          style={{
                            width: 44,
                            height: 44,
                            flexShrink: 0,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "var(--primary-light)",
                            color: "var(--primary)",
                            fontSize: 14,
                            fontWeight: 700,
                          }}
                        >
                          {getInitials(user.name)}
                        </div>

                        <div style={{ minWidth: 0 }}>
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 700,
                              color: "var(--text-primary)",
                              overflowWrap: "anywhere",
                            }}
                          >
                            {user.name}
                          </div>

                          <div
                            style={{
                              marginTop: 4,
                              fontSize: 11,
                              color: "var(--text-muted)",
                              overflowWrap: "anywhere",
                            }}
                          >
                            {user.email}
                          </div>

                          <div
                            style={{
                              marginTop: 5,
                              fontSize: 11,
                              color: "var(--primary)",
                              fontWeight: 600,
                            }}
                          >
                            {getRoleName(user.role)}
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          height: 1,
                          background: "var(--border)",
                          margin: "0 4px 6px",
                        }}
                      />

                      <Link
                        href="/profile"
                        role="menuitem"
                        style={menuLinkStyle}
                        onClick={() => setProfileOpen(false)}
                        onMouseEnter={(event) => {
                          event.currentTarget.style.background =
                            "var(--primary-light)";
                        }}
                        onMouseLeave={(event) => {
                          event.currentTarget.style.background =
                            "transparent";
                        }}
                      >
                        <UserRound
                          size={18}
                          color="var(--text-muted)"
                        />
                        <span>My Profile</span>
                      </Link>

                      <Link
                        href="/profile/location"
                        role="menuitem"
                        style={menuLinkStyle}
                        onClick={() => setProfileOpen(false)}
                        onMouseEnter={(event) => {
                          event.currentTarget.style.background =
                            "var(--primary-light)";
                        }}
                        onMouseLeave={(event) => {
                          event.currentTarget.style.background =
                            "transparent";
                        }}
                      >
                        <MapPin
                          size={18}
                          color="var(--text-muted)"
                        />
                        <span>My Location</span>
                      </Link>

                      <Link
                        href="/profile/security"
                        role="menuitem"
                        style={menuLinkStyle}
                        onClick={() => setProfileOpen(false)}
                        onMouseEnter={(event) => {
                          event.currentTarget.style.background =
                            "var(--primary-light)";
                        }}
                        onMouseLeave={(event) => {
                          event.currentTarget.style.background =
                            "transparent";
                        }}
                      >
                        <ShieldCheck
                          size={18}
                          color="var(--text-muted)"
                        />
                        <span>Security</span>
                      </Link>

                      <div
                        style={{
                          height: 1,
                          background: "var(--border)",
                          margin: "6px 4px",
                        }}
                      />

                      <button
                        type="button"
                        role="menuitem"
                        onClick={handleLogout}
                        style={{
                          ...menuLinkStyle,
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
                          color: "#b42318",
                          textAlign: "left",
                        }}
                        onMouseEnter={(event) => {
                          event.currentTarget.style.background =
                            "#fef3f2";
                        }}
                        onMouseLeave={(event) => {
                          event.currentTarget.style.background =
                            "transparent";
                        }}
                      >
                        <LogOut size={18} />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <button
                  type="button"
                  aria-label="Open account menu"
                  aria-haspopup="menu"
                  aria-expanded={profileOpen}
                  onClick={() => setProfileOpen((value) => !value)}
                  style={{
                    width: 40,
                    height: 40,
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
                  <UserRound size={18} />
                </button>
              )}

              {!user && profileOpen && (
                <div
                  role="menu"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: 0,
                    width: 220,
                    padding: 8,
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-lg)",
                    boxShadow: "var(--shadow-lg)",
                    zIndex: 100,
                  }}
                >
                  <Link
                    href="/auth/login"
                    role="menuitem"
                    style={menuLinkStyle}
                    onClick={() => setProfileOpen(false)}
                  >
                    <LogIn size={18} color="var(--text-muted)" />
                    <span>Sign In</span>
                  </Link>

                  <Link
                    href="/auth/register"
                    role="menuitem"
                    style={menuLinkStyle}
                    onClick={() => setProfileOpen(false)}
                  >
                    <UserPlus size={18} color="var(--text-muted)" />
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
