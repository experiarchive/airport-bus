import Link from "next/link";
import { Bus } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                        <Bus className="h-5 w-5" />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-slate-900">
                        Korea Transit Guide
                    </span>
                </Link>
            </div>
        </nav>
    );
}
