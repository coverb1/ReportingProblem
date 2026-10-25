
"use client";

import React from "react";
import Link from "next/link";
import {ArrowLeft,MapPin,CalendarDays,Clock3,FileText,CheckCircle2,Circle,AlertCircle,Image as ImageIcon,Hash,Building2,ExternalLink,ArrowRight,} from "lucide-react";

type ReportStatus =
  | "PENDING"
  | "UNDER_REVIEW"
  | "FORWARDED"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "REJECTED";

const report = {
  id: "RCPMS-2026-001",
  title: "Damaged road near the local market",
  description:
    "The road near the local market has several large potholes. This makes it difficult for pedestrians and vehicles to pass safely, especially during rainy weather.",
  category: "ROADS",
  status: "UNDER_REVIEW" as ReportStatus,
  priority: "MEDIUM",
  specificLocation: "Near the local market",
  district: "Gasabo",
  sector: "Kimironko",
  cell: "Bibare",
  village: "Ruhangare",
  createdAt: "October 20, 2026",
  updatedAt: "October 22, 2026",
  photoUrl: "",
};

const statusSteps = [
  {
    status: "PENDING",
    title: "Report submitted",
    description: "Your report has been received by the system.",
  },
  {
    status: "UNDER_REVIEW",
    title: "Under review",
    description: "The responsible authority is reviewing your report.",
  },
  {
    status: "FORWARDED",
    title: "Forwarded to authority",
    description: "Your report has been forwarded to the responsible team.",
  },
  {
    status: "IN_PROGRESS",
    title: "Work in progress",
    description: "The responsible team is working on the reported problem.",
  },
  {
    status: "RESOLVED",
    title: "Problem resolved",
    description: "The reported problem has been resolved.",
  },
];

const statusLabels: Record<ReportStatus, string> = {
  PENDING: "Pending",
  UNDER_REVIEW: "Under Review",
  FORWARDED: "Forwarded",
  IN_PROGRESS: "In Progress",
  RESOLVED: "Resolved",
  REJECTED: "Rejected",
};

const statusDescriptions: Record<ReportStatus, string> = {
  PENDING: "Your report has been received and is waiting for review.",
  UNDER_REVIEW: "The responsible authority is reviewing your report.",
  FORWARDED: "Your report has been forwarded to the responsible authority.",
  IN_PROGRESS: "Work is in progress to address the reported problem.",
  RESOLVED: "The reported problem has been marked as resolved.",
  REJECTED: "Your report was rejected. Contact the responsible authority for more information.",
};

const priorityLabels: Record<string, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  URGENT: "Urgent",
};

function formatCategory(category: string) {
  return category.replaceAll("_", " ").toLowerCase().replace(/\b\w/g, (char) =>
    char.toUpperCase()
  );
}

export default function ReportDetailsPage() {
  const currentStep = statusSteps.findIndex(
    (step) => step.status === report.status
  );

  const isRejected = report.status === "REJECTED";

  return (
    <main className="report-details-page">
      <div className="report-details-container">
        <Link href="/my-reports" className="report-back-link">
          <ArrowLeft size={18} />
          <span>Back to My Reports</span>
        </Link>

        <header className="report-details-heading">
          <div>
            <span className="report-eyebrow">MY REPORTS</span>
            <h1>Report Details</h1>
            <p>
              View your submitted report and follow its progress.
            </p>
          </div>

          <div className="report-reference">
            <Hash size={16} />
            <span>{report.id}</span>
          </div>
        </header>

        <section className="report-details-grid">
          <div className="report-main-column">
            <article className="report-details-card">
              <div className="report-card-top">
                <span className="report-category-badge">
                  <FileText size={15} />
                  {formatCategory(report.category)}
                </span>

                <span
                  className={`report-status-badge status-${report.status.toLowerCase()}`}
                >
                  <span className="report-status-dot" />
                  {statusLabels[report.status]}
                </span>
              </div>

              <h2 className="report-title">{report.title}</h2>

              <p className="report-description">
                {report.description}
              </p>

              <div className="report-info-row">
                <div className="report-info-item">
                  <CalendarDays size={18} />
                  <div>
                    <span>Submitted on</span>
                    <strong>{report.createdAt}</strong>
                  </div>
                </div>

                <div className="report-info-item">
                  <Clock3 size={18} />
                  <div>
                    <span>Last updated</span>
                    <strong>{report.updatedAt}</strong>
                  </div>
                </div>
              </div>
            </article>

            <article className="report-details-card">
              <div className="report-section-heading">
                <div className="report-section-icon">
                  <Building2 size={20} />
                </div>
                <div>
                  <h3>Report Location</h3>
                  <p>Where the problem was reported</p>
                </div>
              </div>

              <div className="report-location-box">
                <MapPin size={22} />
                <div>
                  <strong>{report.specificLocation}</strong>
                  <p>
                    {report.village}, {report.cell}, {report.sector},{" "}
                    {report.district}
                  </p>
                </div>
              </div>

              <div className="report-location-grid">
                <div>
                  <span>District</span>
                  <strong>{report.district}</strong>
                </div>
                <div>
                  <span>Sector</span>
                  <strong>{report.sector}</strong>
                </div>
                <div>
                  <span>Cell</span>
                  <strong>{report.cell}</strong>
                </div>
                <div>
                  <span>Village</span>
                  <strong>{report.village}</strong>
                </div>
              </div>
            </article>

            <article className="report-details-card">
              <div className="report-section-heading">
                <div className="report-section-icon">
                  <ImageIcon size={20} />
                </div>
                <div>
                  <h3>Attached Photo</h3>
                  <p>Photo evidence submitted with your report</p>
                </div>
              </div>

              {report.photoUrl ? (
                <a
                  href={report.photoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="report-photo-link"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={report.photoUrl}
                    alt="Evidence attached to the report"
                    className="report-photo"
                  />
                  <span>
                    View full image <ExternalLink size={15} />
                  </span>
                </a>
              ) : (
                <div className="report-no-photo">
                  <ImageIcon size={26} />
                  <p>No photo was attached to this report.</p>
                </div>
              )}
            </article>
          </div>

          <aside className="report-side-column">
            <article className="report-details-card report-status-card">
              <div className="report-section-heading">
                <div className="report-section-icon">
                  <Clock3 size={20} />
                </div>
                <div>
                  <h3>Report Progress</h3>
                  <p>Track the current status</p>
                </div>
              </div>

              <div className="report-current-status">
                <span className="report-current-status-label">
                  CURRENT STATUS
                </span>
                <strong>{statusLabels[report.status]}</strong>
                <p>{statusDescriptions[report.status]}</p>
              </div>

              <div className="report-timeline">
                {statusSteps.map((step, index) => {
                  const isCompleted =
                    !isRejected && index <= currentStep;
                  const isCurrent =
                    !isRejected && index === currentStep;

                  return (
                    <div
                      className={`report-timeline-step ${
                        isCompleted ? "completed" : ""
                      } ${isCurrent ? "current" : ""}`}
                      key={step.status}
                    >
                      <div className="report-timeline-marker">
                        {isCompleted ? (
                          <CheckCircle2 size={21} />
                        ) : (
                          <Circle size={21} />
                        )}
                      </div>

                      <div className="report-timeline-content">
                        <strong>{step.title}</strong>
                        <p>{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {isRejected && (
                <div className="report-rejected-notice">
                  <AlertCircle size={18} />
                  <p>
                    Your report was rejected. Please check any
                    notification or contact the responsible authority
                  </p>
                </div>
              )}
            </article>

            <article className="report-details-card">
              <h3 className="report-summary-title">Report Summary</h3>

              <div className="report-summary-row">
                <span>Reference</span>
                <strong>{report.id}</strong>
              </div>

              <div className="report-summary-row">
                <span>Category</span>
                <strong>{formatCategory(report.category)}</strong>
              </div>

              <div className="report-summary-row">
                <span>Priority</span>
                <span
                  className={`report-priority priority-${report.priority.toLowerCase()}`}
                >
                  {priorityLabels[report.priority] ?? report.priority}
                </span>
              </div>

              <div className="report-summary-row">
                <span>Visibility</span>
                <strong>Public</strong>
              </div>
            </article>

            <div className="report-help-card">
              <div className="report-help-icon">
                <AlertCircle size={20} />
              </div>
              <h3>Need help?</h3>
              <p>
                If you have questions about this report, contact your
                responsible local authority.
              </p>
              <Link href="/my-reports" className="report-help-link">
                View all my reports
                <ArrowRight size={16} />
              </Link>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
    