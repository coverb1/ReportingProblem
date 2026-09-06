import {
  MapPin,
  ThumbsUp,
  ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ReportCardProps = {
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

const PRIORITY_STYLES: Record<
  string,
  { color: string; background: string }
> = {
  HIGH: {
    color: "#b42318",
    background: "#fef3f2",
  },
  MEDIUM: {
    color: "#9c7f1f",
    background: "#fbf5df",
  },
  LOW: {
    color: "var(--primary)",
    background: "var(--background-green)",
  },
};

const STATUS_STYLES: Record<
  string,
  { color: string; background: string }
> = {
  "In Progress": {
    color: "#b5680f",
    background: "#fef3e2",
  },
  Accepted: {
    color: "var(--primary)",
    background: "var(--background-green)",
  },
  "Under Review": {
    color: "#9c7f1f",
    background: "#fbf5df",
  },
};

function Badge({
  label,
  color,
  background,
}: {
  label: string;
  color: string;
  background: string;
}) {
  return (
    <span
      className="report-badge"
      style={{
        color,
        backgroundColor: background,
      }}
    >
      <span
        className="report-badge-dot"
        style={{ backgroundColor: color }}
      />
      {label}
    </span>
  );
}

export default function ReportCard({
  id,
  icon: Icon,
  iconColor,
  iconBg,
  priority,
  status,
  title,
  location,
  time,
  votes,
  confidence,
  confidenceColor,
}: ReportCardProps) {
  const priorityStyle =
    PRIORITY_STYLES[priority] ?? PRIORITY_STYLES.LOW;

  const statusStyle =
    STATUS_STYLES[status] ?? STATUS_STYLES["Under Review"];

  return (
    <article className="report-card">
      <div
        className="report-card-icon"
        style={{
          color: iconColor,
          backgroundColor: iconBg,
        }}
      >
        <Icon size={20} strokeWidth={2} />
      </div>

      <div className="report-card-body">
        <div className="report-card-top">
          <div className="report-card-meta">
            <span className="report-card-id">{id}</span>

            <Badge
              label={priority}
              color={priorityStyle.color}
              background={priorityStyle.background}
            />

            <Badge
              label={status}
              color={statusStyle.color}
              background={statusStyle.background}
            />
          </div>
        </div>

        <h3 className="report-card-title">{title}</h3>

        <div className="report-card-details">
          <span>
            <MapPin size={13} />
            {location}
          </span>

          <span>{time}</span>

          <span>
            <ThumbsUp size={13} />
            {votes}
          </span>
        </div>

        <div className="report-card-bottom">
          <div className="report-confidence">
            <div className="report-confidence-track">
              <div
                className="report-confidence-value"
                style={{
                  width: `${confidence}%`,
                  backgroundColor: confidenceColor,
                }}
              />
            </div>

            <span>
              AI Confidence {confidence}%
            </span>
          </div>

          <button
            type="button"
            className="report-view-button"
          >
            View Report
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}