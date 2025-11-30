"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import BusCard from "@/components/BusCard";
import SafeAdUnit from "@/components/SafeAdUnit";
import { buses } from "@/data/buses";

import RecentMessages from "@/components/RecentMessages";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  // Filter buses based on search term
  const filteredBuses = buses.filter((bus) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      bus.busNo.toLowerCase().includes(term) ||
      bus.direction.toLowerCase().includes(term) ||
      bus.hotels.some((hotel) => hotel.toLowerCase().includes(term))
    );
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <Hero onSearch={handleSearch} />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Mobile: Collapsible Live Chat (Visible only on mobile) */}
        <div className="mb-8 lg:hidden">
          <button
            onClick={() => setIsMobileChatOpen(!isMobileChatOpen)}
            className="flex w-full items-center justify-between rounded-xl border border-indigo-100 bg-white px-6 py-4 shadow-sm transition-all hover:bg-indigo-50"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <span className="font-bold text-slate-900">Live Traveler Talk</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-5 w-5 text-slate-400 transition-transform ${isMobileChatOpen ? "rotate-180" : ""
                }`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {isMobileChatOpen && (
            <div className="mt-4 animate-fadeIn">
              <RecentMessages />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Bus Search Results (8/12) */}
          <div id="bus-results" className="lg:col-span-8">
            {searchTerm && (
              <div
                className="mb-8 cursor-pointer rounded-xl bg-indigo-50 p-4 text-center ring-1 ring-indigo-100 transition-colors hover:bg-indigo-100"
                onClick={() => {
                  const element = document.getElementById("bus-results");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
              >
                <p className="text-lg text-indigo-900">
                  🔍 Found <span className="font-bold">{filteredBuses.length}</span> routes for{" "}
                  <span className="font-bold">"{searchTerm}"</span>
                </p>
                <p className="mt-1 text-xs text-indigo-500">Click to view results</p>
              </div>
            )}

            <SafeAdUnit />

            <div className="space-y-6">
              {filteredBuses.length > 0 ? (
                filteredBuses.map((bus, index) => (
                  <div key={bus.id}>
                    <BusCard bus={bus} searchTerm={searchTerm} />
                    {/* Insert Ad after the first item */}
                    {index === 0 && <SafeAdUnit />}
                  </div>
                ))
              ) : (
                <div className="py-12 text-center">
                  <h3 className="text-lg font-medium text-slate-900">No buses found</h3>
                  <p className="mt-2 text-slate-500">
                    Try searching for a district name (e.g., "Gangnam") or a major landmark.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Live Traveler Talk (Visible only on Desktop) */}
          <div className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-8">
              <RecentMessages />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
