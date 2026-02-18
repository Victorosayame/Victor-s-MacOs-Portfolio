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

import useWindowStore, { WindowKey } from "@/store/window";


const WindowControls = ({ target }: { target: WindowKey }) => {
  const { closeWindow } = useWindowStore();
  //TODO:Work on the minimize and maximize button
  return (
    <div id="window-controls">
      <div className="close" onClick={() => closeWindow(target)} />
      <div className="minimize" />
      <div className="maximize" />
    </div>
  );
};

export default WindowControls;
