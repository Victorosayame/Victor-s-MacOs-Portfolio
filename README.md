This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

````bash
npm run dev
# or
# Victor's MacOS Portfolio

This repository implements a MacOS-style portfolio UI built with Next.js, TypeScript, Tailwind CSS, GSAP, and Zustand.

## Quick Start

Prerequisites:
- Node.js 18+ (recommended)
- npm or pnpm

Install dependencies:

```bash
npm install
# or
pnpm install
````

Run dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
npm run start
```

## Project Structure (high level)

- `app/` - Next.js app routes and global styles
- `components/` - Shared UI components (Navbar, Dock, WindowControls, etc.)
- `hoc/WindowWrapper.tsx` - HOC that wraps windows with drag, focus, animation, visibility, and maximize/minimize handling
- `store/window.ts` - Zustand store managing global window state (open, close, z-index, minimize, maximize)
- `windows/` - Individual window UI pieces (Finder, Contact, Photo, Terminal, Text, Image, Resume, Safari)
- `constants/` - App constants (initial window config, locations, data)

## Step-by-step implementation notes

These steps correspond to the `STEP ##` comments across the codebase. The most relevant steps are listed here and include additions for the minimize/maximize features.

- STEP 14: Create Global Window State Store with Zustand
  - Implements `useWindowStore` with `windows` map and `nextZIndex`.
  - Actions: `openWindow`, `closeWindow`, `focusWindow`.
  - Added actions: `minimizeWindow`, `restoreWindow`, `toggleMaximizeWindow`.
  - New window state fields: `isMinimized`, `isMaximized`.

- STEP 16: `WindowWrapper` HOC
  - Wraps each window component and applies GSAP open animations.
  - Adds Draggable behavior so windows can be dragged.
  - Respects `isOpen` and `isMinimized` for visibility.
  - When maximized, clears transforms and sizing constraints and fills the viewport.

- STEP 19: Window open animation using GSAP
  - Smooth pop-in animation when a window opens.

- STEP 20: Draggable window functionality
  - Uses GSAP Draggable to allow dragging and focuses the window on press.

- STEP 21: `WindowControls` component (Close/Minimize/Maximize)
  - Close button calls `closeWindow`.
  - Minimize calls `minimizeWindow` (or `restoreWindow` if already minimized).
  - Maximize toggles `toggleMaximizeWindow` and restores from minimize when maximizing.

- Additional steps:
  - Updated per-window CSS to include a `.maximized` fallback style that removes transforms and max-width constraints.
  - Ensured inline maximize styles include `transform: none` and `maxWidth: none` to override per-window CSS like `max-w-*` and translate offsets.

## How minimize & maximize work (implementation details)

- Minimize:
  - `minimizeWindow(windowKey)` sets `isMinimized = true` and `isOpen = false`.
  - The `WindowWrapper` treats minimized windows as not visible (`display: none`).
  - State is preserved; calling `restoreWindow(windowKey)` sets `isMinimized = false`, `isOpen = true`, and increments `zIndex` to bring it forward.

- Maximize:
  - `toggleMaximizeWindow(windowKey)` toggles `isMaximized` and sets `isOpen = true` and `isMinimized = false`.
  - When `isMaximized` is true the wrapper applies inline styles (`top:0,left:0,right:0,bottom:0,width:100vw,height:100vh,transform:none,maxWidth:none`) and adds `maximized` CSS class.
  - This overrides per-window `left/top/max-width/transform` CSS so the window fills the screen.

## Testing the features

1. Start the dev server: `npm run dev`.
2. Open a window (e.g., Contact or Photos) via the Dock or Navbar.
3. Click the yellow dot to minimize; the window should hide but its state is preserved.
4. Click the yellow dot again on the same app to restore it.
5. Click the green dot to maximize; the window should fill the viewport.
6. Click the green dot again to restore to the previous size/position.

## Future improvements

- Add a Dock UI that visually shows minimized windows and allows restoring via clicks.
- Animate maximize/restore transitions for smoother UX.
- Persist window positions/sizes to localStorage to survive reloads.
- Add keyboard shortcuts for window management (e.g., Cmd+M to minimize).

## Notes for contributors

- File layout and STEP comments are used to track implementation progress and map code to the tutorial steps.
- When adding features, update the STEP comments near relevant files so the README remains accurate.

---

If you want, I can also:

- Update the per-window CSS to remove `max-w-*` and absolute offsets so maximized behavior is handled purely by the wrapper, or
- Add a short animated transition for maximize/restore in `WindowWrapper` using GSAP.

Tell me which follow-up you'd like and I'll implement it.
