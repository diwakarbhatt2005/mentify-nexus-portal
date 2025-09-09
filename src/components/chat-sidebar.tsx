import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, MessageSquare, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  title: string;
  timestamp: string;
  model: string;
}

interface ChatSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

// Mock chat history data
const mockHistory: ChatMessage[] = [
  {
    id: "1",
    title: "The Evolution and Impact of AI Chat Applications",
    timestamp: "2024-01-15T10:30:00Z",
    model: "Mentify 3"
  },
  {
    id: "2", 
    title: "Weather Inquiry for San Francisco",
    timestamp: "2024-01-15T09:15:00Z",
    model: "Mentify 2"
  },
  {
    id: "3",
    title: "User Inquiry about React Components",
    timestamp: "2024-01-14T14:22:00Z",
    model: "Mentify 1"
  },
  {
    id: "4",
    title: "Creative Writing Assistant",
    timestamp: "2024-01-14T11:45:00Z",
    model: "Mentuf 4"
  },
  {
    id: "5",
    title: "Code Review and Optimization",
    timestamp: "2024-01-13T16:30:00Z",
    model: "Mentify 3"
  }
];

export function ChatSidebar({ isOpen, onToggle, className }: ChatSidebarProps) {
  const [history, setHistory] = useState<ChatMessage[]>(mockHistory);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInDays < 7) {
      return `${Math.floor(diffInDays)}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const deleteChat = (id: string) => {
    setHistory(prev => prev.filter(chat => chat.id !== id));
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-50 h-full w-80 transform border-r border-sidebar-border/30 glass-heavy transition-transform duration-300 ease-in-out md:relative md:z-auto md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
        className
      )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-18 items-center justify-between border-b border-sidebar-border/30 px-6 glass">
            <h2 className="text-lg font-bold text-sidebar-foreground gradient-text">Chat History</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={clearHistory}
              className="text-sidebar-foreground hover:bg-sidebar-accent hover-neural"
              disabled={history.length === 0}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          {/* New Chat Button */}
          <div className="p-4 border-b border-sidebar-border/30">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary-glow rounded-lg blur opacity-10 group-hover:opacity-30 transition duration-300"></div>
              <Button variant="modern" className="relative w-full justify-start gap-2 shadow-lg">
                <Plus className="h-4 w-4" />
                New Chat
              </Button>
            </div>
          </div>

          {/* Chat History */}
          <ScrollArea className="flex-1 p-2">
            <div className="space-y-2">
              {history.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <MessageSquare className="h-12 w-12 text-sidebar-foreground/30 mb-4" />
                  <p className="text-sm text-sidebar-foreground/60">No chat history yet</p>
                  <p className="text-xs text-sidebar-foreground/40">Start a conversation to see it here</p>
                </div>
              ) : (
                history.map((chat) => (
                  <div
                    key={chat.id}
                    className="group relative rounded-lg p-3 hover:bg-sidebar-accent cursor-pointer transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-sidebar-foreground truncate">
                          {chat.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-sidebar-foreground/60">
                            {chat.model}
                          </span>
                          <span className="text-xs text-sidebar-foreground/40">
                            •
                          </span>
                          <span className="text-xs text-sidebar-foreground/60">
                            {formatTime(chat.timestamp)}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteChat(chat.id);
                        }}
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-sidebar-foreground/60 hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </aside>
    </>
  );
}