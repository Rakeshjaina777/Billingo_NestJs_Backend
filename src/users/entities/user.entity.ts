import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Shop } from 'src/shops/entities/shop.entity';
import { Invoice } from 'src/invoices/entities/invoice.entity';

export enum UserRole {
  ADMIN = 'admin',
  OWNER = 'owner',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @ManyToOne(() => Shop, (shop) => shop.users, { nullable: true })
  shop: Shop;

  @OneToMany(() => Invoice, (invoice) => invoice.createdBy)
  invoices: Invoice[];
}
