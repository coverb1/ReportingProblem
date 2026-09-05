"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Plus, MapPin, ThumbsUp, Home, Droplet, Lightbulb, Check, X } from "lucide-react";

type Report = {
  id: string;
  icon: LucideIcon;
  color: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  status: string;
  title: string;
  location: string;
  time: string;
  votes: number;
  confidence: number;
};

type Notification = {
  id: string;
  text: string;
  time: string;
  unread?: boolean;
  confirm?: boolean;
};

const STATS = [
  { value: "7", label: "Total reports", sub: "+2 this month" },
  { value: "3", label: "In progress", sub: "2 assigned to staff" },
  { value: "4", label: "Resolved", sub: "57% resolution rate" },
  { value: "1", label: "Pending confirm", sub: "Awaiting your input" },
];

const REPORTS: Report[] = [
  {
    id: "RP-2026-0001",
    icon: Home,
    color: "#b5680f",
    priority: "HIGH",
    status: "In Progress",
    title: "Dangerous pothole near Kimironko school",
    location: "Kimironko, Gasabo",
    time: "2 hours ago",
    votes: 14,
    confidence: 92,
  },
  {
    id: "RP-2026-0002",
    icon: Droplet,
    color: "#3b6fb0",
    priority: "HIGH",
    status: "Accepted",
    title: "No water supply — Nyamirambo sector",
    location: "Nyamirambo, Nyarugenge",
    time: "5 hours ago",
    votes: 32,
    confidence: 88,
  },
  {
    id: "RP-2026-0003",
    icon: Lightbulb,
    color: "#9c7f1f",
    priority: "MEDIUM",
    status: "Under Review",
    title: "Street lights broken on Avenue de la Paix",
    location: "Kacyiru, Gasabo",
    time: "1 day ago",
    votes: 8,
    confidence: 74,
  },
];

const NOTIFICATIONS: Notification[] = [
  {
    id: "RP-2026-0001",
    text: "A technician has been assigned to repair the pothole near Kimironko school.",
    time: "30 min ago",
    unread: true,
  },
  {
    id: "RP-2026-0007",
    text: "Water pipe issue resolved. Please confirm the fix!",
    time: "2 hours ago",
    unread: true,
    confirm: true,
  },
  {
    id: "RP-2026-0003",
    text: "Under review by Gasabo District Infrastructure Department.",
    time: "5 hours ago",
  },
  {
    id: "RP-2026-0005",
    text: "Escalated to district authority — 72h without action.",
    time: "1 day ago",
  },
];

const PRIORITY_COLOR: Record<Report["priority"], string> = {
  HIGH: "#b42318",
  MEDIUM: "#9c7f1f",
  LOW: "var(--primary)",
};

const TABS = ["All", "Active", "Resolved"];

export default function Myreport() {
  const [tab, setTab] = useState("All");

  return (
    <div style={{ backgroundColor: "var(--background)", minHeight: "100vh", padding: "40px 32px" }}>
      <div style={{ maxWidth: 1100, marginLeft: "auto", marginRight: "auto" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <p style={{ color: "var(--primary)", fontSize: 13, fontWeight: 600 }}>Welcome back,</p>
            <h1 style={{ fontSize: 26, marginTop: 4 }}>Jean-Pierre Habimana</h1>
            <p style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 6 }}>
              Gasabo District · Citizen since Jan 2026 · ★ 4.8 reputation
            </p>
          </div>

          <button type="button" className="btn-primary" style={{ gap: 8 }}>
            <Plus size={16} strokeWidth={2.5} />
            New Report
          </button>
        </div>

        {/* stats — plain row, no card boxes */}
        <div
          style={{
            display: "flex",
            marginTop: 32,
            paddingBottom: 24,
            borderBottom: "1px solid var(--border)",
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                flex: 1,
                paddingLeft: i === 0 ? 0 : 24,
                borderLeft: i === 0 ? "none" : "1px solid var(--border-light)",
              }}
            >
              <div style={{ fontSize: 24, fontWeight: 700 }}>{stat.value}</div>
              <div style={{ fontSize: 13, marginTop: 2 }}>{stat.label}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 40, marginTop: 32, alignItems: "flex-start" }}>
          {/* reports */}
          <div style={{ flex: 2 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <h2 style={{ fontSize: 17 }}>My Reports</h2>
              <div style={{ display: "flex", gap: 18 }}>
                {TABS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTab(t)}
                    style={{
                      fontSize: 13,
                      fontWeight: tab === t ? 700 : 500,
                      color: tab === t ? "var(--primary)" : "var(--text-muted)",
                      background: "none",
                      border: "none",
                      padding: "4px 0",
                      borderBottom: tab === t ? "2px solid var(--primary)" : "2px solid transparent",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {REPORTS.map((report) => {
              const Icon = report.icon;
              return (
                <div
                  key={report.id}
                  style={{
                    display: "flex",
                    gap: 14,
                    padding: "18px 0",
                    borderBottom: "1px solid var(--border-light)",
                  }}
                >
                  <Icon size={20} color={report.color} style={{ marginTop: 2, flexShrink: 0 }} />

                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                      {report.id} · <span style={{ color: PRIORITY_COLOR[report.priority], fontWeight: 600 }}>{report.priority}</span> · {report.status}
                    </div>

                    <p style={{ fontSize: 15, fontWeight: 600, margin: "4px 0" }}>{report.title}</p>

                    <div style={{ display: "flex", gap: 14, fontSize: 12, color: "var(--text-muted)" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <MapPin size={12} />
                        {report.location}
                      </span>
                      <span>{report.time}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <ThumbsUp size={12} />
                        {report.votes}
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, maxWidth: 260 }}>
                      <div style={{ flex: 1, height: 4, borderRadius: 4, background: "var(--border-light)" }}>
                        <div
                          style={{
                            width: `${report.confidence}%`,
                            height: "100%",
                            borderRadius: 4,
                            background: "var(--primary)",
                          }}
                        />
                      </div>
                      <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{report.confidence}% AI confidence</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* notifications */}
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 17, marginBottom: 8 }}>Notifications</h2>

            {NOTIFICATIONS.map((n, i) => (
              <div
                key={n.id + i}
                style={{
                  padding: "14px 0",
                  borderBottom: "1px solid var(--border-light)",
                }}
              >
                <p style={{ fontSize: 13, lineHeight: 1.5 }}>
                  {n.unread && (
                    <span
                      style={{
                        display: "inline-block",
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "var(--primary)",
                        marginRight: 6,
                      }}
                    />
                  )}
                  <span style={{ fontWeight: 600 }}>{n.id}</span> — {n.text}
                </p>
                <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>{n.time}</p>

                {n.confirm && (
                  <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
                    <button
                      type="button"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: 12,
                        fontWeight: 600,
                        color: "var(--primary)",
                        background: "none",
                        border: "none",
                        padding: 0,
                      }}
                    >
                      <Check size={12} />
                      Resolved
                    </button>
                    <button
                      type="button"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#b42318",
                        background: "none",
                        border: "none",
                        padding: 0,
                      }}
                    >
                      <X size={12} />
                      Not fixed
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}