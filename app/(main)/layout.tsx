import NavigationSidebar from "@/components/navigation/navigation-sidebar";
import React from "react"

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-[72px] flex-col fixed z-30 inset-y-0">
        <NavigationSidebar></NavigationSidebar>
      </div>
      <main className="md:pl-[72px] h-full">{children}</main>
    </div>
    //explicame el codigo de arriba el css


  );
  
};

export default MainLayout