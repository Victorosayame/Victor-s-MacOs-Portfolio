/**
 * STEP 26: Create Location/Folder State Store with Zustand
 * ===========================================================
 * Manages folder navigation state for the Finder window:
 * - activeLocation: Current folder being viewed (tracks breadcrumb trail)
 * - Loads default location from imported locations constant
 *
 * Actions:
 * - setActiveLocation(location): Updates current folder view
 * - resetActiveLocation(): Returns to default work folder
 *
 * Purpose:
 * - Enables folder navigation in Finder window
 * - Maintains state across component re-renders
 * - Allows Home component to update Finder's current folder
 *
 * Integration with Finder:
 * - Left sidebar shows folder structure from locations constant
 * - Clicking folders updates activeLocation
 * - Main content area updates to show selected folder's contents
 */

import { locations } from "@/constants";
import { FolderItem } from "@/types/location";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const DEFAULT_LOCATION = locations.work;

// Export a strongly-typed Location shape derived from the constants
// export type Location = typeof DEFAULT_LOCATION;
export type Location = FolderItem

// Define the shape of the location store
type LocationStore = {
  activeLocation: Location;
  setActiveLocation: (location?: Location) => void;
  resetActiveLocation: () => void;
};

// Create the useLocation store with explicit typing to avoid `any`
const useLocationStore = create<LocationStore>()(
  immer((set) => ({
    activeLocation: DEFAULT_LOCATION,

    setActiveLocation: (location) =>
      set((state) => {
        if (location === undefined) return;
        state.activeLocation = location;
      }),

    resetActiveLocation: () =>
      set((state) => {
        state.activeLocation = DEFAULT_LOCATION;
      }),
  })),
);

export default useLocationStore;
