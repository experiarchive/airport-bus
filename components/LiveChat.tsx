"use client";

import { useState, useEffect, useRef } from "react";
import { Send, User, MessageCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Message {
    id: number;
    created_at: string;
    nickname: string;
    content: string;
    bus_no: string;
    direction: string;
}

interface LiveChatProps {
    busNo: string;
    direction: string;
}

export default function LiveChat({ busNo, direction }: LiveChatProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [nickname, setNickname] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Load initial messages and subscribe to changes
    useEffect(() => {
        const fetchMessages = async () => {
            setIsLoading(true);
            const { data, error } = await supabase
                .from("messages")
                .select("*")
                .eq("bus_no", busNo)
                .eq("direction", direction)
                .order("created_at", { ascending: true });

            if (!error && data) {
                setMessages(data);
            }
            setIsLoading(false);
        };

        fetchMessages();

        // Realtime subscription
        const channel = supabase
            .channel(`chat:${busNo}:${direction}`)
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "messages",
                    filter: `bus_no=eq.${busNo} AND direction=eq.${direction}`,
                },
                (payload) => {
                    setMessages((prev) => [...prev, payload.new as Message]);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [busNo, direction]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !nickname.trim()) return;

        const messageToSend = {
            nickname: nickname.trim(),
            content: newMessage.trim(),
            bus_no: busNo,
            direction: direction,
        };

        // Optimistic update (optional, but good for UX)
        // setMessages((prev) => [...prev, { ...messageToSend, id: Date.now(), created_at: new Date().toISOString() }]);

        const { error } = await supabase.from("messages").insert([messageToSend]);

        if (error) {
            console.error("Error sending message:", error);
            alert("Failed to send message. Please try again.");
        } else {
            setNewMessage("");
        }
    };

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

    return (
        <div className="flex h-[400px] flex-col rounded-xl border border-slate-200 bg-slate-50">
            {/* Header */}
            <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-4 py-3">
                <MessageCircle className="h-5 w-5 text-indigo-600" />
                <h3 className="font-semibold text-slate-800">Live Chat</h3>
                <span className="ml-auto text-xs text-slate-400">
                    {messages.length} messages
                </span>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {isLoading ? (
                    <div className="flex h-full items-center justify-center text-slate-400">
                        Loading...
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center text-center text-slate-400">
                        <MessageCircle className="mb-2 h-8 w-8 opacity-20" />
                        <p className="text-sm">No messages yet.</p>
                        <p className="text-xs">Be the first to say hello!</p>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <div key={msg.id} className="flex flex-col gap-1">
                            <div className="flex items-baseline gap-2">
                                <span className="text-sm font-bold text-slate-700">
                                    {msg.nickname}
                                </span>
                                <span className="text-[10px] text-slate-400">
                                    {formatTime(msg.created_at)}
                                </span>
                            </div>
                            <div className="w-fit max-w-[85%] rounded-lg rounded-tl-none bg-white px-3 py-2 text-sm text-slate-700 shadow-sm ring-1 ring-slate-100">
                                {msg.content}
                            </div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form
                onSubmit={handleSendMessage}
                className="border-t border-slate-200 bg-white p-3"
            >
                <div className="mb-2 flex gap-2">
                    <div className="relative w-1/3">
                        <User className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Nickname"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            className="w-full rounded-md border border-slate-200 bg-slate-50 py-1.5 pl-7 pr-2 text-xs focus:border-indigo-500 focus:outline-none"
                            required
                        />
                    </div>
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                        required
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim() || !nickname.trim()}
                        className="flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-white transition-colors hover:bg-indigo-700 disabled:bg-slate-300"
                    >
                        <Send className="h-4 w-4" />
                    </button>
                </div>
            </form>
        </div>
    );
}
