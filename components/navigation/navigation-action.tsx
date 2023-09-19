"use client";

import { Plus } from "lucide-react"
import ActionToolTip from "../action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

const NavigationAction = () => {

    const {onOpen} = useModal();

    return (
      <div>
        <ActionToolTip label="Create Server" align="center" side="right">
          <button 
            onClick={() => onOpen("createServer")}
            className="group flex items-center">
            <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] dark:bg-neutral-700 transition-all group-hover:rounded-[16px] overflow-hidden items-center justify-center bg-background group-hover:bg-emerald-500">
              <Plus
                className="group-hover:text-white transition text-emerald-500"
                size={25}
              />
            </div>
          </button>
        </ActionToolTip>
      </div>
    );
}
 
export default NavigationAction;