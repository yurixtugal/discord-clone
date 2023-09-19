import { v4 as uuidv4 } from "uuid";

import { getCurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await getCurrentProfile();

    if (!profile) return new Response("Unauthorized", { status: 401 });

    const { serverId } = params;

    if (!serverId) return new Response("ServerId Missing", { status: 400 });

    const server = await db.server.update({
        where: { id: serverId,
                 profileId: profile.id },
        data: { inviteCode: uuidv4() }        
    })

    return NextResponse.json(server);

  }
  catch (e) {
    console.error(e);
    return new Response("Internal Server Error", { status: 500 });
  }  
}