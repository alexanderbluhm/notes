import create from "zustand";

type ActiveIdState = {
  id: string;
  setActiveId: (id: string) => void;
};

/**
 * Used to store the currently active id
 */
export const useActiveId = create<ActiveIdState>((set) => ({
  id: "",
  setActiveId: (id) => set((state) => ({ id })),
}));
