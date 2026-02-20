"use client";
// STEP 25: Setup react-pdf with Web Worker
// Initializes PDF.js worker for parsing and rendering PDF documents

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

type Props = {
  file: React.ComponentProps<typeof Document>["file"];
};

export default function PdfViewer({ file }: Props) {
  return (
    <Document file={file} loading={<p>Loading PDF…</p>}>
      <Page pageNumber={1} renderTextLayer renderAnnotationLayer />
    </Document>
  );
}
