import { Module, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { InvoicesModule } from './invoices/invoices.module';
import { ItemsModule } from './items/items.module';
import { PaymentsModule } from './payments/payments.module';
import { ShopsModule } from './shops/shops.module';
import { AuthModule } from './auth/auth.module';
import { ShopsModule } from './shops/shops.module';
import { ItemsModule } from './items/items.module';
import { InvoicesModule } from './invoices/invoices.module';
import { PaymentsModule } from './payments/payments.module';
import { CommonModule } from './common/common.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import * as redisStore from 'cache-manager-ioredis';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ShopsModule,
    ItemsModule,
    InvoicesModule,
    PaymentsModule,
    CommonModule,

  GraphQLModule.forRoot({
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  sortSchema: true,
  playground: true,
  context: ({ req }) => ({ req }),  // 👈 makes JWT available in resolvers
}),


    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'billingo',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // disable in production
    }),

    CacheModule.registerAsync({
      useFactory: () => ({
        store: redisStore,
        host: 'localhost',
        port: 6379,
      }),
    }),

    RabbitMQModule.forRoot(RabbitMQModule, {
    //   exchanges: [
    //     {
    //       name: 'billingo-exchange',
    //       type: 'topic',
    //     },
    //   ],
    //   uri: 'amqp://localhost:5672',
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
