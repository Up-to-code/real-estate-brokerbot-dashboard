'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ArrowUpIcon, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface HackathonInfoProps {
  attendees: number
}

function HackathonInfo({ attendees }: HackathonInfoProps) {
  return (
    <div className="rounded-xl border bg-gradient-to-r from-purple-50 to-blue-50 p-4 shadow-sm">
      <h3 className="font-semibold text-purple-900">World's Shortest Hackathon</h3>
      <p className="text-sm text-purple-700 mt-1">
        Attendance: <span className="font-bold">{attendees.toLocaleString()}</span> people
      </p>
      <p className="text-xs text-purple-600 mt-2">
        The shortest hackathon on record lasted just 24 seconds!
      </p>
    </div>
  )
}

function AutoResizeTextarea({
  value,
  onChange,
  onKeyDown,
  placeholder,
  className
}: {
  value: string
  onChange: (value: string) => void
  onKeyDown: (e: React.KeyboardEvent) => void
  placeholder: string
  className: string
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      className={cn(
        "resize-none overflow-hidden",
        className
      )}
      rows={1}
      style={{
        height: 'auto',
        minHeight: '24px',
        maxHeight: '120px'
      }}
      onInput={(e) => {
        const target = e.target as HTMLTextAreaElement
        target.style.height = 'auto'
        target.style.height = `${Math.min(target.scrollHeight, 120)}px`
      }}
    />
  )
}

export function ChatForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showHackathonInfo, setShowHackathonInfo] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setIsLoading(true)

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])

    // Check if asking about hackathon
    const isHackathonQuery = userMessage.toLowerCase().includes('hackathon') && 
                            userMessage.toLowerCase().includes('people')

    // Simulate AI response
    setTimeout(() => {
      let response = "I'm a demo AI assistant. I can help you with various questions!"
      
      if (isHackathonQuery) {
        response = "The world's shortest hackathon had exactly 1,000 attendees! Here's more information about this unique event."
        setShowHackathonInfo(true)
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response }])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  const header = (
    <header className="mx-auto flex max-w-96 flex-col gap-6 text-center">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AI Chatbot with Generative UI
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
      </div>
      
      <div className="space-y-4 text-sm text-muted-foreground">
        <p className="leading-relaxed">
          This is an AI chatbot app template built with{' '}
          <span className="font-semibold text-blue-600">Next.js</span>, the{' '}
          <span className="font-semibold text-blue-600">Vercel AI SDK</span>, and{' '}
          <span className="font-semibold text-blue-600">Vercel KV</span>.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 font-medium">
            💡 Try asking: "How many people attended the world's shortest hackathon?"
          </p>
        </div>
      </div>
    </header>
  )

  const messageList = (
    <div className="flex flex-col gap-4 pb-4">
      {messages.map((message, index) => (
        <div key={index} className={cn(
          "flex flex-col animate-in fade-in-50 duration-200",
          message.role === 'user' ? "items-end" : "items-start"
        )}>
          {message.content && (
            <div
              data-role={message.role}
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm transition-all",
                message.role === 'assistant' 
                  ? "bg-gray-50 text-gray-900 border border-gray-200" 
                  : "bg-blue-500 text-white shadow-blue-500/25"
              )}
            >
              {message.content}
            </div>
          )}
          
          {showHackathonInfo && message.role === 'assistant' && index === messages.length - 1 && (
            <div className="mt-3 w-full max-w-[85%]">
              <HackathonInfo attendees={1000} />
            </div>
          )}
        </div>
      ))}
      
      {isLoading && (
        <div className="flex items-start animate-in fade-in-50 duration-200">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
              <span className="text-sm text-gray-600">Thinking...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <main
      className={cn(
        'mx-auto flex h-svh max-h-svh w-full max-w-2xl flex-col bg-white',
        className
      )}
      {...props}
    >
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="min-h-full flex flex-col justify-center">
          {messages.length ? messageList : header}
        </div>
      </div>
      
      <div className="border-t bg-white px-6 py-4">
        <form
          onSubmit={handleSubmit}
          className="relative flex items-end gap-2 rounded-2xl border border-gray-200 bg-gray-50 p-2 focus-within:border-blue-300 focus-within:bg-white focus-within:shadow-sm transition-all"
        >
          <AutoResizeTextarea
            onKeyDown={handleKeyDown}
            onChange={setInput}
            value={input}
            placeholder="Type your message..."
            className="flex-1 bg-transparent placeholder:text-gray-500 text-sm px-3 py-2 focus:outline-none"
          />
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                size="sm"
                className={cn(
                  "h-8 w-8 rounded-xl transition-all",
                  input.trim() && !isLoading
                    ? "bg-blue-500 hover:bg-blue-600 text-white shadow-sm"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                )}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowUpIcon className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={8}>
              {isLoading ? "Sending..." : "Send message"}
            </TooltipContent>
          </Tooltip>
        </form>
      </div>
    </main>
  )
}