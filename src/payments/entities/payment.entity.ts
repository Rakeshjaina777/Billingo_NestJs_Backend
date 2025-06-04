import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { Invoice } from '../invoices/invoice.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Invoice, { eager: true })
  invoice: Invoice;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  method: string;

  @CreateDateColumn()
  paidAt: Date;
}
