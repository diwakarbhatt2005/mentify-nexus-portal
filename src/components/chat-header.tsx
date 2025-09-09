import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "./theme-provider";
import { Moon, Sun, User, LogOut, Menu, Settings, Sparkles } from "lucide-react";
import mentifyLogo from "@/assets/mentify-logo.png";

interface ChatHeaderProps {
  onToggleSidebar: () => void;
  selectedModel: string;
  onModelChange: (model: string) => void;
}

const models = [
  { value: "mentify-1", label: "Mentify 1" },
  { value: "mentify-2", label: "Mentify 2" },
  { value: "mentify-3", label: "Mentify 3" },
  { value: "mentuf-4", label: "Mentuf 4" },
];

export function ChatHeader({ onToggleSidebar, selectedModel, onModelChange }: ChatHeaderProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <header className="relative flex h-18 items-center justify-between border-b border-border/50 glass-heavy px-4 md:px-6 neural-bg">
      {/* Neural network background pattern */}
      <div className="absolute inset-0 mesh-bg opacity-30"></div>
      
      {/* Left side - Logo and Mobile Menu */}
      <div className="relative z-10 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="md:hidden hover-neural"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-primary-glow to-primary rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
            <img 
              src={mentifyLogo} 
              alt="Mentify-AI Logo" 
              className="relative w-12 h-12 object-contain floating"
            />
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold gradient-text">Mentify-AI</h1>
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            </div>
            <p className="text-sm text-muted-foreground font-medium">Best Buddy's</p>
          </div>
        </div>
      </div>

      {/* Center - Advanced Model Selector */}
      <div className="relative z-10 flex-1 flex justify-center max-w-sm">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary-glow rounded-lg blur opacity-10 group-hover:opacity-30 transition duration-300"></div>
          <Select value={selectedModel} onValueChange={onModelChange}>
            <SelectTrigger className="relative bg-card/60 border-border/50 hover:bg-card/80 transition-all duration-300 hover-neural backdrop-blur-md min-w-[180px]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <SelectValue placeholder="Select Model" />
              </div>
            </SelectTrigger>
            <SelectContent className="glass-heavy">
              {models.map((model) => (
                <SelectItem key={model.value} value={model.value} className="hover:bg-primary/10">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary/60"></div>
                    {model.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Right side - Modern Action Buttons */}
      <div className="relative z-10 flex items-center gap-3">
        {/* Theme Toggle */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary-glow rounded-lg blur opacity-10 group-hover:opacity-30 transition duration-300"></div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="relative hover-neural glass bg-card/30 border border-border/50"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-primary" />
            ) : (
              <Moon className="h-5 w-5 text-primary" />
            )}
          </Button>
        </div>

        {/* Profile Button */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary-glow rounded-lg blur opacity-10 group-hover:opacity-30 transition duration-300"></div>
          <Button
            variant="ghost"
            size="icon"
            className="relative hover-neural glass bg-card/30 border border-border/50"
          >
            <User className="h-5 w-5 text-primary" />
          </Button>
        </div>

        {/* Logout Button */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-destructive/50 to-destructive rounded-lg blur opacity-10 group-hover:opacity-30 transition duration-300"></div>
          <Button
            variant="ghost"
            size="icon"
            className="relative hover-neural glass bg-card/30 border border-border/50 hover:text-destructive hover:border-destructive/30"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}