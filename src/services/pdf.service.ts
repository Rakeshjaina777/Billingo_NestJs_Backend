import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PdfService {
  async generateInvoicePdf(invoice: Invoice): Promise<Buffer> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const html = this.renderHtml(invoice); // Your HTML template logic
    await page.setContent(html);
    const pdfBuffer = await page.pdf({ format: 'A4' });

    await browser.close();
    return pdfBuffer;
  }

  renderHtml(invoice: Invoice): string {
    return `<html><body><h1>Invoice #${invoice.invoiceNumber}</h1>
      <p>Customer: ${invoice.customerName}</p>
      <ul>
        ${invoice.items.map((item) => `<li>${item.item.name} x ${item.quantity} = ${item.price}</li>`).join('')}
      </ul>
      </body></html>`;
  }
}
