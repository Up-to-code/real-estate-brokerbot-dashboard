"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  MessageCircle,
  Search,
  MoreVertical,
  Phone,
  Video,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

interface Message {
  id: number;
  text: string;
  sender: "user" | "assistant";
  timestamp: string;
}

interface ApiMessage {
  id: string;
  text: string;
  clientId: string;
  isBot: boolean;
  createdAt: string;
  updatedAt: string;
  whatsappMessageId?: string;
  status: string;
  sentAt: string;
}

interface ApiResponse {
  messages: ApiMessage[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

const ChatScreen = ({params}: {params: {id: string}}) => {
    console.log(params.id);
    
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/${params.id}/messages`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data: ApiResponse = await response.json();
                
                // Transform API messages to component Message format
                const transformedMessages: Message[] = data.messages.map((apiMessage, index) => ({
                    id: index + 1, // or use a hash of apiMessage.id if you prefer
                    text: apiMessage.text,
                    sender: apiMessage.isBot ? "assistant" : "user",
                    timestamp: new Date(apiMessage.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })
                }));
                
                setMessages(transformedMessages);
            } catch (err) {
                console.error('Error fetching messages:', err);
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };
        
        fetchMessages();
    }, [params.id]);

    const scrollToBottom = (): void => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (
        e:
            | React.MouseEvent<HTMLButtonElement>
            | React.KeyboardEvent<HTMLInputElement>
    ): Promise<void> => {
        e.preventDefault();
        if (newMessage.trim()) {
            const message: Message = {
                id: messages.length + 1,
                text: newMessage,
                sender: "user",
                timestamp: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            };
            
            // Add user message immediately
            setMessages(prev => [...prev, message]);
            const messageText = newMessage;
            setNewMessage("");

            try {
                // Send message to API
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/${params.id}/messages`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        text: messageText,
                        isBot: false
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to send message');
                }

                // Simulate assistant response (you might want to replace this with actual API call)
                setTimeout(() => {
                    const assistantMessage: Message = {
                        id: messages.length + 2,
                        text: "Thanks for your message! I'm processing your request...",
                        sender: "assistant",
                        timestamp: new Date().toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        }),
                    };
                    setMessages((prev) => [...prev, assistantMessage]);
                }, 1000);
            } catch (err) {
                console.error('Error sending message:', err);
                // Optionally show error to user
            }
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex h-screen bg-gray-50 items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading messages...</p>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout>
                <div className="flex h-screen bg-gray-50 items-center justify-center">
                    <div className="text-center">
                        <p className="text-red-600 mb-4">Error loading messages:</p>
                        <p className="text-gray-600">{error}</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="flex h-screen bg-gray-50">
                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col">
  

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.length === 0 ? (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-gray-500">No messages yet. Start a conversation!</p>
                            </div>
                        ) : (
                            messages.map((message: Message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${
                                        message.sender === "user" ? "justify-end" : "justify-start"
                                    }`}
                                >
                                    <div
                                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                            message.sender === "user"
                                                ? "bg-blue-500 text-white"
                                                : "bg-white border border-gray-200 text-gray-800"
                                        }`}
                                    >
                                        <p className="text-sm mb-1">{message.text}</p>
                                        <p
                                            className={`text-xs ${
                                                message.sender === "user"
                                                    ? "text-blue-100"
                                                    : "text-gray-500"
                                            }`}
                                        >
                                            {message.timestamp}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Message Input */}
                    <div className="bg-white border-t border-gray-200 p-4">
                        <div className="flex items-center space-x-2">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setNewMessage(e.target.value)
                                    }
                                    onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) =>
                                        e.key === "Enter" && handleSendMessage(e)
                                    }
                                    placeholder="Type your message..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <button
                                onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                                    handleSendMessage(e)
                                }
                                disabled={!newMessage.trim()}
                                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-3 rounded-lg transition-colors"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ChatScreen;