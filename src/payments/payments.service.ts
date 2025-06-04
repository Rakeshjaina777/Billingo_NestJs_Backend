import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { Invoice } from '../invoices/invoice.entity';
import { CreatePaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
    @InjectRepository(Invoice) private invoiceRepo: Repository<Invoice>,
  ) {}

  async addPayment(dto: CreatePaymentDto): Promise<Payment> {
    const invoice = await this.invoiceRepo.findOne({
      where: { id: dto.invoiceId },
    });
    if (!invoice) throw new NotFoundException('Invoice not found');

    const existing = await this.paymentRepo.find({
      where: { invoice: { id: dto.invoiceId } },
    });
    const paidSum = existing.reduce(
      (acc, p) => acc + parseFloat(p.amount.toString()),
      0,
    );
    const remaining = 10000 - paidSum; // Use dynamic total logic in real use

    if (dto.amount > remaining) {
      throw new BadRequestException('Payment exceeds remaining invoice amount');
    }

    const payment = this.paymentRepo.create({
      amount: dto.amount,
      method: dto.method,
      invoice,
    });

    return this.paymentRepo.save(payment);
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentRepo.find();
  }
}
