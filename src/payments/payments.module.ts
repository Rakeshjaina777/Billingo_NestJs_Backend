import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { Invoice } from '../invoices/invoice.entity';
import { Payment } from './payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Invoice])],
  providers: [PaymentsService],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
