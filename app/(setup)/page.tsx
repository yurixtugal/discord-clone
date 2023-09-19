import InitialModal from "@/components/modals/initial-modal";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile"
import { redirect } from "next/navigation";


const SetupPage = async () => {
    const profille = await initialProfile()
    
    const server = await db.server.findFirst({
        where: {
            members:{
                some:{
                    profileId: profille.id
                }
            }
        }    
    })

    if (server) {
        return redirect(`/servers/${server.id}`)
    }    
    return <InitialModal />;
}
 
export default SetupPage;