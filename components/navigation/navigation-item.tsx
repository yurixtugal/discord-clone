"use client"

import Image from "next/image"
import { useParams, useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import ActionToolTip from "../action-tooltip"


interface NavigationItemProps {
    id: string;
    imageUrl: string;
    name: string;
}

const NavigationItem = ({
    id,
    imageUrl,
    name
} : NavigationItemProps) => {

    const params = useParams();
    const router = useRouter();

    return (
      <ActionToolTip label={name} align="center" side="right">
        <button
          onClick={() => {router.push(`/servers/${id}`)}}
          className=" group relative flex items-center"
        >
            <div className={cn("absolute-0 left-0 bg-primary rounded-r-full transition-all w-[4px]",
            params?.serverId !== id && "group-hover:h-[20px]",
            params?.serverId === id ? "h-[36px]":"h-[8px]")} />
          <div
            className={cn(
              "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
              params?.serverId === id &&
                "bg-primary/10 text-primary group-hover:rounded-[16px]"
            )}
          >
            <Image src={imageUrl} alt="Channel" fill />
          </div>
        </button>
      </ActionToolTip>
    );
}
 
export default NavigationItem;