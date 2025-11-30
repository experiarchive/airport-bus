"use client";

import { useEffect } from "react";

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

export default function SafeAdUnit() {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error("AdSense error:", err);
        }
    }, []);

    return (
        <div className="my-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <div className="bg-slate-100 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-slate-500">
                Advertisement
            </div>
            <div className="flex min-h-[250px] items-center justify-center bg-white p-4">
                <ins
                    className="adsbygoogle"
                    style={{ display: "block", width: "100%" }}
                    data-ad-client="ca-pub-3505313580947440"
                    data-ad-slot="4057803691"
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                />
            </div>
        </div>
    );
}
