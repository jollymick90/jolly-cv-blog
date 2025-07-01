import puppeteer from 'puppeteer';
import { existsSync } from 'fs';
import path from 'path';
import fs from 'fs/promises';

export async function GET({ request }) {
  const { url, lang, mode } = await extractUrlRequest(request);
  console.log("call ", url)
  
  const fileName = `cv-${lang}-${mode}-pagina.pdf`;
  const pdfFilePath = path.resolve('static/generated', fileName);
  
  if (existsSync(pdfFilePath)) {
    const cachedPdf = await fs.readFile(pdfFilePath);
    console.log('[Cache hit] Serving cached PDF:', fileName);
    return new Response(cachedPdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="pagina.pdf"',
      }
    });
  }

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await page.goto(url);
  const pdfBuffer = await page.pdf({ format: 'A4' });
  
  await browser.close();

  await fs.mkdir(path.dirname(pdfFilePath), { recursive: true });
  await fs.writeFile(pdfFilePath, pdfBuffer);

  return new Response(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="pagina.pdf"',
    }
  });

}


async function extractUrlRequest(request: any) {
  console.log("request", request.url);
  let lang = 'en';
  let mode = 'short';
  const paramsSplitted = request.url.split('?');

  if (paramsSplitted.length > 0) {
    const listParams = paramsSplitted[1].split('&');
    for (const fullParam of listParams) {
      const key = fullParam.split('=')[0];
      const value = fullParam.split('=')[1];
      if (key === 'lang' && (value === 'it' || value === 'en')) {
        lang = value;
        continue;
      }

      if (key === 'mode' && (value === 'short' || value === 'full')) {
        mode = value;
      }
    }
  }
  const baseUrl = process.env.PUBLIC_BASE_URL || 'http://localhost:5173';
  let url = `${baseUrl}/${lang}/print`;
  if (mode === 'full') {
    url += '/full';
  }
  return { url, lang, mode };
}

