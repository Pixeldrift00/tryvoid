import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ModelsTab from "@/components/settings/ModelsTab";
import AccountTab from "@/components/settings/AccountTab";
import SecurityTab from "@/components/settings/SecurityTab";
import AppearanceTab from "@/components/settings/AppearanceTab";
import { ArrowLeft, Settings2, UserCircle, Shield, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Layout from "@/components/layout/Layout";

export default function Settings() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("models");

  const tabs = [
    { id: "models", label: "Models & Providers", icon: Settings2 },
    { id: "account", label: "Account", icon: UserCircle },
    { id: "security", label: "Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
  ];

  const renderTabContent = (tabId: string) => {
    switch (tabId) {
      case "models":
        return <ModelsTab />;
      case "account":
        return <AccountTab />;
      case "security":
        return <SecurityTab />;
      case "appearance":
        return <AppearanceTab />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="flex min-h-screen bg-background">
        <div className="flex-1 flex">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="absolute top-4 left-4 p-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          {/* Vertical Tabs */}
          <div className="w-16 border-r border-border shrink-0 relative">
            <TabsList className="flex flex-col gap-2 fixed pt-16 w-16">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  className="relative"
                  onMouseEnter={() => setHoveredTab(tab.id)}
                  onMouseLeave={() => setHoveredTab(null)}
                >
                  <TabsTrigger
                    value={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="w-16 h-16 rounded-none flex items-center justify-center"
                  >
                    <tab.icon className="h-5 w-5" />
                  </TabsTrigger>
                  {/* Tooltip */}
                  <div
                    className={cn(
                      "absolute left-16 top-1/2 -translate-y-1/2 bg-popover text-popover-foreground px-3 py-1.5 rounded-md whitespace-nowrap z-50 transition-all",
                      hoveredTab === tab.id ? "opacity-100 translate-x-2" : "opacity-0 translate-x-0 pointer-events-none"
                    )}
                  >
                    {tab.label}
                  </div>
                </div>
              ))}
            </TabsList>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 md:p-6 lg:p-8 pt-16">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Settings</h1>
            
            <Tabs value={activeTab} className="w-full">
              <div className="space-y-4 md:space-y-6">
                {renderTabContent(activeTab)}
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
}