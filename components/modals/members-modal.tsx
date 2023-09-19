"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { useOrigin } from "@/hooks/use-origin";
import { ServerWithMembersWithProfiles } from "@/types";
import { ScrollArea } from "../ui/scroll-area";
import UserAvatar from "../user-avatar";
import { Check, Gavel, Loader2, MoreVertical, Router, Shield, ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MemberRole } from "@prisma/client";
import qs from "query-string"
import axios from "axios";
import { useRouter } from "next/navigation";
import { set } from "zod";

const mapRoleIcon = {
  "GUEST": null,
  "MODERATOR": <ShieldCheck className="w-4 h-4 ml-2 text-indigo-500"/>,
  "ADMIN": <ShieldAlert className="w-4 h-4 ml-2 text-rose-500"/>,
}

const MembersModal = () => {
  
  const { isOpen, onClose, type, data, onOpen} = useModal()
  const { server } = data as { server: ServerWithMembersWithProfiles }
  const [loadingId, setLoadingId]= useState("")
  const router = useRouter()

  const isModalOpen = isOpen && type === "members"
  
  const onKick = async(memberId: string) => {
    try{
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: { serverId: server.id },
      });

      const response = await axios.delete(url);
      router.refresh();
      onOpen("members", { server: response.data })

    }catch(error){
      console.log("[MEMBER_ID_DELETE]",error);
    }finally{
      setLoadingId("");
    }
  }
  
  const onChangeRole = async (memberId: string, role: MemberRole) => {
    try{
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: { serverId: server.id },
      });
      const response = await axios.patch(url, { role });
      router.refresh();
      onOpen("members", { server: response.data })
    }
    catch (error)
    {
      console.log(error)
    }
    finally{
      setLoadingId("")
    }
  }

    return (
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white text-black overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Manage Members
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              {server?.members?.length} members
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="mt-8 max-h-[420px] pr-6">
            {server?.members?.map((member) => (
              <div key={member.id} className="flex items-center gap-x-2 mb-6">
                <UserAvatar src={member.profile.imageUrl} />

                <div className="flex flex-col gap-y-1">
                  <div className="text-xs font-semibold flex items-center gap-x-1">
                    {member.profile.name}
                    {mapRoleIcon[member.role]}
                  </div>
                  <p className="text-xs text-zinc-500">
                    {member.profile.email}
                  </p>
                </div>

                {server.profileId !== member.profileId &&
                  loadingId !== member.id && (
                    <div className="ml-auto">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreVertical className="w-5 h-5 text-zinc-500" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="left">
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger className="flex items-center">
                              <ShieldQuestion className="w-4 h-4 mr-2 ml-2" />
                              <span>Role</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem onClick={() => onChangeRole(member.id, "GUEST")}>
                                  <Shield className="w-4 h-4 mr-2" />
                                  Guest
                                  {member.role === "GUEST" && (
                                    <Check className="w-4 h-4 ml-2" />
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onChangeRole(member.id, "MODERATOR")}>
                                  <ShieldCheck className="w-4 h-4 mr-2" />
                                  Moderator
                                  {member.role === "MODERATOR" && (
                                    <Check className="w-4 h-4 ml-2" />
                                  )}
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => onKick(member.id)}>
                            <Gavel className="w-4 h-4 mr-2" />
                            Kick
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                  {loadingId === member.id && (
                    <Loader2 className="animate-spin w-5 h-5 ml-auto text-zinc-500" />)}
              </div>
            ))}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
}
 
export default MembersModal;