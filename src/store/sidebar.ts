import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SidebarState {
  isOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  openSidebar: () => void;
}

// Check if we're on a desktop screen
const isDesktop = () => {
  return typeof window !== 'undefined' && window.innerWidth >= 1024; // lg breakpoint in Tailwind
};

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      // Initialize isOpen based on screen size
      isOpen: isDesktop(), 
      toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
      closeSidebar: () => set({ isOpen: false }),
      openSidebar: () => set({ isOpen: true }),
    }),
    {
      name: 'sidebar-storage',
      // Override persisted state if on desktop to ensure sidebar is open
      onRehydrateStorage: () => (state) => {
        if (isDesktop() && state) {
          state.isOpen = true;
        }
      },
    }
  )
);