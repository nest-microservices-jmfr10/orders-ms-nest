import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [OrdersModule],
  providers: [PrismaService],
})
export class AppModule {}
