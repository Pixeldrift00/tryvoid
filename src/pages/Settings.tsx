import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ModelsTab from "@/components/settings/ModelsTab";
import AccountTab from "@/components/settings/AccountTab";
import SecurityTab from "@/components/settings/SecurityTab";
import AppearanceTab from "@/components/settings/AppearanceTab";

export default function Settings() {
  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto py-6 px-8">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>
          
          <Tabs defaultValue="models" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="models">Models & Providers</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="models" className="mt-0">
              <ModelsTab />
            </TabsContent>
            <TabsContent value="account" className="mt-0">
              <AccountTab />
            </TabsContent>
            <TabsContent value="security" className="mt-0">
              <SecurityTab />
            </TabsContent>
            <TabsContent value="appearance" className="mt-0">
              <AppearanceTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}