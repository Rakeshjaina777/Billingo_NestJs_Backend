import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, IsString, Min } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty()
  @IsUUID()
  invoiceId: string;

  @ApiProperty()
  @IsNumber()
  @Min(0.01)
  amount: number;

  @ApiProperty({ example: 'Cash / Card / UPI / Online' })
  @IsString()
  method: string;
}
