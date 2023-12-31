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

const DeleteChannelModal = () => {
  
  const { isOpen, onClose, type, data} = useModal()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();
  const isModalOpen = isOpen && type === "deleteChannel"
  let { channel } = data
  
  const deleteChannel = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/channels/${channel?.id}`);
      setIsLoading(false);
      router.refresh();
      onClose();
    }catch (error) {
      console.log(error)
    }
  }

    return (
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Delete Server 
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to delete {" "}
            <span className="font-semibold text-indigo-500">
              {channel?.name}
              {" "}
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
                  deleteChannel();
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
 
export default DeleteChannelModal;