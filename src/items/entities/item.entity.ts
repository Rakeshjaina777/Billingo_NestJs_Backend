import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Shop } from 'src/shops/entities/shop.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', nullable: true })
  discount: number;

  @ManyToOne(() => Shop, (shop) => shop.items)
  shop: Shop;
}
