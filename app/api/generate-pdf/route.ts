import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';

function renderHtmlFromMarkdown(htmlContent: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Daniel's CV</title>
        <style>
          body {
              font-family: 'Courier New', Courier, monospace;
              font-size: 12px;
              line-height: 1.6;
              color: #000;
              margin: 10px;
              padding: 0;
          }
          h1, h2, h3, h4, h5, h6 {
              font-family: 'Courier New', Courier, monospace;
              font-weight: bold;
              color: #000;
              margin-top: 20px;
              margin-bottom: 10px;
              border-bottom: 1px solid #ddd;
              padding-bottom: 5px;
          }
          p { margin: 0 0 10px; }
          ul, ol { margin: 0 0 10px 20px; padding: 0; }
          li { margin-bottom: 5px; }
          a { color: #0366d6; text-decoration: none; position: relative; }
          a:hover { text-decoration: underline; }
          a::after { content: ' ↗'; font-size: 0.9em; color: #0366d6; }
          hr { border: 0; height: 1px; background: #ddd; margin: 20px 0; }
          strong { font-weight: bold; color: #000; }
          code, pre { font-family: 'Courier New', Courier, monospace; background-color: #f5f5f5; padding: 2px 4px; border-radius: 3px; color: #c7254e; }
          table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f5f5f5; font-weight: bold; }
          footer { font-size: 10px; text-align: center; color: #777; margin-top: 40px; }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
    </html>
  `;
}

async function markdownToHtml(markdown: string): Promise<string> {
  const processor = remark().use(remarkGfm).use(remarkHtml);
  const htmlResult = await processor.process(markdown);
  return String(htmlResult);
}

async function generatePdfFromMarkdown(markdown: string): Promise<Uint8Array> {
  const htmlContent = await markdownToHtml(markdown);
  const completeHtml = renderHtmlFromMarkdown(htmlContent);
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-gpu'
    ],
  });
  const page = await browser.newPage();
  await page.setContent(completeHtml, { waitUntil: 'networkidle0' });
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: {
      top: '10mm',
      right: '10mm',
      bottom: '10mm',
      left: '10mm',
    }
  });
  await browser.close();
  return pdfBuffer;
}

export async function GET(request: NextRequest) {
  try {
    const mdFilePath = path.join(process.cwd(), 'public', 'daniel_cv.md');
    const markdownContent = await fs.readFile(mdFilePath, 'utf-8');
    const pdfBuffer = await generatePdfFromMarkdown(markdownContent);
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Daniel Rodríguez Mariblanca - CV.pdf"',
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { markdown } = await request.json();
    if (typeof markdown !== 'string') {
      return NextResponse.json({ error: 'Invalid markdown' }, { status: 400 });
    }
    const pdfBuffer = await generatePdfFromMarkdown(markdown);
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Daniel Rodríguez Mariblanca - CV.pdf"',
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
} 