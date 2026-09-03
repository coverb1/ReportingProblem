"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {Plus,MapPin,ThumbsUp,Home,Droplet,Lightbulb,Check,X,} from "lucide-react";

type Report = {
  id: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  priority: string;
  status: string;
  title: string;
  location: string;
  time: string;
  votes: number;
  confidence: number;
  confidenceColor: string;
};

type Notification = {
  id: string;
  dot: string;
  text: string;
  time: string;
  confirm?: boolean;
};

const STATS = [
  { value: "7", label: "Total Reports", sub: "+2 this month", color: "#08aeea" },
  { value: "3", label: "In Progress", sub: "2 assigned to staff", color: "#ff8a3d" },
  { value: "4", label: "Resolved", sub: "57% resolution rate", color: "#16d9a0" },
  { value: "1", label: "Pending Confirm", sub: "Awaiting your input", color: "#ffb000" },
];

const REPORTS: Report[] = [
  {
    id: "RP-2026-0001",
    icon: Home,
    iconColor: "#ff8a3d",
    iconBg: "rgba(255, 138, 61, 0.12)",
    priority: "HIGH",
    status: "In Progress",
    title: "Dangerous pothole near Kimironko school",
    location: "Kimironko, Gasabo",
    time: "2 hours ago",
    votes: 14,
    confidence: 92,
    confidenceColor: "#16d9a0",
  },
  {
    id: "RP-2026-0002",
    icon: Droplet,
    iconColor: "#08aeea",
    iconBg: "rgba(8, 174, 234, 0.12)",
    priority: "HIGH",
    status: "Accepted",
    title: "No water supply — Nyamirambo sector",
    location: "Nyamirambo, Nyarugenge",
    time: "5 hours ago",
    votes: 32,
    confidence: 88,
    confidenceColor: "#ffb000",
  },
  {
    id: "RP-2026-0003",
    icon: Lightbulb,
    iconColor: "#ffb000",
    iconBg: "rgba(255, 176, 0, 0.12)",
    priority: "MEDIUM",
    status: "Under Review",
    title: "Street lights broken on Avenue de la Paix",
    location: "Kacyiru, Gasabo",
    time: "1 day ago",
    votes: 8,
    confidence: 74,
    confidenceColor: "#ffb000",
  },
];

const NOTIFICATIONS: Notification[] = [
  {
    id: "RP-2026-0001",
    dot: "#08aeea",
    text: "A technician has been assigned to repair the pothole near Kimironko school.",
    time: "30 min ago",
  },
  {
    id: "RP-2026-0007",
    dot: "#ffb000",
    text: "Water pipe issue resolved. Please confirm the fix!",
    time: "2 hours ago",
    confirm: true,
  },
  {
    id: "RP-2026-0003",
    dot: "#8a5cf6",
    text: "Under review by Gasabo District Infrastructure Department.",
    time: "5 hours ago",
  },
  {
    id: "RP-2026-0005",
    dot: "#ff4b3e",
    text: "Escalated to district authority — 72h without action.",
    time: "1 day ago",
  },
];

const PRIORITY_STYLES: Record<string, { color: string; bg: string }> = {
  HIGH: { color: "#ff4b3e", bg: "rgba(255, 75, 62, 0.12)" },
  MEDIUM: { color: "#ffb000", bg: "rgba(255, 176, 0, 0.12)" },
  LOW: { color: "#16d9a0", bg: "rgba(22, 217, 160, 0.12)" },
};

const STATUS_STYLES: Record<string, { color: string; bg: string }> = {
  "In Progress": { color: "#ff4b3e", bg: "rgba(255, 75, 62, 0.12)" },
  Accepted: { color: "#16d9a0", bg: "rgba(22, 217, 160, 0.12)" },
  "Under Review": { color: "#ffb000", bg: "rgba(255, 176, 0, 0.12)" },
};

const TABS = ["All", "Active", "Resolved"];

type BadgeProps = {
  label: string;
  color: string;
  bg: string;
};

function Badge({ label, color, bg }: BadgeProps) {
  return (
    <span
      className="font-semibold"
      style={{
        color,
        backgroundColor: bg,
        fontSize: 11,
        padding: "4px 10px",
        borderRadius: 6,
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
      }}
    >
      <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: color }} />
      {label}
    </span>
  );
}

export default function Myreport() {
  const [tab, setTab] = useState("All");

  return (
    <div
      style={{
        backgroundColor: "#060d16",
        minHeight: "100vh",
        padding: "40px 32px",
        fontFamily: "'Century Gothic', 'AppleGothic', Arial, sans-serif",
        color: "#f5f7fa",
      }}
    >
      <div style={{ maxWidth: 1240, marginLeft: "auto", marginRight: "auto" }}>
        {/* HEADER */}
        <div className="flex items-start justify-between" style={{ marginBottom: 28 }}>
          <div>
            <p style={{ color: "#08aeea", fontSize: 13 }}>Welcome back,</p>
            <h1 className="font-bold" style={{ fontSize: 28, marginTop: 4 }}>
              Jean-Pierre Habimana
            </h1>
            <p style={{ color: "#55708e", fontSize: 13, marginTop: 6 }}>
              Gasabo District · Citizen since Jan 2026 · Reputation: <span style={{ color: "#ffb000" }}>★ 4.8</span>
            </p>
          </div>

          <button
            type="button"
            className="flex items-center rounded-[8px] bg-[#08aeea] text-white font-bold transition-colors hover:bg-[#0798cc]"
            style={{ height: 42, paddingLeft: 18, paddingRight: 18, gap: 8, fontSize: 13 }}
          >
            <Plus size={16} strokeWidth={2.5} />
            New Report
          </button>
        </div>

        {/* STATS ROW */}
        <div className="flex" style={{ gap: 16, marginBottom: 28 }}>
          {STATS.map((stat) => (
            <div key={stat.label} className="rounded-[12px] border border-[#1b344b]" style={{ backgroundColor: "#0c1a2a", padding: "18px 20px", flex: 1 }}>
              <div className="font-bold" style={{ fontSize: 26, color: stat.color }}>
                {stat.value}
              </div>
              <div className="font-semibold" style={{ fontSize: 13, marginTop: 6, color: "#f5f7fa" }}>
                {stat.label}
              </div>
              <div style={{ fontSize: 12, marginTop: 3, color: "#55708e" }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="flex" style={{ gap: 24, alignItems: "flex-start" }}>
          {/* LEFT: MY REPORTS */}
          <div style={{ flex: 2 }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
              <h2 className="font-bold" style={{ fontSize: 18 }}>
                My Reports
              </h2>
              <div
                className="flex rounded-[8px] border border-[#1b344b]"
                style={{ backgroundColor: "#0c1a2a", padding: 3, gap: 2 }}
              >
                {TABS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTab(t)}
                    className="font-semibold transition-colors"
                    style={{
                      fontSize: 12,
                      padding: "6px 14px",
                      borderRadius: 6,
                      backgroundColor: tab === t ? "#08aeea" : "transparent",
                      color: tab === t ? "#ffffff" : "#8a97a8",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col" style={{ gap: 14 }}>
              {REPORTS.map((report) => {
                const Icon = report.icon;
                const priority = PRIORITY_STYLES[report.priority];
                const status = STATUS_STYLES[report.status];
                return (
                  <div
                    key={report.id}
                    className="rounded-[12px] border border-[#1b344b]"
                    style={{ backgroundColor: "#0c1a2a", padding: 20 }}
                  >
                    <div className="flex items-start" style={{ gap: 14 }}>
                      <div
                        className="flex items-center justify-center rounded-[10px]"
                        style={{ width: 40, height: 40, backgroundColor: report.iconBg, flexShrink: 0 }}
                      >
                        <Icon size={18} color={report.iconColor} />
                      </div>

                      <div style={{ flex: 1 }}>
                        <div className="flex items-center" style={{ gap: 8, marginBottom: 8 }}>
                          <span style={{ fontSize: 12, color: "#55708e" }}>{report.id}</span>
                          <Badge label={report.priority} color={priority.color} bg={priority.bg} />
                          <Badge label={report.status} color={status.color} bg={status.bg} />
                        </div>

                        <p className="font-semibold" style={{ fontSize: 15, marginBottom: 8 }}>
                          {report.title}
                        </p>

                        <div className="flex items-center" style={{ gap: 16, fontSize: 12, color: "#55708e" }}>
                          <span className="flex items-center" style={{ gap: 4 }}>
                            <MapPin size={12} />
                            {report.location}
                          </span>
                          <span>{report.time}</span>
                          <span className="flex items-center" style={{ gap: 4 }}>
                            <ThumbsUp size={12} />
                            {report.votes}
                          </span>
                        </div>

                        <div className="flex items-center" style={{ gap: 10, marginTop: 14 }}>
                          <div
                            style={{
                              flex: 1,
                              height: 5,
                              borderRadius: 10,
                              backgroundColor: "#132335",
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                width: `${report.confidence}%`,
                                height: "100%",
                                backgroundColor: report.confidenceColor,
                                borderRadius: 10,
                              }}
                            />
                          </div>
                          <span style={{ fontSize: 11, color: "#55708e", whiteSpace: "nowrap" }}>
                            AI Confidence {report.confidence}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: NOTIFICATIONS */}
          <div style={{ flex: 1 }}>
            <h2 className="font-bold" style={{ fontSize: 18, marginBottom: 16 }}>
              Notifications
            </h2>

            <div
              className="rounded-[12px] border border-[#1b344b]"
              style={{ backgroundColor: "#0c1a2a", overflow: "hidden" }}
            >
              {NOTIFICATIONS.map((n, i) => (
                <div
                  key={n.id + i}
                  style={{
                    padding: 16,
                    borderBottom: i < NOTIFICATIONS.length - 1 ? "1px solid #1b344b" : "none",
                  }}
                >
                  <div className="flex items-start" style={{ gap: 10 }}>
                    <span
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        backgroundColor: n.dot,
                        marginTop: 6,
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, lineHeight: 1.5 }}>
                        <span className="font-semibold">{n.id}:</span> {n.text}
                      </p>
                      <p style={{ fontSize: 11, color: "#55708e", marginTop: 6 }}>{n.time}</p>

                      {n.confirm && (
                        <div className="flex items-center" style={{ gap: 8, marginTop: 10 }}>
                          <button
                            type="button"
                            className="flex items-center font-semibold rounded-[6px]"
                            style={{
                              fontSize: 12,
                              padding: "6px 12px",
                              gap: 5,
                              backgroundColor: "rgba(22, 217, 160, 0.12)",
                              color: "#16d9a0",
                            }}
                          >
                            <Check size={12} />
                            Yes, resolved
                          </button>
                          <button
                            type="button"
                            className="flex items-center font-semibold rounded-[6px]"
                            style={{
                              fontSize: 12,
                              padding: "6px 12px",
                              gap: 5,
                              backgroundColor: "rgba(255, 75, 62, 0.12)",
                              color: "#ff4b3e",
                            }}
                          >
                            <X size={12} />
                            Not fixed
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}