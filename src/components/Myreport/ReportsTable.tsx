import { MapPin, MoreVertical, Eye } from "lucide-react";

interface Report {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  status: string;
  date: string;
  time: string;
}

interface ReportsTableProps {
  reports: Report[];
}

export default function ReportsTable({
  reports,
}: ReportsTableProps) {
  return (
    <div className="reportsTableWrapper">
      <table className="reportsTable">
        <thead>
          <tr>
            <th className="reportsTableNumber">#</th>
            <th>Report</th>
            <th>Category</th>
            <th>Location</th>
            <th>Status</th>
            <th>Date Reported</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {reports.map((report, index) => (
            <tr key={report.id}>
              <td className="reportsTableNumber">
                {index + 1}
              </td>

              <td>
                <div className="reportTableTitle">
                  <div className="reportTableThumbnail">
                    <div className="reportTableThumbnailPlaceholder" />
                  </div>

                  <div className="reportTableInfo">
                    <strong>{report.title}</strong>
                    <span>{report.description}</span>
                  </div>
                </div>
              </td>

              <td>
                  <span className="reportCategory">
                  {report.category}
                </span>
              </td>

              <td>
                  <span className="reportLocation">
                  <MapPin size={13} />
                  {report.location}
                </span>
              </td>

              <td>
                <span
                  className={`reportStatus reportStatus${report.status
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {report.status}
                </span>
              </td>

              <td>
                  <div className="reportDate">
                  <span>{report.date}</span>
                  <small>{report.time}</small>
                </div>
              </td>

              <td>
                <div className="reportActions">
                  <button
                    type="button"
                    className="reportViewButton"
                  >
                    <Eye size={14} />
                    View
                  </button>

                  <button
                    type="button"
                    className="reportMoreButton"
                    aria-label={`More actions for ${report.title}`}
                  >
                    <MoreVertical size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}