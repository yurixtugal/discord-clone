import { Channel, Member, Profile, Server } from "@prisma/client";

export type ServerWithMembersWithProfiles = Server  & {
    members: (Member & { profile: Profile} )[]
} & {
    channels: Channel[]
}

export type memberWithProfile = Member & {
    profile: Profile
}
