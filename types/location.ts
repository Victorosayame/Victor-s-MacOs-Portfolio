// STEP 29 Create a single recursive union type:

// FileItem (kind: "file")

// FolderItem (kind: "folder")

// FolderItem must allow optional type because only top-level folders use it

// Ensure all location constants (WORK_LOCATION, ABOUT_LOCATION, etc.) are explicitly typed as FolderItem to prevent deep literal inference

// Update Zustand location store so Location equals FolderItem

// Refactor openItem() to:

// Narrow using item.kind === "file" and item.kind === "folder"

// Remove dynamic window key generation

// Use an explicit fileType → WindowKey mapping

// The solution must compile in strict mode with:

// No any

// No never

// No structural mismatch errors

// No dynamic string window keys

// Keep everything fully type-safe.

export type FileType = "txt" | "img" | "url" | "fig" | "pdf";

export type FileItem = {
  id: number;
  name: string;
  icon: string;
  kind: "file";
  fileType: FileType;
  position?: string;
  windowPosition?: string;
  href?: string;
  imageUrl?: string;
  description?: string[];
  subtitle?: string;
  image?: string;
};

export type FolderItem = {
  id: number;
  name: string;
  icon: string;
  kind: "folder";
  type?: string; // 🔥 optional because only top-level has it
  position?: string;
  windowPosition?: string;
  children: FinderItem[];
};

export type FinderItem = FileItem | FolderItem;
