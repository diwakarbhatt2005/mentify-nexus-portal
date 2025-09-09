import { useState, useRef, useEffect } from "react";
import { ChatHeader } from "./chat-header";
import { ChatSidebar } from "./chat-sidebar";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import mentifyLogo from "@/assets/mentify-logo.png";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: string;
  model?: string;
}

const welcomeMessage: Message = {
  id: "welcome",
  content: "Hello! I'm Mentify-AI, your intelligent companion. I'm here to help you with a wide range of tasks, from answering questions to creative writing, code assistance, and much more. How can I assist you today?",
  role: "assistant",
  timestamp: new Date().toISOString(),
  model: "Mentify 3"
};

export function ChatLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("mentify-3");
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = () => {
    if (scrollAreaRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setIsAtBottom(isNearBottom);
    }
  };

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages, isAtBottom]);

  const getModelName = (modelValue: string) => {
    const modelMap: Record<string, string> = {
      "mentify-1": "Mentify 1",
      "mentify-2": "Mentify 2", 
      "mentify-3": "Mentify 3",
      "mentuf-4": "Mentuf 4"
    };
    return modelMap[modelValue] || "Mentify 3";
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      role: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I understand your question. Let me help you with that...",
        "That's an interesting point! Here's what I think about it...",
        "Great question! Based on my knowledge, I can provide you with the following insights...",
        "I'd be happy to assist you with that. Let me break this down for you...",
        "Thank you for your message. Here's a comprehensive response to your inquiry..."
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: randomResponse + " " + content.split(" ").reverse().join(" ") + ".",
        role: "assistant",
        timestamp: new Date().toISOString(),
        model: getModelName(selectedModel)
      };

      setMessages(prev => [...prev, assistantMessage]);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
      />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <ChatHeader
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
        />
        
        <div className="flex-1 relative overflow-hidden">
          <ScrollArea 
            ref={scrollAreaRef}
            className="h-full custom-scrollbar"
            onScrollCapture={handleScroll}
          >
            <div className="mx-auto max-w-4xl">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <div className="relative mb-8">
                    <img 
                      src={mentifyLogo} 
                      alt="Mentify-AI" 
                      className="w-20 h-20 object-contain animate-glow-pulse"
                    />
                  </div>
                  <h2 className="text-3xl font-bold mb-3 gradient-text">Welcome to Mentify-AI</h2>
                  <p className="text-lg font-medium mb-2">Best Buddy's</p>
                  <p className="text-muted-foreground max-w-md leading-relaxed">
                    Your intelligent companion is ready to help. Start a conversation by typing a message below.
                  </p>
                </div>
              ) : (
                <div className="space-y-0">
                  {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Scroll to bottom button */}
          {!isAtBottom && (
            <Button
              onClick={scrollToBottom}
              size="icon"
              variant="outline"
              className="absolute bottom-20 right-6 h-10 w-10 rounded-full shadow-lg hover-glow"
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}