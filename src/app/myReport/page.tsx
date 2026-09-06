import ReportsFilters from "@/src/components/Myreport/ReportsFilters";
import ReportsHero from "@/src/components/Myreport/ReportsHero";
import ReportsList from "@/src/components/Myreport/ReportsList";
import ReportsStats from "@/src/components/Myreport/ReportsStats";
import "@/src/components/Myreport/ReportsDashboard.css";
import Footer from "@/src/components/LandingPage/Footer";

export default function MyReportPage() {
  return (
    <>
      <main className="reportsPage">
        <div className="reportsContainer">
          <ReportsHero />
          <ReportsStats />
          <ReportsFilters />
          <ReportsList />
        </div>
      </main>
      <div>
        <Footer />
      </div>
    </>
  );
}