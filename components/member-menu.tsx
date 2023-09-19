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
import { Check, Gavel, MoreVertical, Shield, ShieldCheck, ShieldQuestion } from "lucide-react";
import { memberWithProfile } from "@/types";


interface MemberMenuProps {
    member: memberWithProfile
}

const MemberMenu = ({ member }:MemberMenuProps) => {
    return (
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
                  <DropdownMenuItem>
                    <Shield className="w-4 h-4 mr-2" />
                    Guest
                    {member.role === "GUEST" && (
                      <Check className="w-4 h-4 ml-2" />
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
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
            <DropdownMenuItem>
              <Gavel className="w-4 h-4 mr-2" />
              Kick
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
}
 
export default MemberMenu;