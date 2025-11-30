"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Star, Clock, CreditCard, MessageCircle } from "lucide-react";
import { Bus } from "@/data/buses";
import SafeAdUnit from "./SafeAdUnit";
import TimetableModal from "./TimetableModal";
import LiveChat from "./LiveChat";

interface BusCardProps {
    bus: Bus;
    searchTerm: string;
}

export default function BusCard({ bus, searchTerm }: BusCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isTimetableOpen, setIsTimetableOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);

    const highlightMatch = (text: string) => {
        if (!searchTerm) return false;
        return text.toLowerCase().includes(searchTerm.toLowerCase());
    };

    return (
        <article className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg transition-all hover:shadow-xl">
            <div
                className="cursor-pointer p-6"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex min-h-14 min-w-14 flex-col items-center justify-center rounded-xl bg-indigo-50 px-2 py-1 text-indigo-600">
                            <span className="text-2xl font-black">
                                {bus.busNo.match(/^(\d+)/)?.[0] || bus.busNo}
                            </span>
                            {bus.busNo.match(/\((.*?)\)/) && (
                                <span className="text-[10px] font-bold uppercase leading-none">
                                    {bus.busNo.match(/\((.*?)\)/)?.[1]}
                                </span>
                            )}
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">{bus.direction}</h3>
                            <div className="mt-1 flex items-center gap-3 text-sm text-slate-500">
                                <span className="flex items-center gap-1">
                                    <CreditCard className="h-4 w-4" /> {bus.price}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" /> {bus.interval}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button className="rounded-full p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-600">
                        {isOpen ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
                    </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    {bus.hotels.map((hotel) => (
                        <span
                            key={hotel}
                            className={`rounded-full px-3 py-1 text-xs font-medium ${highlightMatch(hotel)
                                ? "bg-yellow-100 text-yellow-800 ring-1 ring-yellow-400"
                                : "bg-slate-100 text-slate-600"
                                }`}
                        >
                            {hotel}
                        </span>
                    ))}
                </div>
            </div>

            {isOpen && (
                <div className="animate-fadeIn border-t border-slate-100 bg-slate-50/50 px-6 py-6">
                    <div className="mb-6">
                        <h4 className="mb-2 text-sm font-semibold text-slate-900">Description</h4>
                        <p className="text-sm leading-relaxed text-slate-600">{bus.description}</p>
                    </div>

                    <div className="mb-6 rounded-xl bg-yellow-50 p-4 ring-1 ring-yellow-200">
                        <div className="flex items-start gap-3">
                            <Star className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-500 fill-yellow-500" />
                            <div>
                                <h4 className="text-sm font-bold text-yellow-800">Captain's Tip</h4>
                                <p className="mt-1 text-sm text-yellow-700">{bus.captainTip}</p>
                            </div>
                        </div>
                    </div>

                    <SafeAdUnit />

                    <div className="mt-6 flex flex-wrap justify-end gap-3">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsChatOpen(!isChatOpen);
                            }}
                            className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-indigo-600 shadow-md ring-1 ring-inset ring-indigo-100 transition-all hover:bg-indigo-50 hover:shadow-lg"
                        >
                            <MessageCircle className="h-4 w-4" />
                            {isChatOpen ? "Hide Chat" : "Live Chat"}
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsTimetableOpen(true);
                            }}
                            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-indigo-700 hover:shadow-lg"
                        >
                            <Clock className="h-4 w-4" />
                            View Timetable & Locations
                        </button>
                    </div>

                    {isChatOpen && (
                        <div className="mt-6">
                            <LiveChat busNo={bus.busNo} direction={bus.direction} />
                        </div>
                    )}
                </div>
            )}

            {isTimetableOpen && (
                <TimetableModal
                    busNo={bus.busNo}
                    direction={bus.direction}
                    onClose={() => setIsTimetableOpen(false)}
                />
            )}
        </article>
    );
}
