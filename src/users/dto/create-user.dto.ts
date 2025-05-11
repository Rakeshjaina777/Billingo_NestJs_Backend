import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { UserRole } from '../entities/user.entity';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(6)
  password: string;

  @Field(() => UserRole)
  @IsEnum(UserRole)
  role: UserRole;
}
