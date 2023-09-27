"use client";

import {
  Channel,
  ChannelType,
  Member,
  MemberRole,
  Server,
} from "@prisma/client";
import {
  Delete,
  Edit,
  Hash,
  Headphones,
  Lock,
  Plus,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Trash,
  Video,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Avatar, AvatarImage } from "../ui/avatar";
import { useModal } from "@/hooks/use-modal-store";
import { memberWithProfile } from "@/types";
import { Button } from "../ui/button";

const mapTitle = {
  [ChannelType.TEXT]: "TEXT CHANNELS",
  [ChannelType.AUDIO]: "AUDIO CHANNELS",
  [ChannelType.VIDEO]: "VIDEO CHANNELS",
  [MemberRole.ADMIN]: "MEMBERS",
  [MemberRole.MODERATOR]: "MEMBERS",
  [MemberRole.GUEST]: "MEMBERS",
};

const iconMapGroups = {
  [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [ChannelType.AUDIO]: <Headphones className="mr-2 h-4 w-4" />,
  [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />,
  [MemberRole.ADMIN]: <ShieldAlert className="mr-2 h-4 w-4 text-rose-500" />,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="mr-2 h-4 w-4 text-indigo-500" />
  ),
  [MemberRole.GUEST]: null,
};

interface serverSectionProps {
  data: {
    type: ChannelType | MemberRole;
    server: Server;
    detail:
      | {
          label: string;
          source: Channel | memberWithProfile;
          imageLink?: string;
        }[]
      | undefined;
  };
}

const isShowEditButtons = (detail: {
  label: string;
  source: Channel | memberWithProfile;
  imageLink?: string;
}): boolean => {
  
  if (detail.imageLink) return false;

  if (isGeneralChannel(detail)) return false;
  
  return true;
}

const isGeneralChannel = (detail: {
  label: string;
  source: Channel | memberWithProfile;
  imageLink?: string;
}): boolean => {
  if (detail.label === "general" && (detail.source as Channel).type === ChannelType.TEXT) return true;
  return false;
}

const ServerSection = ({ data }: serverSectionProps) => {
  const { onOpen } = useModal();
  return (
    <>
      <div className="  font-semibold text-sm text-zinc-500/80 m-2 flex gap-x-2 justify-between">
        {mapTitle[data.type]}
        {data.type === ChannelType.TEXT ||
        data.type === ChannelType.AUDIO ||
        data.type === ChannelType.VIDEO ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <button
                  onClick={() =>
                    onOpen("createChannel", { server: data.server })
                  }
                >
                  <Plus className=" h-4 w-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Create Channel</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <button
                  onClick={() => onOpen("members", { server: data.server })}
                >
                  <Settings className=" h-4 w-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Manage members</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="my-4 mx-4 font-semibold text-sm text-zinc-400">
        {data.detail?.map((detail) => (
          <button
            key={detail.label}
            className="group  rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1"
          >
            {iconMapGroups[data.type]}
            {!!detail.imageLink && (
              <Avatar className="h-8 w-8 md:h-8 md:w-8 mr-2">
                <AvatarImage src={detail.imageLink} />
              </Avatar>
            )}
            <span>{detail.label}</span>
            {!!isShowEditButtons(detail) && (
            
            <div className="ml-auto flex">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger onClick={()=>onOpen("editChannel",{channel: detail.source as Channel})}>
                    <Edit className="mr-1 hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition" />
                  </TooltipTrigger>
                  <TooltipContent>Edit</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger onClick={()=> onOpen("deleteChannel", { channel: detail.source as Channel })}>
                    <Trash className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition" />
                  </TooltipTrigger>
                  <TooltipContent>Delete</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>)}
            {isGeneralChannel(detail) && (
              <div className="ml-auto flex">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Lock className="mr-1 hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition" />
                  </TooltipTrigger>
                  <TooltipContent>Block</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>  
            )}
          </button>
        ))}
      </div>
    </>
  );
};

export default ServerSection;
