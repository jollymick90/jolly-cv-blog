import puppeteer from 'puppeteer';
// import chromium from '@sparticuz/chromium';
import { existsSync } from 'fs';
import path from 'path';
import fs from 'fs/promises';

export async function GET({ request }) {
  const { url, lang, mode } = await extractUrlRequest(request);

  const resultNameFile = `cv_michele_scarpa_${lang}`;
  const headerResponse = {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${resultNameFile}.pdf"`,
    }
  }
  console.log("call ", url)

  const fileName = `cv-${lang}-${mode}-pagina.pdf`;
  const pdfFilePath = path.resolve('static/generated', fileName);

  // if (existsSync(pdfFilePath)) {
  //   const cachedPdf = await fs.readFile(pdfFilePath);
  //   console.log('[Cache hit] Serving cached PDF:', fileName);
  //   return new Response(cachedPdf, headerResponse);
  // }

  const browser = await getBrowser(url);
  if (browser) {
    const page = await browser.newPage();

    await page.goto(url);
    const pdfBuffer = await page.pdf({ format: 'A4' });

    await browser.close();

    await fs.mkdir(path.dirname(pdfFilePath), { recursive: true });
    await fs.writeFile(pdfFilePath, pdfBuffer);
    return new Response(pdfBuffer, headerResponse);
  } else {
    const cvFileName = `${lang}_michele_scarpa_cv.pdf`;
    const cvFilePath = path.resolve('static', cvFileName);
    const cachedPdf = await fs.readFile(cvFilePath);
    return new Response(cachedPdf, headerResponse);
  }




}


async function getBrowser(url: string) {
  let browser = null;

  try {
    browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();

    await page.goto(url);
  } catch (error) {
  }

  // try {
  //   browser = await puppeteer.launch({
  //     args: [...chromium.args],
  //     // defaultViewport: chromium.defaultViewport,
  //     executablePath: await chromium.executablePath(),
  //     // headless: chromium.headless,
  //     // ignoreHTTPSErrors: true,
  //   });

  //   let page = await browser.newPage();

  //   await page.goto('https://example.com');

  //   await page.title();
  // } catch (error) {
  //   console.error("error page", error);
  //   browser = null;
  // } finally {
  //   if (browser !== null) {
  //     await browser.close();
  //   }
  // }
  return browser;
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

