/**
 * STEP 16: WindowWrapper HOC (Higher-Order Component)
 * ======================================================
 * A Higher-Order Component that wraps window components to provide:
 * 1. Window state management (open/close, z-index, data)
 * 2. Focus mechanism (brings window to front on click)
 * 3. Drag functionality (allows moving windows around screen)
 * 4. Animation effects (smooth open/close transitions)
 * 5. Layout management with proper z-index based on focus
 *
 * How it works:
 * - Wraps any component and returns a window-enhanced version
 * - Takes windowKey parameter to identify which window in state
 * - Applies GSAP animations for smooth entrance/exit effects
 * - Sets up GSAP Draggable for drag-to-move functionality
 * - Integrates with Zustand store for global state
 * - Respect minimize/maximize state: minimized windows are hidden; maximized windows fill the viewport
 *
 * Update: When a window is maximized the wrapper clears transforms and max-width
 * and sets inset to cover the viewport so per-window CSS positioning doesn't
 * constrain the maximized display.
 */
"use client";

import gsap, { registerGSAPPlugins } from "@/lib/gsap";
import useWindowStore, { WindowKey } from "@/store/window";
import { useGSAP } from "@gsap/react";

import { ComponentType, useEffect, useLayoutEffect, useRef } from "react";

// Type for wrapped component props
interface WindowProps<T = unknown> {
  data?: T;
}

// Minimal Draggable instance interface for typing
interface IDraggableInstance {
  kill: () => void;
  // optionally, add more methods if you need: disable, enable, revert, etc.
}

const WindowWrapper = <P extends WindowProps>(
  Component: ComponentType<P>,
  windowKey: WindowKey,
) => {
  const Wrapped = (props: P) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex, isMinimized, isMaximized } = windows[windowKey];
    const ref = useRef<HTMLDivElement>(null);

    /**
     * STEP 19: Implement Window Open Animation with Focus
     * =====================================================
     * When a window opens or gains focus:
     * - Initial state: scaled down (0.8) and transparent (opacity 0)
     * - Animated to: full size (1.0) and visible (opacity 1)
     * - Vertical movement: appears to "pop" up from below (y: 40 → 0)
     * - Animation settings: 0.4s duration with power3.out easing (smooth deceleration)
     * - Only runs if window is actually open (isOpen = true)
     * - GSAP context automatically managed by useGSAP hook
     */
    useGSAP(() => {
      const currentElement = ref.current;
      if (!currentElement || !isOpen) return () => {};

      currentElement.style.display = "block";

      gsap.fromTo(
        currentElement,
        {
          scale: 0.8,
          opacity: 0,
          y: 40,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        },
      );
    }, [isOpen]);

    /**
     * STEP 20: Implement Draggable Window Functionality
     * ==================================================
     * Enables users to drag windows by their headers across the screen:
     * - Uses GSAP Draggable plugin for performant dragging
     * - Auto-calculates boundary constraints based on element position
     * - On mouse press during drag: brings window to focus (highest z-index)
     * - Window automatically becomes topmost when user starts dragging
     * - Returns cleanup function that destroys Draggable instance on unmount
     *
     * User Experience:
     * - Smooth drag with no lag
     * - Windows jump to front when clicked, confirming focus
     * - All windows can be arranged/organized by user
     */
    useEffect(() => {
      const currentElement = ref.current;
      if (!currentElement) return;

      let cancelled = false;
      // Register plugin and create Draggable dynamically
      let draggableInstance: IDraggableInstance | null = null;
      (async () => {
        const Draggable = await registerGSAPPlugins();
        if (!Draggable || cancelled || !ref.current) return;

        const [instance] = Draggable.create(ref.current, {
          onPress: () => focusWindow(windowKey),
        }) as IDraggableInstance[];

        draggableInstance = instance;
      })();

      return () => {
        cancelled = true;
        draggableInstance?.kill();
      };
    }, [windowKey, focusWindow]);

    // STEP 19 (continued): Handle Window Visibility State
    // Updates DOM display property based on isOpen state for proper layering
    useLayoutEffect(() => {
      const currentElement = ref.current;
      if (!currentElement) return () => {};

      // if the window is minimized treat it as closed from a visibility perspective
      const visible = isOpen && !isMinimized;
      currentElement.style.display = visible ? "block" : "none";
    }, [isOpen, isMinimized]);

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{
          zIndex,
          // visibility already handled in useLayoutEffect; set opacity to 0 to enable animation
          opacity: 0,
          ...(isMaximized
            ? {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: "100vw",
                height: "100vh",
                transform: "none",
                maxWidth: "none",
              }
            : {}),
        }}
        className={`absolute ${isMaximized ? "maximized" : ""}`}
      >
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

  return Wrapped;
};

export default WindowWrapper;
