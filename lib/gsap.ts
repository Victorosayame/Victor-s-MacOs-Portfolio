/**
 * STEP 17: Register GSAP Plugins in Root Component
 * ===================================================
 * This is the recommended place to register GSAP plugins globally.
 * The Draggable plugin is required for window drag functionality implemented
 * in the WindowWrapper HOC. By registering it here in the root component,
 * it becomes available to all child components that use GSAP animations.
 */
"use client";

import gsap from "gsap";

export const registerGSAPPlugins = async () => {
  if (typeof window === "undefined") return; // SSR guard

  const { Draggable } = await import("gsap/dist/Draggable");
  gsap.registerPlugin(Draggable);
  return Draggable;
};

export default gsap;