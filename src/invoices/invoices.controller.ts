import {
  Controller,
  Post,
  Body,
  Request,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/invoice.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Invoices')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  @Roles('Admin', 'Owner')
  @ApiOperation({ summary: 'Create an invoice' })
  @ApiBody({ type: CreateInvoiceDto })
  @ApiResponse({ status: 201 })
  async create(@Body() dto: CreateInvoiceDto, @Request() req) {
    return this.invoicesService.create(dto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all invoices' })
  @ApiResponse({ status: 200 })
  async findAll() {
    return this.invoicesService.findAll();
  }

  @Get(':id')
  @ApiOperation({  summary: 'Get invoice by ID' })
  @ApiResponse({ status: 200 })
  async findOne(@Param('id') id: string) {
    return this.invoicesService.findById(id);
  }
}
