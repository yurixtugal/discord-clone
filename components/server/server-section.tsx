import { ChannelType, MemberRole } from "@prisma/client";
import {
  Delete,
  Edit,
  Hash,
  Headphones,
  Plus,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Trash,
  Video,
} from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";

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
    detail:
      | {
          label: string;
          imageLink?: string;
        }[]
      | undefined;
  };
}

const ServerSection = ({ data }: serverSectionProps) => {
  return (
    <>
      <div className="  font-semibold text-sm text-zinc-500/80 m-2 flex gap-x-2 justify-between">
        {mapTitle[data.type]}
        {data.type === ChannelType.TEXT ||
        data.type === ChannelType.AUDIO ||
        data.type === ChannelType.VIDEO ? (
          <button>
            <Plus className=" h-4 w-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition" />
          </button>
        ) : (
          <button>
            <Settings className=" h-4 w-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition" />
          </button>
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
            <div className="ml-auto flex">
              <Edit className="mr-1 hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition" />
              <Trash className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition" />
            </div>
          </button>
        ))}
      </div>
    </>
  );
};

export default ServerSection;
