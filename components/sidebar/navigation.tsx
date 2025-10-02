import { AppURLPath } from "@/lib/@types";
import { FileIcon, HomeIcon, SettingsIcon } from "lucide-react";
import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenuItem, SidebarMenuButton, SidebarMenu } from "@/components/ui/sidebar";
import Link from "next/link";

export type SidebarNavItem = {
    title: string,
    url: AppURLPath,
    icon?: React.ReactNode,
};

const navItems: SidebarNavItem[] = [
    {
        title: "Home",
        url: "/dashboard/",
        icon: <HomeIcon />,
    },
    {
        title: "Settings",
        url: "/dashboard/settings",
        icon: <SettingsIcon />,
    },
    {
        title: "Posts",
        url: "/dashboard/posts",
        icon: <FileIcon />,
    }
];

export function SidebarNavigation() {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {navItems.map((item) => (
                        <SidebarMenuItem key={item.url}>
                            <SidebarMenuButton asChild>
                                <Link href={item.url}>{item.icon} {item.title}</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}