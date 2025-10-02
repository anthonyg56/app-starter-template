import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
  } from "@/components/ui/sidebar"
import { H1 } from "@/components/ui/typography"
import { SidebarNavigation } from "@/components/sidebar/navigation"
import UserProfileDropdown from "@/components/sidebar/user-profile-dropdown"
  
export default function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <H1>Header</H1>
            </SidebarHeader>
            <SidebarContent>
                <SidebarNavigation />
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter>
                <UserProfileDropdown />
            </SidebarFooter>
        </Sidebar>
    )
  }