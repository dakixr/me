"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { saveAs } from "file-saver";
import { motion } from "framer-motion";

const CodeMirror = dynamic(() => import("@uiw/react-codemirror"), { ssr: false });
import { markdown } from "@codemirror/lang-markdown";
import { oneDark } from "@codemirror/theme-one-dark";

export default function CVEditPage() {
  const [content, setContent] = useState("");
  const [original, setOriginal] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [pdfLoading, setPdfLoading] = useState(false);
  const editorRef = useRef(null);

  // Load markdown file
  useEffect(() => {
    const fetchMarkdown = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/daniel_cv.md");
        const text = await response.text();
        setContent(text);
        setOriginal(text);
      } catch (error) {
        setContent("Error loading markdown");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMarkdown();
  }, []);

  // Reload original content
  const handleReload = () => setContent(original);

  // Download as PDF (calls API route)
  const handleExportPDF = async () => {
    setPdfLoading(true);
    try {
      // Send current markdown to API for PDF generation
      const res = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markdown: content }),
      });
      if (!res.ok) throw new Error("Failed to generate PDF");
      const blob = await res.blob();
      saveAs(blob, "Daniel_Rodriguez_Mariblanca_CV.pdf");
    } catch (e) {
      alert("Failed to export PDF");
    } finally {
      setPdfLoading(false);
    }
  };

  // Download as Markdown
  const handleExportMD = () => {
    const blob = new Blob([content], { type: "text/markdown" });
    saveAs(blob, "daniel_cv.md");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="flex justify-between items-center p-4 border-b border-gray-700">
        <button
          className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700 border border-gray-600"
          onClick={handleReload}
          disabled={isLoading}
        >
          Reload original
        </button>
        <div className="flex gap-2">
          <button
            className="bg-accent px-4 py-2 rounded hover:bg-accent-dark border border-accent"
            onClick={handleExportPDF}
            disabled={pdfLoading}
          >
            {pdfLoading ? "Exporting..." : "Export to PDF"}
          </button>
          <button
            className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700 border border-gray-600"
            onClick={handleExportMD}
          >
            Download .md
          </button>
        </div>
      </header>
      <main className="flex flex-1 min-h-0">
        {/* Editor */}
        <section className="w-1/2 p-4 flex flex-col border-r border-gray-700 min-h-0">
          <h2 className="mb-2 font-bold">Markdown file</h2>
          <div className="flex-1 min-h-0">
            {typeof window !== "undefined" && CodeMirror ? (
              <CodeMirror
                value={content}
                height="calc(100vh - 120px)"
                theme={oneDark}
                extensions={[markdown()]}
                onChange={setContent}
                basicSetup={{ lineNumbers: true }}
                ref={editorRef}
              />
            ) : (
              <textarea
                className="w-full h-full bg-black text-white border border-gray-700 rounded p-2"
                value={content}
                onChange={e => setContent(e.target.value)}
              />
            )}
          </div>
        </section>
        {/* Live Preview */}
        <section className="w-1/2 p-4 flex flex-col min-h-0">
          <h2 className="mb-2 font-bold text-center">LIVE PREVIEW</h2>
          <div className="flex-1 overflow-auto bg-gray-900 rounded p-4 prose prose-invert max-w-none">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
              remarkPlugins={[remarkGfm]}
            >
              {content}
            </ReactMarkdown>
          </div>
        </section>
      </main>
    </div>
  );
} 