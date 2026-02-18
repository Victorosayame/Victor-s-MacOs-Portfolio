/**
 * STEP 21: WindowControls Component - Window Header Buttons
 * ===========================================================
 * Displays the standard macOS-style window control buttons in the window header:
 * - Red close button (•) - Closes the window and resets its state
 * - Yellow minimize button (•) - Disabled (placeholder for future functionality)
 * - Green maximize button (•) - Disabled (placeholder for future functionality)
 *
 * Props:
 * - target: Window key identifier (e.g., "finder", "resume") passed to closeWindow
 *
 * Integration:
 * - Uses Zustand store to access closeWindow action
 * - Only close button is functional in current implementation
 * - Styled to match macOS appearance with proper colors and positioning
 */
"use client"

import useWindowStore, { WindowKey } from "@/store/window";


const WindowControls = ({ target }: { target: WindowKey }) => {
  const { closeWindow } = useWindowStore();
  //TODO:Work on the minimize and maximize button
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
        disabled
      />
      <button
        type="button"
        className="maximize"
        aria-label="Maximize window"
        disabled
      />
    </div>
  );
};

export default WindowControls;
