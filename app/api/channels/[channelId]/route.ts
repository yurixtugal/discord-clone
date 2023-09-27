import { getCurrentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function DELETE (
    req: Request,
    { params }: { params: { channelId: string } }
){
    try {
      
      const profile = await getCurrentProfile()
      const { channelId } = params;


      if (!profile) {
        return new NextResponse("Unauthorized", { status: 401 });
      }

      if (!channelId){
        return new NextResponse('Channel Id missing', { status: 400 })
      }
      
      console.log("channelId", channelId)

      const channel = await db.channel.delete({
          where: {
              id: channelId,
          },
      })

      return NextResponse.json(channel)
    } catch (error) {
      console.error(error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
}