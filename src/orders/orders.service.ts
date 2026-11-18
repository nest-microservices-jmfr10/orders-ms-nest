import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  create(createOrderDto: CreateOrderDto) {
    const order = this.prisma.order.create({ data: createOrderDto });
    return order;
  }

  findAll() {
    return `This action returns all orders`;
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findFirst({
      where: { id },
    });

    if (!order) {
      throw new RpcException({
        message: `Order with id ${id} not found`,
        status: HttpStatus.NOT_FOUND,
      });
    }

    return order;
  }
}
