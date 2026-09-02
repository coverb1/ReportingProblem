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
        backgroundColor: "#060a12",
        paddingTop: 56,
        paddingBottom: 32,
        paddingLeft: 24,
        paddingRight: 24,
      }}
    >
      <div style={{ maxWidth: 1200, marginLeft: "auto", marginRight: "auto" }}>

        {/* TOP ROW */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>

          {/* LEFT: LOGO + DESCRIPTION */}
          <div style={{ maxWidth: 340 }}>
            <Link href="/" style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                <span style={{ width: 8, height: 22, borderRadius: 2, backgroundColor: "#16a05d" }} />
                <span style={{ width: 8, height: 22, borderRadius: 2, backgroundColor: "#ffcf00" }} />
                <span style={{ width: 8, height: 22, borderRadius: 2, backgroundColor: "#08aeea" }} />
              </div>
              <span
                className="font-serif font-bold"
                style={{ marginLeft: 10, fontSize: 18, color: "#f5f7fa" }}
              >
                RCPMS
              </span>
            </Link>

            <div
              style={{
                marginTop: 6,
                fontSize: 12,
                fontFamily: "monospace",
                color: "#5c6b7d",
              }}
            >
              Rwanda Community Problem Mgmt.
            </div>

            <p
              style={{
                marginTop: 18,
                fontSize: 13.5,
                lineHeight: 1.6,
                color: "#7c8aa0",
              }}
            >
              AI-powered civic platform connecting Rwandan citizens to the
              organizations responsible for maintaining their communities.
            </p>
          </div>

          {/* RIGHT: LINK COLUMNS */}
          <div style={{ display: "flex", gap: 72 }}>
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <div
                  className="font-bold"
                  style={{ fontSize: 14, color: "#f5f7fa", marginBottom: 16 }}
                >
                  {col.heading}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {col.links.map((label) => (
                    <Link
                      key={label}
                      href="#"
                      style={{ fontSize: 13.5, color: "#7c8fd4" }}
                      className="hover:text-[#a9b8ec] transition-colors"
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
            borderTop: "1px solid #1a2434",
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
          <span
            style={{
              fontSize: 12,
              fontFamily: "monospace",
              color: "#5c6b7d",
            }}
          >
            © 2026 RCPMS · Government of Rwanda · Ministry of Local Government
          </span>

          <span
            style={{
              fontSize: 12,
              fontFamily: "monospace",
              color: "#5c6b7d",
            }}
          >
            Built with AI-assisted governance · Law No. 058/2021 Compliant
          </span>
        </div>
      </div>
    </footer>
  );
}