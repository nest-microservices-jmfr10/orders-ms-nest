import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma.service';
import { RpcException } from '@nestjs/microservices';
import { ChangeOrderStatusDto, PaginationOrderDto } from './dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  create(createOrderDto: CreateOrderDto) {
    const order = this.prisma.order.create({ data: createOrderDto });
    return order;
  }

  async findAll(paginationOrderDto: PaginationOrderDto) {
    const totalPages = await this.prisma.order.count({
      where: {
        status: paginationOrderDto.status,
      },
    });

    const currentPage = paginationOrderDto.page ?? 1;
    const limit = paginationOrderDto.limit ?? 10;

    return {
      data: await this.prisma.order.findMany({
        skip: (currentPage - 1) * limit,
        take: limit,
        where: {
          status: paginationOrderDto.status,
        },
      }),
      meta: {
        total: totalPages,
        page: currentPage,
        lastPage: Math.ceil(totalPages / limit),
      },
    };
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

  async changeStatus(changeOrderStatusDto: ChangeOrderStatusDto) {
    const { id, status } = changeOrderStatusDto;
    const order = await this.findOne(id);
    if (order.status === status) return order;

    return this.prisma.order.update({ where: { id }, data: { status } });
  }
}
