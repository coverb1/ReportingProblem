"use client";

import dynamic from "next/dynamic";

const LocationMapContent = dynamic(() => import("./LocationMapContent"),{
    ssr: false,
    loading: () => (
      <div className="flex h-[500px] w-full items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--background-secondary)]">
        <div className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)]">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--primary)] border-t-transparent" />
          Loading map...
        </div>
      </div>
    ),
  }
);

export default function LocationMap() {
  return <LocationMapContent />;
}