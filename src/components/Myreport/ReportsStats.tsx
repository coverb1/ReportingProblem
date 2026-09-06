import {
  FileText,
  Clock3,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const STATS = [
  {
    label: "Total Reports",
    value: "2,450",
    icon: FileText,
    variant: "green",
  },
  {
    label: "In Progress",
    value: "630",
    icon: Clock3,
    variant: "orange",
  },
  {
    label: "Resolved",
    value: "1,820",
    icon: CheckCircle2,
    variant: "green",
  },
  {
    label: "Pending Review",
    value: "230",
    icon: AlertCircle,
    variant: "red",
  },
];

export default function ReportsStats() {
  return (
    <section className="reportsStats" aria-label="Report statistics">
      {STATS.map((stat) => {
        const Icon = stat.icon;

        return (
          <div className="reportStat" key={stat.label}>
            <div className={`reportStatIcon ${stat.variant}`}>
              <Icon size={21} strokeWidth={2} />
            </div>

            <div>
              <div className="reportStatNumber">{stat.value}</div>
              <div className="reportStatLabel">{stat.label}</div>
            </div>
          </div>
        );
      })}
    </section>
  );
}