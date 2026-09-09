"use client";

import { ArrowRight, MapPin, Camera, ChevronDown } from "lucide-react";

const STATS = [
  { value: "2,450", label: "Problems Reported", sub: "By citizens" },
  { value: "1,820", label: "Problems Resolved", sub: "Great work!" },
  { value: "630", label: "In Progress", sub: "Being worked on" },
  { value: "12,540", label: "Active Citizens", sub: "Thank you!" },
];

export default function Hero() {
  return (
    <section className="hero" style={{ paddingTop: 56, paddingBottom: 0 }}>
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 64,
          paddingTop: 48,
          paddingBottom: 72,
        }}
      >
        {/* LEFT CONTENT */}
        <div style={{ flex: "1 1 480px", maxWidth: 560 }}>

          <h1 style={{ marginTop: 20 }}>
            See a problem.
            <br />
            Report it.
            <br />
            Track it. <span style={{ color: "var(--primary)" }}>Fix it.</span>
          </h1>

          <p style={{ marginTop: 20, fontSize: 17, maxWidth: 460 }}>
            Report problems in your community and help make Rwanda a better
            place for everyone.
          </p>

          <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
            <a href="/report" className="btn-primary">
              Report a Problem
              <ArrowRight size={18} style={{ marginLeft: 8 }} />
            </a>
            <a href="/problems" className="btn-secondary">
              <MapPin size={18} style={{ marginRight: 8 }} />
              View Problems Near Me
            </a>
          </div>

  
        </div>

        {/* RIGHT VISUAL */}
        <div style={{ flex: "1 1 420px", position: "relative", maxWidth: 520 }}>
          <div
            style={{
              borderRadius: "var(--radius-xl)",
              overflow: "hidden",
              boxShadow: "var(--shadow-lg)",
              aspectRatio: "4 / 3",
              backgroundImage: "url('/kigaliconversioncenter.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(0,86,63,0.05) 0%, rgba(0,86,63,0.25) 100%)",
              }}
            />
          </div>

          {/* Floating map-pin markers over the skyline */}
          {[
            { top: "8%", left: "6%" },
            { top: "18%", right: "10%" },
            { top: "62%", left: "2%" },
            { top: "82%", right: "18%" },
          ].map((pos, i) => (
            <div
              key={i}
              className="card"
              style={{
                position: "absolute",
                width: 36,
                height: 36,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "var(--shadow-md)",
                ...pos,
              }}
            >
              <MapPin size={16} color="var(--primary)" />
            </div>
          ))}
        </div>
      </div>

      {/* STATS BAR */}
      <div className="green-section">
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 40,
            paddingBottom: 40,
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          {STATS.map((stat) => (
            <div key={stat.label} style={{ textAlign: "center", minWidth: 140 }}>
              <div
                style={{
                  fontSize: 34,
                  fontWeight: 700,
                  color: "#ffffff",
                  lineHeight: 1.1,
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#ffffff", marginTop: 6 }}>
                {stat.label}
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", marginTop: 2 }}>
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}