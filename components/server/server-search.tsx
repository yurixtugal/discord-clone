"use client"

import { CalendarIcon, FacebookIcon, Hash, Headphones, Mail, PersonStandingIcon, RocketIcon, Search, Settings, Shield, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import React, { useState } from "react";
import { Server } from "http";
import { ChannelType, MemberRole } from "@prisma/client";


const iconMapRoles = {
  [MemberRole.ADMIN]: <ShieldAlert className="mr-2 h-4 w-4 text-rose-500" />,
  [MemberRole.MODERATOR]: <ShieldCheck className="mr-2 h-4 w-4 text-indigo-500" />,
  [MemberRole.GUEST]: null
}

const iconMapGroups = {
  [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [ChannelType.AUDIO]: <Headphones className="mr-2 h-4 w-4" />,
  [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />
}


interface ServerSearchProps {
  data: {
    label: string;
    detail: {
      label: string;
      id: string;
      type: ChannelType | MemberRole
    }[] | undefined;
  }[]
}

const ServerSearch = ({data}: ServerSearchProps) => {

    const [openCommand,setOpenCommand] = useState(false);

    return (
      <>
        <button
          onClick={() => setOpenCommand(true)}
          className="group px-2 py-2 rounded-md flex items-center w-full gap-x-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
        >
          <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
          <p className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-300 transition">
            Search
          </p>
        </button>
        <CommandDialog open={openCommand} onOpenChange={setOpenCommand}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {data.map( dataInput => (
              <>
                <CommandGroup heading={dataInput.label}>
                  {dataInput.detail?.map((detail) => (
                    <CommandItem key={detail.id}>
                      { detail.type === MemberRole.ADMIN || detail.type === MemberRole.MODERATOR || detail.type === MemberRole.GUEST ? iconMapRoles[detail.type] : iconMapGroups[detail.type]}{' '}<span key={`${detail.id}_span`} >{detail.label}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator  />
              </>
            ))}
          </CommandList>
        </CommandDialog>
      </>
    );
}
 
export default ServerSearch;