import { getCurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import NavigationAction from "@/components/navigation/navigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import NavigationItem from "@/components/navigation/navigation-item";
import { ModeToggle } from "../mode-toggle";
import { UserButton } from "@clerk/nextjs";

const NavigationSidebar = async() => {

    const profile = await getCurrentProfile();

    if (!profile) return redirect("/")

    const servers = await db.server.findMany({where: {
        members:{
            some:{
                profileId: profile.id
            }
        }
    }}) 

    console.log(servers)

    return (
      <div className="dark:bg-[#1E1F22] h-full flex flex-col items-center space-y-4 text-primary py-3">
        <NavigationAction/>
        <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 w-10 rounded-md mx-auto"/>
        <ScrollArea className="w-full flex-1">
            {servers.map((server) => ( 
                <div key={server.id} className="mb-4" >
                    <NavigationItem id={server.id} imageUrl={server.imageUrl} name={server.name} />
                </div>
            ))}
        </ScrollArea>
        <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
            <ModeToggle />
            <UserButton  afterSignOutUrl="/" appearance={{
                elements: {
                    avatarBox: "w-[48px] h-[48px]"
                }
            }}/>
        </div>
      </div>
    );
}
 
export default NavigationSidebar;       