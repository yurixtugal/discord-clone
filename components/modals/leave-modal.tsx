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
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const LeaveModal = () => {
  
  const { isOpen, onClose, type, data, onOpen} = useModal()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();
  const isModalOpen = isOpen && type === "leaveServer"
  let { server } = data
  
  const leaveServer = async () => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/servers/${server?.id}/leave`);
      setIsLoading(false);
      onClose();
      router.push("/")
    }catch (error) {
      console.log(error)
    }
  }

    return (
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Leave server
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to leave{" "}
            <span className="font-semibold text-indigo-500">
              {" "}
              {server?.name}
            </span>
            ?
          </DialogDescription>
          <DialogFooter className="bg-gray-100 px-6 py-4">
            <div className="flex items-center justify-between w-full">
              <Button variant="ghost" onClick={onClose} disabled={isLoading}>
                Cancel
              </Button>

              <Button
                variant="primary"
                onClick={() => {
                  leaveServer();
                }}
                disabled={isLoading}
              >
                Confirm
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
}
 
export default LeaveModal;