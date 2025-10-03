"use client";

import { Hash, Lock, Volume2, Settings, Plus, Hash as HashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { UserArea } from "@/components/sidebar/user-area";
import { cn } from "@/lib/utils/utils";

interface Channel {
  id: string;
  name: string;
  type: "text" | "voice";
  isActive?: boolean;
  isLocked?: boolean;
  unreadCount?: number;
}

interface ChannelCategory {
  id: string;
  name: string;
  channels: Channel[];
  isCollapsed?: boolean;
}

interface ChannelListProps {
  categories?: ChannelCategory[];
  onChannelSelect?: (channelId: string) => void;
  onCategoryToggle?: (categoryId: string) => void;
  onAddChannel?: (categoryId: string) => void;
}

const defaultCategories: ChannelCategory[] = [
  {
    id: "text-channels",
    name: "TEXT CHANNELS",
    channels: [
      { id: "general", name: "general", type: "text", isActive: true },
      { id: "announcements", name: "announcements", type: "text", isLocked: true },
      { id: "development", name: "development", type: "text", unreadCount: 3 },
      { id: "design", name: "design", type: "text" },
    ],
  },
  {
    id: "voice-channels",
    name: "VOICE CHANNELS",
    channels: [
      { id: "general-voice", name: "General", type: "voice" },
      { id: "gaming", name: "Gaming", type: "voice" },
    ],
  },
];

export function ChannelList({
  categories = defaultCategories,
  onChannelSelect,
  onCategoryToggle,
  onAddChannel,
}: ChannelListProps) {
  return (
    <div className="flex flex-col w-60 bg-gray-800 border-r border-gray-700 h-full">
      {/* Server Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
        <h2 className="text-white font-semibold text-sm">Server Name</h2>
        <Button variant="ghost" size="icon" className="w-6 h-6 text-gray-400 hover:text-white">
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      {/* Channels */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {categories.map((category) => (
            <div key={category.id} className="mb-4">
              {/* Category Header */}
              <div className="flex items-center justify-between px-2 py-1">
                <button
                  className="flex items-center text-xs font-semibold text-gray-400 hover:text-gray-300 uppercase tracking-wide"
                  onClick={() => onCategoryToggle?.(category.id)}
                >
                  <span className={cn(
                    "mr-1 transition-transform",
                    category.isCollapsed ? "rotate-0" : "rotate-90"
                  )}>
                    ▶
                  </span>
                  {category.name}
                </button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-4 h-4 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100"
                  onClick={() => onAddChannel?.(category.id)}
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>

              {/* Channels in Category */}
              {!category.isCollapsed && (
                <div className="space-y-1">
                  {category.channels.map((channel) => (
                    <button
                      key={channel.id}
                      className={cn(
                        "flex items-center w-full px-2 py-1 text-sm rounded text-left transition-colors",
                        "hover:bg-gray-700 text-gray-300 hover:text-white",
                        channel.isActive && "bg-gray-700 text-white"
                      )}
                      onClick={() => onChannelSelect?.(channel.id)}
                    >
                      {channel.type === "text" ? (
                        <Hash className="w-4 h-4 mr-1 text-gray-400" />
                      ) : (
                        <Volume2 className="w-4 h-4 mr-1 text-gray-400" />
                      )}
                      <span className="flex-1 truncate">{channel.name}</span>
                      {channel.isLocked && (
                        <Lock className="w-3 h-3 text-gray-400" />
                      )}
                      {channel.unreadCount && channel.unreadCount > 0 && (
                        <span className="ml-1 px-1.5 py-0.5 text-xs bg-red-600 text-white rounded-full">
                          {channel.unreadCount}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* User Area */}
      <UserArea />
    </div>
  );
}
