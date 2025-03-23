import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';

export async function GET(request: NextRequest) {
  try {
    // Read the markdown file
    const mdFilePath = path.join(process.cwd(), 'public', 'daniel_cv.md');
    const markdownContent = await fs.readFile(mdFilePath, 'utf-8');

    // Convert markdown to HTML
    const processor = remark().use(remarkGfm).use(remarkHtml);
    const htmlResult = await processor.process(markdownContent);
    const htmlContent = String(htmlResult);

    // Complete HTML with styling
    const completeHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Daniel's CV</title>
          <style>
            /* General Styles */
            body {
                font-family: 'Courier New', Courier, monospace;
                font-size: 12px;
                line-height: 1.6;
                color: #000;
                margin: 10px;
                padding: 0;
            }

            /* Header Styles */
            h1, h2, h3, h4, h5, h6 {
                font-family: 'Courier New', Courier, monospace;
                font-weight: bold;
                color: #000;
                margin-top: 20px;
                margin-bottom: 10px;
                border-bottom: 1px solid #ddd;
                padding-bottom: 5px;
            }

            /* Paragraph Styles */
            p {
                margin: 0 0 10px;
            }

            /* List Styles */
            ul, ol {
                margin: 0 0 10px 20px;
                padding: 0;
            }

            li {
                margin-bottom: 5px;
            }

            /* Link Styles */
            a {
                color: #0366d6;
                text-decoration: none;
                position: relative;
            }

            a:hover {
                text-decoration: underline;
            }

            a::after {
                content: ' ↗'; /* This is the symbol that will appear after the link */
                font-size: 0.9em; /* Adjust the size of the symbol */
                color: #0366d6; /* Match the color of the symbol with the link color */
            }

            /* Horizontal Rule */
            hr {
                border: 0;
                height: 1px;
                background: #ddd;
                margin: 20px 0;
            }

            /* Strong Text */
            strong {
                font-weight: bold;
                color: #000;
            }

            /* Code Block Styles */
            code, pre {
                font-family: 'Courier New', Courier, monospace;
                background-color: #f5f5f5;
                padding: 2px 4px;
                border-radius: 3px;
                color: #c7254e;
            }

            /* Table Styles */
            table {
                border-collapse: collapse;
                width: 100%;
                margin-bottom: 20px;
            }

            th, td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
            }

            th {
                background-color: #f5f5f5;
                font-weight: bold;
            }

            /* Footer Styles */
            footer {
                font-size: 10px;
                text-align: center;
                color: #777;
                margin-top: 40px;
            }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;

    // Launch browser
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
      executablePath: process.env.NODE_ENV === 'production' 
        ? '/usr/bin/google-chrome-stable' 
        : undefined
    });
    const page = await browser.newPage();
    
    // Set content and generate PDF
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

    // Return the PDF as a response
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