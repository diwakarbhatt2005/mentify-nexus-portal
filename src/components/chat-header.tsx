import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTheme } from "./theme-provider";
import { Moon, Sun, User, LogOut, Menu } from "lucide-react";
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
    <header className="flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-md px-4 md:px-6">
      {/* Left side - Logo and Mobile Menu */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src={mentifyLogo} 
              alt="Mentify-AI Logo" 
              className="w-10 h-10 object-contain hover-glow"
            />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold gradient-text">Mentify-AI</h1>
            <p className="text-xs text-muted-foreground">Best Buddy's</p>
          </div>
        </div>
      </div>

      {/* Center - Model Selector */}
      <div className="flex-1 flex justify-center max-w-xs">
        <Select value={selectedModel} onValueChange={onModelChange}>
          <SelectTrigger className="bg-card/50 border-border hover:bg-card/80 transition-colors">
            <SelectValue placeholder="Select Model" />
          </SelectTrigger>
          <SelectContent>
            {models.map((model) => (
              <SelectItem key={model.value} value={model.value}>
                {model.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Right side - Theme Toggle, Profile, Logout */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="hover-glow"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="hover-glow">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}