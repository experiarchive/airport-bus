export default function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-slate-50 py-12">
            <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
                <p className="text-sm text-slate-500">
                    © {new Date().getFullYear()} Korea Transit Guide. All rights reserved.
                </p>
                <p className="mt-2 text-xs text-slate-400">
                    Not affiliated with Incheon International Airport or specific bus companies.
                </p>
            </div>
        </footer>
    );
}
