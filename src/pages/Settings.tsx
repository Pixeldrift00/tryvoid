import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ModelsTab from "@/components/settings/ModelsTab";
import AccountTab from "@/components/settings/AccountTab";
import SecurityTab from "@/components/settings/SecurityTab";
import AppearanceTab from "@/components/settings/AppearanceTab";

export default function Settings() {
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-1 flex flex-col w-full max-w-6xl mx-auto">
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Settings</h1>
          
          <Tabs defaultValue="models" className="w-full">
            <TabsList className="mb-6 md:mb-8 w-full flex flex-wrap gap-2">
              <TabsTrigger 
                value="models" 
                className="flex-1 min-w-[120px]"
              >
                Models & Providers
              </TabsTrigger>
              <TabsTrigger 
                value="account"
                className="flex-1 min-w-[120px]"
              >
                Account
              </TabsTrigger>
              <TabsTrigger 
                value="security"
                className="flex-1 min-w-[120px]"
              >
                Security
              </TabsTrigger>
              <TabsTrigger 
                value="appearance"
                className="flex-1 min-w-[120px]"
              >
                Appearance
              </TabsTrigger>
            </TabsList>
            
            <div className="space-y-4 md:space-y-6">
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
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}