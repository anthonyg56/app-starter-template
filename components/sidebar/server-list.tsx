"use client";

import { Plus, Hash, Settings, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils/utils";

interface Server {
  id: string;
  name: string;
  icon?: string;
  isActive?: boolean;
}

interface ServerListProps {
  servers?: Server[];
  onServerSelect?: (serverId: string) => void;
  onAddServer?: () => void;
}

const defaultServers: Server[] = [
  { id: "home", name: "Home", icon: "🏠", isActive: true },
  { id: "general", name: "General", icon: "💬" },
  { id: "development", name: "Dev", icon: "⚡" },
  { id: "design", name: "Design", icon: "🎨" },
];

export function ServerList({ 
  servers = defaultServers, 
  onServerSelect,
  onAddServer 
}: ServerListProps) {
  return (
    <div className="flex flex-col items-center w-16 bg-gray-900 border-r border-gray-700 min-h-screen">
      <TooltipProvider>
        {/* Home/Direct Messages */}
        <div className="p-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white",
                  "transition-all duration-200 hover:rounded-2xl hover:scale-105"
                )}
                onClick={() => onServerSelect?.("home")}
              >
                <Hash className="w-6 h-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Direct Messages</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Server separator */}
        <div className="w-8 h-px bg-gray-600 mb-2" />

        {/* Servers */}
        <div className="flex flex-col items-center space-y-2">
          {servers.map((server) => (
            <Tooltip key={server.id}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "w-12 h-12 rounded-full hover:rounded-2xl transition-all duration-200",
                    "bg-gray-700 hover:bg-gray-600 text-white hover:scale-105",
                    server.isActive && "bg-indigo-600 hover:bg-indigo-500"
                  )}
                  onClick={() => onServerSelect?.(server.id)}
                >
                  {server.icon ? (
                    <span className="text-lg">{server.icon}</span>
                  ) : (
                    <span className="text-sm font-semibold">
                      {server.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{server.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Add Server Button */}
        <div className="mt-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full bg-gray-700 hover:bg-green-600 text-gray-400 hover:text-white transition-all duration-200 hover:rounded-2xl hover:scale-105"
                onClick={onAddServer}
              >
                <Plus className="w-6 h-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Add a Server</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Settings/User Area */}
        <div className="mt-auto p-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-400 hover:text-white transition-all duration-200 hover:rounded-2xl hover:scale-105"
              >
                <Settings className="w-6 h-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}
