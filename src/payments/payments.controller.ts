import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/payment.dto';
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
import { Payment } from './payment.entity';

@ApiTags('Payments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @Roles('Admin', 'Owner')
  @ApiOperation({ summary: 'Add a payment to an invoice' })
  @ApiBody({ type: CreatePaymentDto })
  @ApiResponse({ status: 201, type: Payment })
  addPayment(@Body() dto: CreatePaymentDto) {
    return this.paymentsService.addPayment(dto);
  }

  @Get()
  @Roles('Admin')
  @ApiOperation({ summary: 'List all payments (Admin only)' })
  @ApiResponse({ status: 200, type: [Payment] })
  getAll() {
    return this.paymentsService.findAll();
  }
}
