import { getCurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import {
  Channel,
  ChannelType,
  Member,
  MemberRole,
  Server,
} from "@prisma/client";
import { redirect } from "next/navigation";
import { ServerHeader } from "@/components/server/server-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import ServerSearch from "@/components/server/server-search";
import { memberWithProfile } from "@/types";
import { Hash, Headphones, ShieldAlert, Video } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ServerSection from "./server-section";

interface serverSidebarProps {
  serverId: string;
}

interface interfaceToSend {
  type: ChannelType | MemberRole;
  server: Server;
  detail:
    | {
        label: string;
      }[]
    | undefined;
}

const prepareDataToSection = (
  lstSource: Channel[] | Member[] | undefined,
  sourceType: ChannelType | MemberRole,
  server: Server
): interfaceToSend => {
  const isMember =
    sourceType === MemberRole.ADMIN ||
    sourceType === MemberRole.MODERATOR ||
    sourceType === MemberRole.GUEST;
  const sourceDetail = lstSource?.map((source) => {
    if (!isMember) {
      return {
        label: (source as Channel).name,
      };
    } else {
      return {
        label: (source as memberWithProfile).profile.name,
        imageLink: (source as memberWithProfile).profile.imageUrl,
      };
    }
  });

  return {
    type: sourceType,
    server: server,
    detail: sourceDetail,
  };
};

const prepareDataToSearch = (
  textChannels: Channel[] | undefined,
  audioChannels: Channel[] | undefined,
  videoChannels: Channel[] | undefined,
  members: memberWithProfile[] | undefined
) => {
  return [
    {
      label: "Text Channels",
      detail: textChannels?.map((channel) => ({
        label: channel.name,
        type: channel.type,
        id: channel.id,
      })),
    },
    {
      label: "Audio Channels",
      detail: audioChannels?.map((channel) => ({
        label: channel.name,
        type: channel.type,
        id: channel.id,
      })),
    },
    {
      label: "Video Channels",
      detail: videoChannels?.map((channel) => ({
        label: channel.name,
        type: channel.type,
        id: channel.id,
      })),
    },
    {
      label: "Members",
      detail: members?.map((member) => ({
        label: member.profile.name,
        type: member.role,
        id: member.profile.id,
      })),
    },
  ];
};

export const ServerSidebar = async ({ serverId }: serverSidebarProps) => {
  const profile = await getCurrentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: { id: serverId },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  const textChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );

  const members = server?.members.filter(
    (member) => member.profileId !== profile.id
  );

  const dataToSearch = prepareDataToSearch(
    textChannels,
    audioChannels,
    videoChannels,
    members
  );

  const textChannelsToSend = prepareDataToSection(
    textChannels,
    ChannelType.TEXT,
    server as Server
  );
  const audioChannelsToSend = prepareDataToSection(
    audioChannels,
    ChannelType.AUDIO,
    server as Server
  );
  const videoChannelsToSend = prepareDataToSection(
    videoChannels,
    ChannelType.VIDEO,
    server as Server
  );
  const membersToSend = prepareDataToSection(
    members,
    MemberRole.GUEST,
    server as Server
  );
  console.log(members);

  if (!server) {
    return redirect("/");
  }

  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className="h-full w-full text-primary flex flex-col dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader server={server} role={role} />
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch data={dataToSearch} />
        </div>
        <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 w-full rounded-md mx-auto my-4" />
        {!!textChannels?.length && <ServerSection data={textChannelsToSend} />}

        {!!audioChannels?.length && (
          <ServerSection data={audioChannelsToSend} />
        )}

        {!!videoChannels?.length && (
          <ServerSection data={videoChannelsToSend} />
        )}

        {!!members?.length && <ServerSection data={membersToSend} />}
      </ScrollArea>
    </div>
  );
};
