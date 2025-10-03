"use client";

import { Mic, Headphones, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";
import { useAuth } from "@/lib/providers/auth-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils/utils";

interface UserAreaProps {
  className?: string;
}

export function UserArea({ className }: UserAreaProps) {
  const { user, signOut } = useAuth();

  if (!user) return null;

  const { image, email, name } = user;

  return (
    <div className={cn("flex items-center justify-between p-2 bg-gray-800 border-t border-gray-700", className)}>
      {/* User Info */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center w-full p-2 hover:bg-gray-700 rounded-md"
          >
            <UserAvatar 
              image={image} 
              email={email} 
              name={name} 
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1 text-left ml-3">
              <div className="text-sm font-medium text-white truncate">
                {name || email}
              </div>
              <div className="text-xs text-gray-400">
                Online
              </div>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuLabel>
            <div className="flex items-center">
              <UserAvatar 
                image={image} 
                email={email} 
                name={name} 
                className="w-8 h-8 rounded-full mr-3"
              />
              <div>
                <div className="text-sm font-medium">{name || email}</div>
                <div className="text-xs text-gray-500">{email}</div>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Settings className="w-4 h-4 mr-2" />
            User Settings
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Voice Controls */}
      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 text-gray-400 hover:text-white hover:bg-gray-700"
        >
          <Mic className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 text-gray-400 hover:text-white hover:bg-gray-700"
        >
          <Headphones className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 text-gray-400 hover:text-white hover:bg-gray-700"
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
