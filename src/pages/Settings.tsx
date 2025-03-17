import { Sidebar, SidebarContent, SidebarProvider } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ModelsTab from "@/components/settings/ModelsTab";
import AccountTab from "@/components/settings/AccountTab";
import SecurityTab from "@/components/settings/SecurityTab";
import AppearanceTab from "@/components/settings/AppearanceTab";

export default function Settings() {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar>
          <SidebarContent className="py-4">
            <Tabs defaultValue="models" className="w-full" orientation="vertical">
              <TabsList className="grid w-full gap-2">
                <TabsTrigger value="models">Models & Providers</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
              </TabsList>
              
              <TabsContent value="models">
                <ModelsTab />
              </TabsContent>
              <TabsContent value="account">
                <AccountTab />
              </TabsContent>
              <TabsContent value="security">
                <SecurityTab />
              </TabsContent>
              <TabsContent value="appearance">
                <AppearanceTab />
              </TabsContent>
            </Tabs>
          </SidebarContent>
        </Sidebar>
      </div>
    </SidebarProvider>
  );
}