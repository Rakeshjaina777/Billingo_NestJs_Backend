import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { ShopsResolver } from './shops.resolver';

@Module({
  providers: [ShopsService, ShopsResolver],
  controllers: [ShopsController]
})
export class ShopsModule {}
