"use client";

import { useState, useEffect } from "react";
import { MessageCircle, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Message {
    id: number;
    created_at: string;
    nickname: string;
    content: string;
    bus_no: string;
    direction: string;
}

export default function RecentMessages() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMessages = async () => {
            setIsLoading(true);
            const { data, error } = await supabase
                .from("messages")
                .select("*")
                .order("created_at", { ascending: false })
                .limit(5);

            if (!error && data) {
                setMessages(data);
            }
            setIsLoading(false);
        };

        fetchMessages();

        // Realtime subscription for ANY new message
        const channel = supabase
            .channel("public:messages")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "messages",
                },
                (payload) => {
                    setMessages((prev) => [payload.new as Message, ...prev].slice(0, 5));
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    // Format relative time
    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) return "Just now";
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return date.toLocaleDateString();
    };

    if (isLoading || messages.length === 0) return null;

    return (
        <div className="w-full">
            <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                        <MessageCircle className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Live Traveler Talk</h3>
                </div>

                <div className="flex flex-col gap-3">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className="group relative flex flex-col gap-2 rounded-xl border border-slate-100 bg-slate-50 p-4 transition-all hover:border-indigo-200 hover:bg-indigo-50/30 hover:shadow-md"
                        >
                            <div className="flex items-center justify-between">
                                <span className="rounded-md bg-indigo-100 px-2 py-1 text-xs font-bold text-indigo-700">
                                    Bus {msg.bus_no}
                                </span>
                                <span className="text-xs text-slate-400">
                                    {formatTime(msg.created_at)}
                                </span>
                            </div>
                            <p className="line-clamp-2 text-sm text-slate-700">
                                <span className="font-semibold text-slate-900">{msg.nickname}:</span>{" "}
                                {msg.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
