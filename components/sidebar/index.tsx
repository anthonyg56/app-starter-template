"use client";

import { useState } from "react";
import { ServerList } from "@/components/sidebar/server-list";
import { ChannelList } from "@/components/sidebar/channel-list";
import { UserArea } from "@/components/sidebar/user-area";

// Export individual components for modular use
export { ServerList } from "@/components/sidebar/server-list";
export { ChannelList } from "@/components/sidebar/channel-list";
export { UserArea } from "@/components/sidebar/user-area";

export default function AppSidebar() {
    const [selectedServer, setSelectedServer] = useState("home");
    const [selectedChannel, setSelectedChannel] = useState("general");

    const handleServerSelect = (serverId: string) => {
        setSelectedServer(serverId);
        // Reset channel selection when switching servers
        setSelectedChannel("general");
    };

    const handleChannelSelect = (channelId: string) => {
        setSelectedChannel(channelId);
    };

    const handleAddServer = () => {
        console.log("Add server clicked");
        // Implement add server logic
    };

    const handleAddChannel = (categoryId: string) => {
        console.log("Add channel to category:", categoryId);
        // Implement add channel logic
    };

    const handleCategoryToggle = (categoryId: string) => {
        console.log("Toggle category:", categoryId);
        // Implement category toggle logic
    };

    return (
        <div className="flex h-screen bg-gray-900">
            {/* Server List */}
            <ServerList 
                onServerSelect={handleServerSelect}
                onAddServer={handleAddServer}
            />
            
            {/* Channel List with integrated User Area */}
            <ChannelList 
                onChannelSelect={handleChannelSelect}
                onAddChannel={handleAddChannel}
                onCategoryToggle={handleCategoryToggle}
            />
        </div>
    );
}