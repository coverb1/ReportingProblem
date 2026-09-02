"use client";

import { PenLine, Bot, Landmark, UserCheck, CheckCircle2 } from "lucide-react";

const STEPS = [
  {
    number: 1,
    icon: PenLine,
    badgeColor: "#08aeea",
    title: "Citizen Reports",
    description:
      "Describe in your own words. Upload photo, share location. No technical knowledge needed.",
  },
  {
    number: 2,
    icon: Bot,
    badgeColor: "#8b5cf6",
    title: "AI Analyzes",
    description:
      "Classifies category, sets priority, detects duplicates, assesses risk — in seconds.",
  },
  {
    number: 3,
    icon: Landmark,
    badgeColor: "#f59e0b",
    title: "Auto-Routed",
    description:
      "AI identifies the responsible organization and routes the report immediately.",
  },
  {
    number: 4,
    icon: UserCheck,
    badgeColor: "#f97316",
    title: "Team Acts",
    description:
      "Staff accepts and a technician is dispatched. Progress tracked in real-time.",
  },
  {
    number: 5,
    icon: CheckCircle2,
    badgeColor: "#22c55e",
    title: "Resolved",
    description:
      "Citizen confirms the fix. Report closed. Your community measurably improves.",
  },
];

export default function Process() {
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
            className="font-semibold text-[#08aeea]"
            style={{ fontSize: 12, letterSpacing: "3px" }}
          >
            THE PROCESS
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
          From report to resolution
        </h2>

        {/* STEPS ROW */}
        <div style={{ position: "relative", display: "flex", justifyContent: "space-between" }}>

          {/* CONNECTING LINE (flat color, no gradient) */}
          <div
            style={{
              position: "absolute",
              top: 44,
              left: 44,
              right: 44,
              height: 1,
              backgroundColor: "#1a2c3e",
              zIndex: 0,
            }}
          />

          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                style={{
                  position: "relative",
                  zIndex: 1,
                  width: 200,
                  textAlign: "center",
                }}
              >
                {/* ICON BOX */}
                <div
                  style={{
                    position: "relative",
                    width: 88,
                    height: 88,
                    marginLeft: "auto",
                    marginRight: "auto",
                    borderRadius: 14,
                    backgroundColor: "#0d1826",
                    border: "1px solid #1a2c3e",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={30} strokeWidth={1.8} color="#dce5ed" />

                  {/* NUMBER BADGE */}
                  <div
                    style={{
                      position: "absolute",
                      top: -10,
                      right: -10,
                      width: 26,
                      height: 26,
                      borderRadius: "9999px",
                      backgroundColor: step.badgeColor,
                      border: "3px solid #060a12",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#060a12",
                    }}
                  >
                    {step.number}
                  </div>
                </div>

                {/* TITLE */}
                <div
                  className="font-bold text-[#f5f7fa]"
                  style={{ fontSize: 16, marginTop: 18 }}
                >
                  {step.title}
                </div>

                {/* DESCRIPTION */}
                <p
                  className="text-[#7c8aa0]"
                  style={{ fontSize: 13, lineHeight: 1.55, marginTop: 8 }}
                >
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}