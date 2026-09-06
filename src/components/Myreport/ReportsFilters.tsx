"use client";

import { Plus, Search, SlidersHorizontal } from "lucide-react";

export default function ReportsFilters() {
  return (
    <section className="reportsFilters">
      <div className="reportsFilterMainRow">
        <div className="reportsFilterSearch">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search reports by title, location or description..."
            aria-label="Search reports"
          />
        </div>

        <button type="button" className="reportsReportButton">
          <Plus size={15} />
          Report a Problem
        </button>
      </div>

      <div className="reportsFilterRow">
        <div className="reportsFilterField">
        <select defaultValue="" aria-label="Filter by category">
          <option value="" disabled>
            All Categories
          </option>
          <option value="roads">Roads & Infrastructure</option>
          <option value="water">Water & Sanitation</option>
          <option value="electricity">Electricity</option>
          <option value="waste">Waste Management</option>
          <option value="safety">Public Safety</option>
        </select>
        </div>

        <div className="reportsFilterField">
        <select defaultValue="" aria-label="Filter by status">
          <option value="" disabled>
            All Status
          </option>
          <option value="gasabo">Gasabo</option>
          <option value="nyarugenge">Nyarugenge</option>
          <option value="kicukiro">Kicukiro</option>
        </select>
        </div>

        <div className="reportsFilterField">
        <select defaultValue="" aria-label="Filter by district">
          <option value="" disabled>
            All Districts
          </option>
          <option value="pending">Pending Review</option>
          <option value="review">Under Review</option>
          <option value="accepted">Accepted</option>
          <option value="progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
        </div>

        <div className="reportsFilterField">
        <select defaultValue="" aria-label="Filter by date range">
          <option value="" disabled>Date Range</option>
          <option value="week">This week</option>
          <option value="month">This month</option>
          <option value="year">This year</option>
        </select>
        </div>

        <button type="button" className="reportsFilterReset">
          <SlidersHorizontal size={14} />
          Clear filters
        </button>
      </div>
    </section>
  );
}