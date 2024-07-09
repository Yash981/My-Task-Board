import {  useRouter } from "next/navigation";
import { create } from "zustand";

type OpenSidebar = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useOpenSidebar = create<OpenSidebar>((set) => {

  return {
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => {
      set({ isOpen: false });


    },
  };
});
