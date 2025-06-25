import puppeteer from 'puppeteer';

export async function GET() {
  console.log("---- pdf action")
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  await page.goto('https://jolly-cv-blog-git-develop-jollymick90s-projects.vercel.app/it/print');
  
  const pdfBuffer = await page.pdf({ format: 'A4' });
  
  await browser.close();
  
  return new Response(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="pagina.pdf"',
    }
  });
}
