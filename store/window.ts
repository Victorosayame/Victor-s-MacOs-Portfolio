/**
 * STEP 14: Create Global Window State Store with Zustand
 * =========================================================
 * Installation: npm install zustand
 *
 * This store manages the state of ALL windows in the application:
 * - Open/close status for each window
 * - Z-index for proper layering (which window is on top)
 * - Associated data for each window (e.g., file data for text viewer)
 * - Z-index counter to manage automatic layering on focus
 *
 * Middleware:
 * - Immer middleware: Allows "mutating" state for simpler, more intuitive updates
 * - Handles immutability automatically behind the scenes
 *
 * State Structure:
 * {
 *   windows: { [windowKey]: { isOpen, zIndex, data } },
 *   nextZIndex: number
 * }
 *
 * Actions:
 * - openWindow(windowKey, data?): Opens window and sets z-index
 * - closeWindow(windowKey): Closes window and resets to default z-index
 * - focusWindow(windowKey): Brings window to front by incrementing z-index
 *
 * New Actions (added later):
 * - minimizeWindow(windowKey): Sends the window to the dock (hidden, state preserved)
 * - restoreWindow(windowKey): Restores a minimized window and brings it to front
 * - toggleMaximizeWindow(windowKey): Toggles full-screen/maximized state for a window
 *
 * Notes:
 * - Minimize sets `isMinimized = true` and hides the window (treated like closed for visibility)
 * - Maximize clears transforms/max-width and expands the window to cover the viewport; maximized windows are focused
 * - openWindow/closeWindow reset the minimize/maximize flags to keep state consistent
 */
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "@/constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// Export a typed key for windows so consumers can avoid `any`.
export type WindowKey = keyof typeof WINDOW_CONFIG;

interface WindowState {
  isOpen: boolean;
  zIndex: number;
  data: unknown | null;
  /** whether the window has been sent to the dock (hidden but not closed) */
  isMinimized: boolean;
  /** true when the window has been expanded to fill the screen */
  isMaximized: boolean;
}

type WindowsMap = Record<string, WindowState>;

interface WindowStore {
  windows: WindowsMap;
  nextZIndex: number;

  openWindow: (windowKey: WindowKey, data?: unknown) => void;
  closeWindow: (windowKey: WindowKey) => void;
  focusWindow: (windowKey: WindowKey) => void;
  minimizeWindow: (windowKey: WindowKey) => void;
  restoreWindow: (windowKey: WindowKey) => void;
  toggleMaximizeWindow: (windowKey: WindowKey) => void;
}

const useWindowStore = create<WindowStore>()(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,

    openWindow: (windowKey: WindowKey, data: unknown | null = null) =>
      set((state) => {
        const existingWindow = state.windows[windowKey];
        if (!existingWindow) return;
        existingWindow.isOpen = true;
        existingWindow.isMinimized = false; // restoring from dock if needed
        existingWindow.isMaximized = false; // always start in normal size when opened
        existingWindow.zIndex = state.nextZIndex;
        existingWindow.data = data ?? existingWindow.data;
        state.nextZIndex++;
      }),
    closeWindow: (windowKey: WindowKey) =>
      set((state) => {
        const existingWindow = state.windows[windowKey];
        //if the windowKey is invalid, do nothing
        if (!existingWindow) return;
        existingWindow.isOpen = false;
        existingWindow.zIndex = INITIAL_Z_INDEX;
        existingWindow.data = null;
        existingWindow.isMinimized = false;
        existingWindow.isMaximized = false;
      }),
    focusWindow: (windowKey: WindowKey) =>
      set((state) => {
        const existingWindow = state.windows[windowKey];
        existingWindow.zIndex = state.nextZIndex++;
      }),
    minimizeWindow: (windowKey: WindowKey) =>
      set((state) => {
        const existingWindow = state.windows[windowKey];
        if (!existingWindow) return;
        existingWindow.isMinimized = true;
        existingWindow.isOpen = false;
      }),
    restoreWindow: (windowKey: WindowKey) =>
      set((state) => {
        const existingWindow = state.windows[windowKey];
        if (!existingWindow) return;
        existingWindow.isMinimized = false;
        existingWindow.isOpen = true;
        // bring back to top
        existingWindow.zIndex = state.nextZIndex++;
      }),
    toggleMaximizeWindow: (windowKey: WindowKey) =>
      set((state) => {
        const existingWindow = state.windows[windowKey];
        if (!existingWindow) return;
        // toggling maximize should always ensure the window is visible
        existingWindow.isMinimized = false;
        existingWindow.isOpen = true;
        existingWindow.isMaximized = !existingWindow.isMaximized;
        // if we're maximizing bring it to front
        if (existingWindow.isMaximized) {
          existingWindow.zIndex = state.nextZIndex++;
        }
      }),
  })),
);

export default useWindowStore;
