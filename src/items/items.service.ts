import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { CreateItemDto, UpdateStockDto } from './dto/item.dto';
import { Shop } from '../shops/shop.entity';

@Injectable()
export class ItemsService {
  constructor(@InjectRepository(Item) private itemRepo: Repository<Item>) {}

  async create(dto: CreateItemDto, shop: Shop): Promise<Item> {
    const item = this.itemRepo.create({ ...dto, shop });
    return this.itemRepo.save(item);
  }

  async findAll(): Promise<Item[]> {
    return this.itemRepo.find({ relations: ['shop'] });
  }

  async findById(id: string): Promise<Item> {
    const item = await this.itemRepo.findOne({
      where: { id },
      relations: ['shop'],
    });
    if (!item) throw new NotFoundException('Item not found');
    return item;
  }

  async updateStock(id: string, dto: UpdateStockDto): Promise<Item> {
    const item = await this.findById(id);
    item.stock = dto.stock;
    return this.itemRepo.save(item);
  }
}
