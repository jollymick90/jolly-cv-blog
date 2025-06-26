import puppeteer from 'puppeteer';

export async function GET() {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5173/en/print');
  const pdfBuffer = await page.pdf({ format: 'A4' });
  
  await browser.close();
  
  return new Response(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="pagina.pdf"',
    }
  });

}


