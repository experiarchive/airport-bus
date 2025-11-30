"use client";

import { useState, useEffect } from "react";
import { X, MapPin, Clock, ChevronRight } from "lucide-react";
import { timetable, StationTimetable } from "@/data/timetable";

interface TimetableModalProps {
    busNo: string;
    direction: string;
    onClose: () => void;
}

export default function TimetableModal({ busNo, direction, onClose }: TimetableModalProps) {
    const [selectedStation, setSelectedStation] = useState<StationTimetable | null>(null);
    const [currentTime, setCurrentTime] = useState("");

    const routeData = timetable[busNo]?.[direction] || [];

    useEffect(() => {
        // Set initial selected station to the first one
        if (routeData.length > 0) {
            setSelectedStation(routeData[0]);
        }

        // Update current time
        const updateTime = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, "0");
            const minutes = String(now.getMinutes()).padStart(2, "0");
            setCurrentTime(`${hours}:${minutes}`);
        };

        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, [busNo, direction]);

    const getNextBusTime = (times: string[]) => {
        if (!currentTime) return null;
        return times.find(time => time >= currentTime) || times[0]; // Wrap around to first bus if late
    };

    if (!routeData.length) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="flex h-[80vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Bus {busNo} Timetable</h2>
                        <p className="text-sm text-slate-500">{direction}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
                    {/* Sidebar (Stations List) */}
                    <div className="h-1/3 w-full overflow-y-auto border-b border-slate-100 bg-slate-50 md:h-auto md:w-1/3 md:border-b-0 md:border-r">
                        {routeData.map((station, index) => (
                            <button
                                key={station.stationName}
                                onClick={() => setSelectedStation(station)}
                                className={`flex w-full items-center gap-3 px-6 py-4 text-left transition-colors ${selectedStation?.stationName === station.stationName
                                    ? "bg-white text-indigo-600 ring-1 ring-inset ring-indigo-50"
                                    : "text-slate-600 hover:bg-slate-100"
                                    }`}
                            >
                                <div className="flex flex-col items-center gap-1">
                                    <div className={`h-3 w-3 rounded-full border-2 ${selectedStation?.stationName === station.stationName
                                        ? "border-indigo-600 bg-indigo-600"
                                        : "border-slate-300 bg-white"
                                        }`} />
                                    {index !== routeData.length - 1 && (
                                        <div className="h-full w-0.5 bg-slate-200" />
                                    )}
                                </div>
                                <span className={`text-sm font-medium ${selectedStation?.stationName === station.stationName ? "font-bold" : ""
                                    }`}>
                                    {station.stationName}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Main Content (Times & Map) */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {selectedStation && (
                            <div className="space-y-8">
                                <div>
                                    <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                                        <MapPin className="h-5 w-5 text-indigo-500" />
                                        {selectedStation.stationName}
                                    </h3>
                                    <a
                                        href={selectedStation.locationUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
                                    >
                                        View Boarding Location on Map <ChevronRight className="h-4 w-4" />
                                    </a>
                                </div>

                                <div className="rounded-xl bg-indigo-50 p-4 ring-1 ring-indigo-100">
                                    <div className="flex items-center gap-3">
                                        <Clock className="h-5 w-5 text-indigo-600" />
                                        <div>
                                            <p className="text-sm font-medium text-indigo-900">Next Bus</p>
                                            <p className="text-2xl font-bold text-indigo-600">
                                                {getNextBusTime(selectedStation.times) || "End of Service"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="mb-4 text-sm font-semibold text-slate-900">Full Schedule</h4>
                                    <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8">
                                        {selectedStation.times.map((time) => {
                                            const isNext = time === getNextBusTime(selectedStation.times);
                                            return (
                                                <div
                                                    key={time}
                                                    className={`rounded-lg px-2 py-1.5 text-center text-sm font-medium whitespace-nowrap ${isNext
                                                        ? "bg-indigo-600 text-white shadow-md ring-2 ring-indigo-200"
                                                        : "bg-slate-100 text-slate-600"
                                                        }`}
                                                >
                                                    {time}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
