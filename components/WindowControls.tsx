/**
 * STEP 21: WindowControls Component - Window Header Buttons
 * ===========================================================
 * Displays the standard macOS-style window control buttons in the window header:
 * - Red close button (•) - Closes the window and resets its state
 * - Yellow minimize button (•) - Disabled (placeholder for future functionality)
 * - Green maximize button (•) - Disabled (placeholder for future functionality)
 *
 * Update: Minimize and maximize buttons are now implemented.
 * - Yellow (minimize): toggles minimize/restore via `minimizeWindow` / `restoreWindow` in the window store
 * - Green (maximize): toggles full-screen via `toggleMaximizeWindow` in the window store
 *
 * Props:
 * - target: Window key identifier (e.g., "finder", "resume") passed to closeWindow
 *
 * Integration:
 * - Uses Zustand store to access `closeWindow`, `minimizeWindow`, `restoreWindow`, and `toggleMaximizeWindow`
 * - Close/minimize/maximize now update global window state so all windows behave consistently
 * - Styled to match macOS appearance with proper colors and positioning
 */
"use client";

import useWindowStore, { WindowKey } from "@/store/window";

const WindowControls = ({ target }: { target: WindowKey }) => {
  const {
    closeWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    windows,
    restoreWindow,
  } = useWindowStore();

  const win = windows[target];
  const isMax = win?.isMaximized;
  const isMin = win?.isMinimized;

  // clicking the minimize button when already minimized should just restore
  const handleMinimize = () => {
    if (isMin) {
      restoreWindow(target);
    } else {
      minimizeWindow(target);
    }
  };

  return (
    <div id="window-controls">
      <button
        type="button"
        className="close"
        aria-label="Close window"
        onClick={() => closeWindow(target)}
      />
      <button
        type="button"
        className="minimize"
        aria-label="Minimize window"
        onClick={handleMinimize}
      />
      <button
        type="button"
        className="maximize"
        aria-label={isMax ? "Restore window" : "Maximize window"}
        onClick={() => toggleMaximizeWindow(target)}
      />
    </div>
  );
};

export default WindowControls;
