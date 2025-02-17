'use client'
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {replace} = useRouter()
  const supabase = createClient()
  
  /* 
    async function handleLogout() {
      await supabase.auth.signOut()
      replace('/login')
    }
  */
  useEffect(() => {
    async function redirectIfNotLoggedIn () {
      const { data: {user}} = await supabase.auth.getUser();
      console.log(user)
      if(!user) {
        replace('/login')
      }
    }
    redirectIfNotLoggedIn()
  },[])
  
  return(
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </header>
        <div className="flex flex-1 px-4 py-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
