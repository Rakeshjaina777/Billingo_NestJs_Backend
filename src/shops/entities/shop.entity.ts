import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Item } from 'src/items/entities/item.entity';
import { Invoice } from 'src/invoices/entities/invoice.entity';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  contactNumber: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  logoUrl: string;

  @OneToMany(() => User, (user) => user.shop)
  users: User[];

  @OneToMany(() => Item, (item) => item.shop)
  items: Item[];

  @OneToMany(() => Invoice, (invoice) => invoice.shop)
  invoices: Invoice[];
}
