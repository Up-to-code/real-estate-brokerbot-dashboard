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

const ChatScreen = ({params}: {params: {id: string}}) => {
    console.log(params.id);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hey there! How can I help you today?",
      sender: "assistant",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      text: "I need help with setting up my dashboard",
      sender: "user",
      timestamp: "10:32 AM",
    },
    {
      id: 3,
      text: "I'd be happy to help you with that! What specific part of the dashboard are you working on?",
      sender: "assistant",
      timestamp: "10:33 AM",
    },
  ]);

  const [newMessage, setNewMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ): void => {
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
      setMessages([...messages, message]);
      setNewMessage("");

      // Simulate assistant response
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
    }
  };

  return (
    <DashboardLayout>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <MessageCircle size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">AI Assistant</h3>
                  <p className="text-sm text-green-500">● Online</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-lg hover:bg-gray-100">
                  <Search size={20} className="text-gray-600" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100">
                  <Phone size={20} className="text-gray-600" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100">
                  <Video size={20} className="text-gray-600" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100">
                  <MoreVertical size={20} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message: Message) => (
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
            ))}
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
