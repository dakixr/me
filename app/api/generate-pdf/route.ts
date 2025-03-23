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
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            h1, h2, h3 {
              color: #2c3e50;
            }
            h1 {
              text-align: center;
              border-bottom: 1px solid #eee;
              padding-bottom: 10px;
            }
            h2 {
              border-bottom: 1px solid #eee;
              padding-bottom: 5px;
            }
            a {
              color: #3498db;
              text-decoration: none;
            }
            ul {
              margin-top: 5px;
            }
            li {
              margin-bottom: 5px;
            }
            .item {
              margin-bottom: 15px;
            }
            .date {
              font-style: italic;
              color: #7f8c8d;
            }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;

    // Launch browser with the default browser - don't specify executablePath
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    // Set content and generate PDF
    await page.setContent(completeHtml, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px',
      }
    });

    await browser.close();

    // Return the PDF as a response
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="daniel_cv.pdf"',
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