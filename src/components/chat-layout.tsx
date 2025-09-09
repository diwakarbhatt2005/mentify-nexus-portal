import { useState, useRef, useEffect } from "react";
import { ChatHeader } from "./chat-header";
import { ChatSidebar } from "./chat-sidebar";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles } from "lucide-react";
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
    <div className="flex h-screen bg-background neural-bg relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 mesh-bg opacity-20"></div>
      
      <ChatSidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
      />
      
      <div className="flex flex-1 flex-col overflow-hidden relative z-10">
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
                <div className="flex flex-col items-center justify-center h-full py-16 text-center relative">
                  {/* Floating elements */}
                  <div className="absolute top-20 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-pulse"></div>
                  <div className="absolute top-32 right-1/3 w-1 h-1 bg-primary-glow/40 rounded-full animate-pulse delay-300"></div>
                  <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-primary/20 rounded-full animate-pulse delay-700"></div>
                  
                  <div className="relative mb-12 group">
                    <div className="absolute -inset-8 bg-gradient-to-r from-primary/20 via-primary-glow/30 to-primary/20 rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition duration-500"></div>
                    <img 
                      src={mentifyLogo} 
                      alt="Mentify-AI" 
                      className="relative w-24 h-24 object-contain floating"
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-center gap-3">
                      <h2 className="text-4xl font-bold gradient-text">Welcome to Mentify-AI</h2>
                      <Sparkles className="h-6 w-6 text-primary animate-pulse" />
                    </div>
                    <p className="text-xl font-semibold text-primary/80 mb-4">Best Buddy's</p>
                    <div className="card-modern p-8 max-w-2xl backdrop-blur-xl">
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        Your intelligent companion powered by advanced AI. Experience seamless conversations, 
                        get instant answers, and unlock endless possibilities. Start your journey into the future of AI interaction.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-0 relative">
                  {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Enhanced scroll to bottom button */}
          {!isAtBottom && (
            <div className="absolute bottom-24 right-6 group">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary to-primary-glow rounded-full blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
              <Button
                onClick={scrollToBottom}
                size="icon"
                variant="modern"
                className="relative h-12 w-12 rounded-full shadow-2xl"
              >
                <ArrowDown className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
        
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}