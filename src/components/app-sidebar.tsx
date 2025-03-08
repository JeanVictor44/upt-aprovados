import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { useEffect,  useState } from "react";

const data = {
  navMain: [
    {
      title: "Gerenciamento",
      url: "/usuarios",
      justAdmin: true,
      items: [
        {
          title: "Usuários",
          url: "/usuarios",
        },
      ],
    },
    {
      title: "Alunos",
      url: '/aprovados',
      justAdmin: false,
      items: [
        {
          title: "Aprovados",
          url: "/aprovados",
        },
      ],
    },
    {
      title: 'Cursos',
      url: '/cursos',
      justAdmin: true,
      items: [
        {
          title: 'Cursos',
          url: '/cursos'
        }
      ]
    }
  ],
};
 
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const supabase = createClient();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    (async( )=> {
      const {data: {user}} = await supabase.auth.getUser()
      
      setIsAdmin(user?.user_metadata.is_admin)
    })();
  },[])

  return (
    <Sidebar {...props}>
      <SidebarHeader className="mb-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <Image
                  src="/logo-uneb.svg"
                  alt="Logo UNEB"
                  width={120}
                  height={32}
                  className="mx-auto"
                />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.filter(({justAdmin}) => justAdmin ? isAdmin : true).map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
