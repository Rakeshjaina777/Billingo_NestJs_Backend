import { Controller, Get, Res, UseGuards, Query } from '@nestjs/common';
import { Response } from 'express';
import { ExportService } from './export.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Export')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('exports')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Get('csv')
  @Roles('Admin', 'Owner')
  @ApiOperation({ summary: 'Export items as CSV' })
  async exportCsv(@Res() res: Response) {
    const csv = await this.exportService.generateCsv();
    res.setHeader('Content-Disposition', 'attachment; filename=items.csv');
    res.setHeader('Content-Type', 'text/csv');
    res.send(csv);
  }

  @Get('pdf')
  @Roles('Admin', 'Owner')
  @ApiOperation({ summary: 'Export all invoices as PDF summary' })
  @ApiQuery({ name: 'title', required: false })
  async exportPdf(@Query('title') title: string, @Res() res: Response) {
    const buffer = await this.exportService.generatePdfReport(title);
    res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
    res.setHeader('Content-Type', 'application/pdf');
    res.send(buffer);
  }
}
