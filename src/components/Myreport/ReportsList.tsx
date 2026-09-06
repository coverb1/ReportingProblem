import ReportsTable from "./ReportsTable";

const REPORTS = [
  {
    id: "RP-2026-0001",
    title: "Large pothole on main road",
    description: "A large pothole is causing damage to vehicles...",
    category: "Roads",
    location: "Nyamirambo, Kigali",
    status: "Pending",
    date: "Sep 5, 2025",
    time: "10:24 AM",
  },
  {
    id: "RP-2026-0002",
    title: "Street light not working",
    description: "The street light has been off for over a week...",
    category: "Street Lights",
    location: "Gasabo, Kigali",
    status: "In Progress",
    date: "Sep 4, 2025",
    time: "08:15 PM",
  },
  {
    id: "RP-2026-0003",
    title: "Garbage not collected",
    description: "Waste has not been collected from this area...",
    category: "Waste",
    location: "Kicukiro, Kigali",
    status: "Resolved",
    date: "Sep 3, 2025",
    time: "04:32 PM",
  },
  {
    id: "RP-2026-0004",
    title: "Water leakage",
    description: "There is a water leak on the main pipe...",
    category: "Water",
    location: "Rubavu",
    status: "In Progress",
    date: "Sep 2, 2025",
    time: "11:20 AM",
  },
  {
    id: "RP-2026-0005",
    title: "Blocked drainage",
    description: "The drainage is blocked causing water overflow...",
    category: "Drainage",
    location: "Huye",
    status: "Pending",
    date: "Sep 1, 2025",
    time: "09:10 AM",
  },
  {
    id: "RP-2026-0006",
    title: "Damaged bridge",
    description: "The bridge railing is broken and unsafe...",
    category: "Roads",
    location: "Musanze",
    status: "Resolved",
    date: "Aug 30, 2026",
    time: "03:45 PM",
  },
  {
    id: "RP-2026-0007",
    title: "Fallen tree",
    description: "A tree has fallen on the road after heavy rain...",
    category: "Other",
    location: "Rubavu",
    status: "In Progress",
    date: "Aug 29, 2026",
    time: "02:18 PM",
  },
  {
    id: "RP-2026-0008",
    title: "Traffic light not working",
    description: "The traffic light at the intersection is off...",
    category: "Street Lights",
    location: "Kigali",
    status: "In Progress",
    date: "Aug 28, 2026",
    time: "01:05 PM",
  },
  {
    id: "RP-2026-0009",
    title: "Illegal dumping",
    description: "People are dumping waste in this area...",
    category: "Waste",
    location: "Gasabo",
    status: "Pending",
    date: "Aug 27, 2026",
    time: "11:50 AM",
  },
  {
    id: "RP-2026-0010",
    title: "Broken sidewalk",
    description: "The sidewalk is damaged making it unsafe...",
    category: "Roads",
    location: "Kicukiro",
    status: "In Progress",
    date: "Aug 26, 2026",
    time: "10:30 AM",
  },
];

export default function ReportsList() {
  return (
    <section className="reportsListSection">
      <div className="reportsTableHeader">
        <div className="reportsTableSummary">
          Showing <strong>1–10</strong> of <strong>2,450</strong> reports
        </div>

        <div className="reportsSort">
          <span>Sort by:</span>

          <select defaultValue="newest" aria-label="Sort reports">
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="most-voted">Most Voted</option>
          </select>
        </div>
      </div>

      <ReportsTable reports={REPORTS} />

      <nav className="reportsPagination" aria-label="Reports pagination">
        <button type="button" aria-label="Previous page">&lsaquo;</button>
        <button type="button" aria-current="page">1</button>
        <button type="button">2</button>
        <button type="button">3</button>
        <button type="button">4</button>
        <button type="button">5</button>
        <span>...</span>
        <button type="button">245</button>
        <button type="button" aria-label="Next page">&rsaquo;</button>
      </nav>
    </section>
  );
}