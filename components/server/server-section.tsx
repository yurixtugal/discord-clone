import { ChannelType, MemberRole } from "@prisma/client";
import { Hash, Headphones, Plus, Settings, ShieldAlert, ShieldCheck, Video } from "lucide-react";

const mapTitle = {
    [ChannelType.TEXT]: "TEXT CHANNELS",
    [ChannelType.AUDIO]: "AUDIO CHANNELS",
    [ChannelType.VIDEO]: "VIDEO CHANNELS",
    [MemberRole.ADMIN]: "MEMBERS",
    [MemberRole.MODERATOR]: "MEMBERS",
    [MemberRole.GUEST]: "MEMBERS"
}

const iconMapGroups = {
    [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
    [ChannelType.AUDIO]: <Headphones className="mr-2 h-4 w-4" />,
    [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />,
    [MemberRole.ADMIN]: <ShieldAlert className="mr-2 h-4 w-4 text-rose-500" />,
    [MemberRole.MODERATOR]: <ShieldCheck className="mr-2 h-4 w-4 text-indigo-500" />,
    [MemberRole.GUEST]: null
  }

interface serverSectionProps {
    data:{
        type: ChannelType | MemberRole,
        detail:{
            label: string,
        }[]|undefined
    }
}

const ServerSection = ({ data }: serverSectionProps) => {
    return (
      <>
        <div className="font-semibold text-sm text-zinc-500/80 m-2 flex gap-x-2 justify-between">
          {mapTitle[data.type]}
          {data.type === ChannelType.TEXT ||
          data.type === ChannelType.AUDIO ||
          data.type === ChannelType.VIDEO ? (
            <Plus className="h-4 w-4 text-zinc-500/80" />
          ) : (
            <Settings className="h-4 w-4 text-zinc-500/80" />
          )}
        </div>
        <div className="my-2 mx-4 font-semibold text-sm text-zinc-400">
          {data.detail?.map((detail) => (
            <div key={detail.label} className="flex items-center my-2">
              {iconMapGroups[data.type]}
              <span>{detail.label}</span>
            </div>
          ))}
        </div>
      </>
    );
}
 
export default ServerSection;