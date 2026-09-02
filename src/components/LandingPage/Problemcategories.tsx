"use client";

import { Construction, Droplet, Lightbulb, Recycle, Waves, Building2 } from "lucide-react";

const CATEGORIES = [
  {
    icon: Construction,
    iconColor: "#f97316",
    title: "Road Infrastructure",
    count: "3,247 reports",
    countColor: "#f97316",
    bg: "#1a1210",
    border: "#3a281f",
  },
  {
    icon: Droplet,
    iconColor: "#38bdf8",
    title: "Water",
    count: "2,108 reports",
    countColor: "#38bdf8",
    bg: "#0e1a22",
    border: "#1f3a4a",
  },
  {
    icon: Lightbulb,
    iconColor: "#eab308",
    title: "Street Lighting",
    count: "1,456 reports",
    countColor: "#eab308",
    bg: "#181a10",
    border: "#3a3a1f",
  },
  {
    icon: Recycle,
    iconColor: "#22c55e",
    title: "Waste Management",
    count: "1,893 reports",
    countColor: "#22c55e",
    bg: "#0e1a15",
    border: "#1f3a2c",
  },
  {
    icon: Waves,
    iconColor: "#818cf8",
    title: "Drainage",
    count: "987 reports",
    countColor: "#818cf8",
    bg: "#14152a",
    border: "#2b2d4f",
  },
  {
    icon: Building2,
    iconColor: "#e879f9",
    title: "Public Infrastructure",
    count: "744 reports",
    countColor: "#e879f9",
    bg: "#1c1428",
    border: "#3a2b4f",
  },
];

export default function ProblemCategories() {
  return (
    <section
      style={{
        backgroundColor: "#060a12",
        paddingTop: 80,
        paddingBottom: 90,
        paddingLeft: 24,
        paddingRight: 24,
      }}
    >
      <div style={{ maxWidth: 1200, marginLeft: "auto", marginRight: "auto" }}>

        {/* LABEL */}
        <div style={{ textAlign: "center" }}>
          <span
            className="font-semibold"
            style={{ fontSize: 12, letterSpacing: "3px", color: "#f59e0b" }}
          >
            WHAT CAN YOU REPORT?
          </span>
        </div>

        {/* HEADING */}
        <h2
          className="font-serif font-bold text-[#f5f7fa]"
          style={{
            fontSize: 40,
            textAlign: "center",
            marginTop: 14,
            marginBottom: 56,
          }}
        >
          Problem Categories
        </h2>

        {/* GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                style={{
                  backgroundColor: cat.bg,
                  border: `1px solid ${cat.border}`,
                  borderRadius: 14,
                  padding: 28,
                  cursor: "pointer",
                  transition: "border-color 0.15s",
                }}
              >
                <Icon size={30} strokeWidth={1.8} color={cat.iconColor} />

                <div
                  className="font-bold text-[#f5f7fa]"
                  style={{ fontSize: 17, marginTop: 20 }}
                >
                  {cat.title}
                </div>

                <div
                  style={{
                    fontSize: 13,
                    fontFamily: "monospace",
                    color: cat.countColor,
                    marginTop: 6,
                  }}
                >
                  {cat.count}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}