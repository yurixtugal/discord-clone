import { Channel, Server } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "createServer"
  | "invite"
  | "editServer"
  | "members"
  | "createChannel"
  | "deleteServer"
  | "leaveServer"
  | "editChannel"
  | "deleteChannel";

interface ModalData {
  server?: Server;
  channel?: Channel;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (modal: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set(() => ({ type, isOpen: true, data })),
  onClose: () => set(() => ({ type: null, isOpen: false })),
}));
