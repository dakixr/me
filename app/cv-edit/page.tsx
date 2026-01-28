"use client";

import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { saveAs } from "file-saver";
import { EditorView } from '@codemirror/view';
import { markdown } from "@codemirror/lang-markdown";
import { oneDark } from "@codemirror/theme-one-dark";

const CodeMirror = dynamic(() => import("@uiw/react-codemirror"), { ssr: false });
const codeMirrorExtensions = [markdown(), EditorView.lineWrapping];

export default function CVEditPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [previewContent, setPreviewContent] = useState("");
  const [pendingContent, setPendingContent] = useState<string | null>(null);
  const editorViewRef = useRef<EditorView | null>(null);

  // Load markdown file on demand
  const handleLoadCV = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/daniel_cv.md");
      const text = await response.text();
      setPreviewContent(text);

      // Always set pendingContent, so onCreateEditor can pick it up if needed
      setPendingContent(text);

      // If editor is already mounted, dispatch content
      if (editorViewRef.current) {
        editorViewRef.current.dispatch({
          changes: { from: 0, to: editorViewRef.current.state.doc.length, insert: text },
          selection: { anchor: 0 }
        });
        setPendingContent(null); // Clear pendingContent since we just injected it
      }
    } catch {
      setPreviewContent("Error loading markdown");
      setPendingContent("Error loading markdown");
    } finally {
      setIsLoading(false);
    }
  };

  // Download as PDF (calls API route)
  const handleExportPDF = async () => {
    setPdfLoading(true);
    try {
      const res = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markdown: previewContent }),
      });
      if (!res.ok) throw new Error("Failed to generate PDF");
      const blob = await res.blob();
      saveAs(blob, "Daniel_Rodriguez_Mariblanca_CV.pdf");
    } catch {
      alert("Failed to export PDF");
    } finally {
      setPdfLoading(false);
    }
  };

  // Download as Markdown
  const handleExportMD = () => {
    const blob = new Blob([previewContent], { type: "text/markdown" });
    saveAs(blob, "daniel_cv.md");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181c20] to-[#23272f] text-white flex flex-col font-sans">
      {/* Action Bar */}
      <div className="sticky top-0 z-10 flex justify-between items-center px-6 py-3 bg-[#23272f] border-b border-gray-800 shadow-sm">
        <div>
          <button
            className="rounded-lg px-4 py-2 font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 border border-gray-700 shadow transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50"
            onClick={handleLoadCV}
            disabled={isLoading}
          >
            Load CV
          </button>
        </div>
        <div className="flex gap-3">
          <button
            className="rounded-lg px-4 py-2 font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 border border-gray-700 shadow transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50"
            onClick={handleExportMD}
          >
            Download .md
          </button>
          <button
            className="rounded-lg px-4 py-2 font-medium bg-accent text-white hover:bg-accent-dark active:bg-accent/80 border border-accent shadow transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:opacity-60"
            onClick={handleExportPDF}
            disabled={pdfLoading}
          >
            {pdfLoading ? "Exporting..." : "Export to PDF"}
          </button>
        </div>
      </div>
      <main className="flex flex-1 min-h-0">
        {/* Editor */}
        <section className="w-1/2 flex flex-col min-h-0 border-r border-gray-800 bg-[#20242c]">
          <div className="flex-1 min-h-0 px-6 pb-6 pt-6">
            <div className="h-full rounded-lg overflow-hidden border border-gray-800 shadow-inner bg-[#23272f]">
              <CodeMirror
                onCreateEditor={view => {
                  editorViewRef.current = view;
                  // Always inject pendingContent if set
                  if (pendingContent !== null) {
                    view.dispatch({
                      changes: { from: 0, to: view.state.doc.length, insert: pendingContent },
                      selection: { anchor: 0 }
                    });
                    setPendingContent(null);
                    setPreviewContent(pendingContent);
                  }
                }}
                onChange={value => setPreviewContent(value)}
                height="100%"
                theme={oneDark}
                extensions={codeMirrorExtensions}
                basicSetup={{ lineNumbers: true }}
                style={{ minHeight: '100%', height: '100%', fontSize: 16, background: 'transparent', overflow: 'auto' }}
              />
            </div>
          </div>
        </section>
        {/* Divider */}
        <div className="w-0.5 bg-gradient-to-b from-transparent via-gray-800 to-transparent" />
        {/* Live Preview */}
        <section className="w-1/2 flex flex-col min-h-0 bg-[#20242c]">
          <div className="flex-1 min-h-0 px-6 pb-6 pt-6 flex flex-col">
            <div className="flex-1 overflow-auto rounded-lg border border-gray-800 shadow-lg bg-[#23272f] p-6 prose prose-invert max-w-none scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
              <ReactMarkdown
                rehypePlugins={[rehypeRaw, rehypeHighlight]}
                remarkPlugins={[remarkGfm]}
                components={{}}
              >
                {previewContent}
              </ReactMarkdown>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 