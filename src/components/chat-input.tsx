import { useState, KeyboardEvent, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ 
  onSendMessage, 
  disabled = false, 
  placeholder = "Send a message..." 
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSendMessage = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage && !disabled) {
      onSendMessage(trimmedMessage);
      setMessage("");
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    const scrollHeight = Math.min(textarea.scrollHeight, 120); // Max height
    textarea.style.height = `${scrollHeight}px`;
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Voice recording functionality would go here
  };

  return (
    <div className="border-t border-border/30 glass-heavy neural-bg p-4 relative">
      {/* Ambient glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-50"></div>
      
      <div className="mx-auto max-w-4xl relative z-10">
        <div className="relative flex items-end gap-3 rounded-2xl border border-border/30 glass-heavy p-4 shadow-lg hover-neural">
          {/* Subtle glow around input area */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-primary-glow/10 rounded-2xl blur opacity-0 hover:opacity-100 transition duration-300"></div>
          
          {/* Attachment Button */}
          <Button
            variant="ghost"
            size="icon"
            className="relative h-10 w-10 text-muted-foreground hover:text-primary hover-neural"
            disabled={disabled}
          >
            <Paperclip className="h-4 w-4" />
          </Button>

          {/* Message Input */}
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyPress}
              placeholder={placeholder}
              disabled={disabled}
              className={cn(
                "min-h-[20px] max-h-[120px] resize-none border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/70",
                "scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent"
              )}
              style={{ height: 'auto' }}
            />
          </div>

          {/* Voice Recording Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleRecording}
            className={cn(
              "relative h-10 w-10 transition-all duration-300 hover-neural",
              isRecording 
                ? "text-red-500 hover:text-red-600 animate-pulse" 
                : "text-muted-foreground hover:text-primary"
            )}
            disabled={disabled}
          >
            <Mic className="h-4 w-4" />
          </Button>

          {/* Enhanced Send Button */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary-glow rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
              <Button
                onClick={handleSendMessage}
                disabled={disabled || !message.trim()}
                size="icon"
                variant={message.trim() ? "modern" : "ghost"}
                className={cn(
                  "relative h-10 w-10 transition-all duration-300",
                  !message.trim() && "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-3 text-center">
          <p className="text-xs text-muted-foreground/80">
            Press <kbd className="px-1.5 py-0.5 text-xs bg-muted/50 rounded">Enter</kbd> to send • <kbd className="px-1.5 py-0.5 text-xs bg-muted/50 rounded">Shift+Enter</kbd> for new line
          </p>
        </div>
      </div>
    </div>
  );
}