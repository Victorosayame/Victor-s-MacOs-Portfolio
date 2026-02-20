/**
 * STEP 36: Home Component - Desktop View
 * =======================================
 * Shows project folders directly on desktop (macOS style):
 * - Displays all projects from locations.work.children
 * - Each project appears as draggable folder icon
 * - Folder positions from CSS classes (windowPosition)
 * - Click handler opens Finder window focused on that project
 *
 * Visual Design:
 * - Projects scattered across desktop like macOS
 * - Name label below each folder icon
 * - Visual feedback on hover with group class
 */
"use client"


import { locations } from "@/constants";
import { registerGSAPPlugins } from "@/lib/gsap";
import useLocationStore from "@/store/location";
import useWindowStore from "@/store/window";
import { FolderItem } from "@/types/location";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";


const projects = (locations.work?.children ?? []).filter(
  (item): item is FolderItem => item.kind === "folder"
);

// Minimal Draggable instance interface for typing
interface IDraggableInstance {
  kill: () => void;
  // optionally, add more methods if you need: disable, enable, revert, etc.
}



const HomePage = () => {
  /**
   * STEP 37: Make Desktop Folders Draggable
   * ========================================
   * Uses GSAP Draggable plugin to allow users to drag folder icons:
   * - Creates Draggable instances for all .folder elements
   * - Auto-calculates constraints to keep folders in viewport
   * - Enables rearranging of project folders for organization
   * - Smooth drag performance using GSAP
   */
 useGSAP(() => {
  let cancelled = false;
  let draggableInstances: IDraggableInstance[] = [];

  (async () => {
    const Draggable = await registerGSAPPlugins();
    if (!Draggable || cancelled) return;

    draggableInstances = Draggable.create(".folder") as IDraggableInstance[];
  })();

  return () => {
    cancelled = true;
    draggableInstances.forEach((instance) => instance.kill());
  };
}, []);


  // STEP 38: Access Store for Window Navigation
  // Get location store to update Finder view and window store to open windows
  const { setActiveLocation } = useLocationStore();

  const { openWindow } = useWindowStore();

  /**
   * STEP 39: Handle Project Folder Click
   * ======================================
   * When a project folder is clicked:
   * 1. Updates activeLocation to that project
   * 2. Opens Finder window
   *
   * Result: Users navigate directly into project in Finder
   */
  type Project = (typeof projects)[number]

  const handleOpenProjectFinder = (project: Project) => {
    setActiveLocation(project);
    openWindow("finder");
  };
  return (
    <section id="home">
      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            className={clsx("group folder", project.windowPosition)}
            onClick={() => handleOpenProjectFinder(project)}
          >
            <img src="/images/folder.png" alt={project.name} />
            <p>{project.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default HomePage;
