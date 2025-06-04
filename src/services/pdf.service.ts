import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from '../invoices/invoice.entity';
import { Item } from '../items/item.entity';
import { Repository } from 'typeorm';
import { Parser } from 'json2csv';
import * as puppeteer from 'puppeteer';

@Injectable()
export class ExportService {
  constructor(
    @InjectRepository(Invoice) private invoiceRepo: Repository<Invoice>,
    @InjectRepository(Item) private itemRepo: Repository<Item>,
  ) {}

  async generateCsv(): Promise<string> {
    const items = await this.itemRepo.find();
    const parser = new Parser({ fields: ['id', 'name', 'price', 'stock'] });
    return parser.parse(items);
  }

  async generatePdfReport(title: string): Promise<Buffer> {
    const invoices = await this.invoiceRepo.find();

    const html = `
      <html>
        <head><style>table{width:100%;border-collapse:collapse}td,th{border:1px solid #ddd;padding:8px}</style></head>
        <body>
          <h1>${title || 'Billing Report'}</h1>
          <table>
            <tr><th>ID</th><th>Shop</th><th>User</th><th>Created At</th></tr>
            ${invoices
              .map(
                (inv) =>
                  `<tr><td>${inv.id}</td><td>${inv.shop.name}</td><td>${inv.user.email}</td><td>${inv.createdAt.toISOString().slice(0, 10)}</td></tr>`,
              )
              .join('')}
          </table>
        </body>
      </html>
    `;

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const buffer = await page.pdf({ format: 'A4' });
    await browser.close();

    return buffer;
  }
}
