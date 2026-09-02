"use client";

import { ArrowRight, Zap } from "lucide-react";

const STATS = [
  { value: "12,847", label: "Total Reports Filed" },
  { value: "89.4%", label: "Resolution Rate" },
  { value: "26h", label: "Avg Response (HIGH)" },
  { value: "24,500+", label: "Citizens Served" },
];

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingTop: 140,
        paddingBottom: 80,
        paddingLeft: 24,
        paddingRight: 24,
        backgroundColor: "#060a12",
        backgroundImage: "url('/kigaliconversioncenter.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* DARK OVERLAY so text stays readable over the image (solid color, not a gradient) */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(6, 10, 18, 0.82)" }}
      />

      {/* CONTENT (sits above the overlay) */}
      <div
        className="relative flex items-start justify-between"
        style={{ maxWidth: 1200, marginLeft: "auto", marginRight: "auto", gap: 60 }}
      >

        {/* LEFT CONTENT */}
        <div style={{ maxWidth: 620 }}>

          {/* HEADLINE */}
          <h1 className="font-serif" style={{ lineHeight: 1.05 }}>
            <span className="block font-bold text-[#f5f7fa]" style={{ fontSize: 52 }}>
              Report
            </span>
            <span className="block font-bold text-[#f5f7fa]" style={{ fontSize: 52 }}>
              Community
            </span>
            <span className="block font-bold text-[#f5f7fa]" style={{ fontSize: 52 }}>
              Problems.
            </span>
            <span className="block font-bold text-[#08aeea]" style={{ fontSize: 52 }}>
              AI Does the Rest.
            </span>
          </h1>

          {/* SUBTEXT */}
          <p
            className="text-[#8a97a8]"
            style={{ marginTop: 24, fontSize: 16, lineHeight: 1.6, maxWidth: 480 }}
          >
            Citizens report. AI classifies, prioritizes, and routes to the
            right organization — automatically. Kigali gets better, together.
          </p>

          {/* CTA BUTTONS */}
          <div className="flex items-center" style={{ marginTop: 32, gap: 14 }}>
            <button
              type="button"
              className="flex items-center rounded-[8px] bg-[#08aeea] text-white font-bold transition-colors hover:bg-[#0798cc]"
              style={{ height: 48, paddingLeft: 22, paddingRight: 22, gap: 8, fontSize: 14 }}
            >
              Report a Problem
              <ArrowRight size={16} strokeWidth={2.5} />
            </button>

            <button
              type="button"
              className="flex items-center rounded-[8px] border border-[#2a3a4c] bg-transparent text-[#dce5ed] font-semibold transition-colors hover:bg-[#0d1a28]"
              style={{ height: 48, paddingLeft: 22, paddingRight: 22, fontSize: 14 }}
            >
              View Public Map
            </button>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div
        className="relative rounded-[16px] border border-[#1a2c3e]"
        style={{
          maxWidth: 1200,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 56,
          backgroundColor: "#0a121e",
          paddingTop: 28,
          paddingBottom: 28,
          paddingLeft: 40,
          paddingRight: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {STATS.map((stat) => (
          <div key={stat.label} style={{ textAlign: "center" }}>
            <div
              className="font-bold"
              style={{ fontSize: 30, color: "#f5f7fa", lineHeight: 1.2 }}
            >
              {stat.value}
            </div>
            <div
              className="text-[#8a97a8]"
              style={{ fontSize: 13, marginTop: 6 }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}