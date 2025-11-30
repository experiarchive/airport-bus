"use client";

import { Search } from "lucide-react";

interface HeroProps {
    onSearch: (term: string) => void;
}

export default function Hero({ onSearch }: HeroProps) {
    return (
        <div className="relative overflow-hidden bg-slate-900 py-16 sm:py-24 lg:py-32">
            <div className="absolute inset-0 opacity-20">
                <div className="absolute -left-4 -top-24 h-96 w-96 rounded-full bg-indigo-500 blur-3xl" />
                <div className="absolute -right-4 bottom-0 h-96 w-96 rounded-full bg-blue-500 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                    Find Your Airport Bus
                    <span className="block text-indigo-400">by Hotel Name</span>
                </h1>
                <p className="mx-auto mt-6 max-w-xl text-lg text-slate-300">
                    Don't get lost in Seoul. Enter your hotel name to find the direct limousine bus from Incheon Airport.
                </p>

                <div className="mt-10 flex justify-center">
                    <div className="relative w-full max-w-lg">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                            <Search className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            onChange={(e) => onSearch(e.target.value)}
                            className="block w-full rounded-2xl border-0 bg-white/10 py-4 pl-11 pr-4 text-white placeholder-slate-400 backdrop-blur-md ring-1 ring-inset ring-white/20 focus:bg-white/20 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            placeholder="Search by hotel name, bus number, or destination..."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
