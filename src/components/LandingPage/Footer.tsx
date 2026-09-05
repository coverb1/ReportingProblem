"use client";

import Link from "next/link";

const COLUMNS = [
  {
    heading: "Platform",
    links: ["Report Problem", "Community Map", "Track Report", "Statistics"],
  },
  {
    heading: "Organizations",
    links: ["Sign In", "Dashboard", "Manage Reports", "AI Insights"],
  },
  {
    heading: "Legal & Help",
    links: ["How it Works", "Privacy Policy", "Data Protection", "Contact"],
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--primary-dark)",
        paddingTop: 56,
        paddingBottom: 32,
      }}
    >
      <div className="container">
        {/* TOP ROW */}
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 40 }}>
          {/* LEFT: LOGO + DESCRIPTION */}
          <div style={{ maxWidth: 340 }}>
            <Link href="/" style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "var(--radius-sm)",
                  background: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--primary)",
                  fontSize: 15,
                  fontWeight: 700,
                }}
              >
                R
              </div>
              <span style={{ marginLeft: 10, fontSize: 18, fontWeight: 700, color: "#ffffff" }}>
                RCPMS
              </span>
            </Link>

            <div
              style={{
                marginTop: 6,
                fontSize: 12,
                color: "rgba(255, 255, 255, 0.6)",
              }}
            >
              Rwanda Community Problem Mgmt.
            </div>

            <p
              style={{
                marginTop: 18,
                fontSize: 13.5,
                lineHeight: 1.6,
                color: "rgba(255, 255, 255, 0.75)",
              }}
            >
              AI-powered civic platform connecting Rwandan citizens to the
              organizations responsible for maintaining their communities.
            </p>
          </div>

          {/* RIGHT: LINK COLUMNS */}
          <div style={{ display: "flex", gap: 64, flexWrap: "wrap" }}>
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#ffffff", marginBottom: 16 }}>
                  {col.heading}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {col.links.map((label) => (
                    <Link
                      key={label}
                      href="#"
                      style={{
                        fontSize: 13.5,
                        color: "rgba(255, 255, 255, 0.75)",
                        transition: "color 0.15s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.75)")}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DIVIDER */}
        <div
          style={{
            marginTop: 48,
            marginBottom: 24,
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
          }}
        />

        {/* BOTTOM ROW */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 12, color: "rgba(255, 255, 255, 0.6)" }}>
            © 2026 RCPMS · Government of Rwanda · Ministry of Local Government
          </span>

          <span style={{ fontSize: 12, color: "rgba(255, 255, 255, 0.6)" }}>
            Built with AI-assisted governance · Law No. 058/2021 Compliant
          </span>
        </div>
      </div>
    </footer>
  );
}