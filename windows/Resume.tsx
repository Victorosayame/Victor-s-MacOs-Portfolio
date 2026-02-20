/**
 * STEP 23: Resume Window - PDF Display
 * ======================================
 * Displays resume as an embedded PDF document:
 * - Uses react-pdf library for PDF rendering
 * - Shows first page of resume file
 * - Includes download button in window header
 * - Handles text layer and annotation layer styling
 */

"use client";

import { WindowControls } from "@/components";
import WindowWrapper from "@/hoc/WindowWrapper";
import { Download } from "lucide-react";
import dynamic from "next/dynamic";

// Load the PDF viewer only on the client to avoid server-side PDF.js DOM usage
const PdfViewer = dynamic(() => import("@/components/PDFViewer"), {
  ssr: false,
});

const Resume = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="resume" />

        <h2>Resume.pdf</h2>
        <a
          href="files/resume.pdf"
          download
          className="cursor-pointer"
          title="Download resume"
        >
          <Download className="icon" />
        </a>
      </div>

      {/* Render PDF viewer only on the client */}
      <PdfViewer file="files/resume.pdf" />
    </>
  );
};

const ResumeWindow = WindowWrapper(Resume, "resume");

export default ResumeWindow;
