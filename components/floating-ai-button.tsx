"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, X, Send, Sparkles, Loader } from "lucide-react"

interface Message {
  id: string
  text: string
  isUser: boolean
}

// --- AI Configuration ---
const API_KEY = process.env.NEXT_PUBLIC_AI_STUDIO_API_KEY
console.log("API Key Loaded:", API_KEY); // Diagnostic log
 
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent"

const SYSTEM_PROMPT = `You are "La Shiny AI Assistant," an expert and friendly skincare advisor for the luxury brand La Shiny. Your personality is elegant, helpful, and knowledgeable. Your primary goal is to assist users with their skincare needs and guide them towards the perfect La Shiny products. Your knowledge base is focused on the La Shiny product line: Radiance Renewal Serum ($189), Golden Glow Face Mask ($145), Platinum Eye Cream ($210), and Diamond Brightening Essence ($165). Always be polite, luxurious, and confident in your responses. If a question is outside your scope, politely state that you are a specialized skincare assistant and guide the conversation back to skincare.`
// --- End of AI Configuration ---

export function FloatingAIButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
 const [messages, setMessages] = useState<Message[]>([
   {
     id: "1",
     text: `Hello! I'm your personal skincare assistant from <b>La Shiny</b>. How can I assist you today?`,
     isUser: false,
   },
 ]);
  const [inputValue, setInputValue] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const lastMessageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    const userInput = inputValue.trim()
    if (!userInput || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: userInput,
      isUser: true,
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInputValue("")
    setIsLoading(true)

    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: updatedMessages.map((msg) => ({
            role: msg.isUser ? "user" : "model",
            parts: [{ text: msg.text }],
          })),
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process that. Please try again."

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiText,
        isUser: false,
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("AI API call failed:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        isUser: false,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 ${
          isOpen ? "scale-0" : "scale-100"
        }`}
      >
        <MessageCircle className='w-6 h-6' />
      </Button>

      {isOpen && (
        <Card className='fixed bottom-6 right-6 z-50 w-80 h-[450px] shadow-2xl border-0 bg-white/95 backdrop-blur-sm flex flex-col'>
          <CardHeader className='bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-t-lg p-4 flex-shrink-0'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <Sparkles className='w-5 h-5' />
                <CardTitle className='text-sm font-medium'>
                  Skincare Assistant
                </CardTitle>
              </div>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setIsOpen(false)}
                className='text-white hover:bg-white/20 p-1 h-auto'
              >
                <X className='w-4 h-4' />
              </Button>
            </div>
          </CardHeader>

          <CardContent className='p-0 flex-1 flex flex-col min-h-0'>
            <ScrollArea className='flex-1 p-4' ref={scrollAreaRef}>
              <div className='space-y-4'>
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    ref={index === messages.length - 1 ? lastMessageRef : null}
                    className={`flex ${
                      message.isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-lg text-sm shadow-sm ${
                        message.isUser
                          ? "bg-gradient-to-r from-amber-500 to-rose-500 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                      style={{ wordBreak: "break-word" }}
                    >
                      <p dangerouslySetInnerHTML={{ __html: message.text }}></p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className='flex justify-start'>
                    <div className='bg-gray-100 text-gray-800 p-3 rounded-lg shadow-sm'>
                      <Loader className='w-5 h-5 animate-spin' />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className='p-4 border-t border-gray-200 flex-shrink-0'>
              <div className='flex space-x-2'>
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder='Ask about skincare...'
                  className='flex-1 border-amber-200 focus:border-amber-400'
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  size='icon'
                  className='bg-gradient-to-r from-amber-500 to-rose-500 text-white'
                  disabled={isLoading}
                >
                  <Send className='w-4 h-4' />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}