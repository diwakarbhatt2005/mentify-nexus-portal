import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Copy, ThumbsUp, ThumbsDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    role: "user" | "assistant";
    timestamp: string;
    model?: string;
  };
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={cn(
      "group flex gap-4 px-6 py-8 hover:bg-muted/10 transition-all duration-300",
      message.role === "user" ? "justify-end" : "justify-start"
    )}>
      {message.role === "assistant" && (
        <Avatar className="h-9 w-9 border-2 border-primary/30 hover-neural">
          <AvatarFallback className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground text-sm font-bold">
            AI
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn(
        "flex flex-col gap-3 max-w-[80%] md:max-w-[70%]",
        message.role === "user" ? "items-end" : "items-start"
      )}>
        <div className={cn(
          "rounded-2xl px-5 py-4 shadow-sm hover-neural transition-all duration-300",
          message.role === "user" 
            ? "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-lg" 
            : "glass border border-border/30 bg-card/40 text-card-foreground"
        )}>
          <div className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{formatTime(message.timestamp)}</span>
          {message.model && message.role === "assistant" && (
            <>
              <span>•</span>
              <span>{message.model}</span>
            </>
          )}
        </div>

        {message.role === "assistant" && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              onClick={copyToClipboard}
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
            >
              <Copy className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-green-600"
            >
              <ThumbsUp className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-red-600"
            >
              <ThumbsDown className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>

      {message.role === "user" && (
        <Avatar className="h-9 w-9 border-2 border-primary/30 hover-neural">
          <AvatarFallback className="bg-gradient-to-br from-primary-glow to-primary text-primary-foreground text-sm font-bold">
            You
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}