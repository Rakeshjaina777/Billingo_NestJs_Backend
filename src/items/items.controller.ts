import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Request,
  Put,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto, UpdateStockDto } from './dto/item.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { ShopsService } from '../shops/shops.service';

@ApiTags('Items')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('items')
export class ItemsController {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly shopsService: ShopsService,
  ) {}

  @Post()
  @Roles('Admin', 'Owner')
  @ApiOperation({ summary: 'Create an item in a shop' })
  @ApiBody({ type: CreateItemDto })
  @ApiResponse({ status: 201 })
  async create(@Body() dto: CreateItemDto, @Request() req) {
    const shop = await this.shopsService.findById(dto.shopId);
    return this.itemsService.create(dto, shop);
  }

  @Get()
  @ApiOperation({ summary: 'List all items' })
  @ApiResponse({ status: 200 })
  async findAll() {
    return this.itemsService.findAll();
  }

  @Put(':id/stock')
  @Roles('Admin', 'Owner')
  @ApiOperation({ summary: 'Update item stock' })
  @ApiBody({ type: UpdateStockDto })
  @ApiResponse({ status: 200 })
  async updateStock(@Param('id') id: string, @Body() dto: UpdateStockDto) {
    return this.itemsService.updateStock(id, dto);
  }
}
