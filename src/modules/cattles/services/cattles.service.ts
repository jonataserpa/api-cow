import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/PrismaService';
import { CreateCattleDto } from '../dto/create-cattle.dto';
import { UpdateCattleDto } from '../dto/update-cattle.dto';

@Injectable()
export class CattlesService {
  constructor(private prisma: PrismaService) {}

  async create(cattlesDto: CreateCattleDto) {
    const cattles = await this.prisma.cattles.create({
      data: {
        name: cattlesDto.name,
        dateborn: cattlesDto.dateborn,
        namefather: cattlesDto.namefather,
        proprietary: cattlesDto.proprietary,
        observacion: cattlesDto.observacion,
        children: {
          createMany: {
            data: cattlesDto?.children,
          },
        },
      },
    });

    return cattles;
  }

  async findAll(params: { skip?: number; take?: number; filter?: string }) {
    const { skip, take, filter } = params;
    let data;

    if (isNaN(skip)) {
      data = await this.prisma.cattles.findMany({
        include: {
          children: {
            include: {
              trail: false,
            },
          },
        },
      });
    } else {
      data = await this.prisma.cattles.findMany({
        skip,
        take,
        where: {
          name: {
            contains: filter,
          },
        },
        orderBy: {
          id: 'desc',
        },
        include: {
          children: {
            include: {
              trail: false,
            },
          },
        },
      });
    }

    const totalCount = await this.prisma.cattles.findMany();

    const dataCattles = {
      data,
      headers: totalCount.length === 1 ? 1 : totalCount.length - 1,
    };
    return dataCattles;
  }

  findOne(id: number) {
    return this.prisma.cattles.findUnique({
      include: {
        children: {
          include: {
            trail: false,
          },
        },
      },
      where: { id },
    });
  }

  async update(id: number, cattlesDto: UpdateCattleDto) {
    const cattle = await this.prisma.cattles.findUnique({
      where: { id },
    });

    if (!cattle) {
      throw new Error(`cattle ${id} does not exist`);
    }

    const updateCattle = await this.prisma.cattles.update({
      data: {
        name: cattlesDto.name,
        dateborn: cattlesDto.dateborn,
        namefather: cattlesDto.namefather,
        proprietary: cattlesDto.proprietary,
        observacion: cattlesDto.observacion,
      },
      where: { id },
    });

    this.prisma.$transaction(
      cattlesDto.children.map((cattle) =>
        this.prisma.children.upsert({
          where: { id: cattle.id },
          update: {
            name: cattle.name,
            dateborn: cattle.dateborn,
            namefather: cattle.namefather,
            proprietary: cattle.proprietary,
            observacion: cattle.observacion,
            cattlesId: cattle.cattlesId,
          },
          create: cattle,
        }),
      ),
    );

    return updateCattle;
  }

  async remove(id: number) {
    const cattle = await this.prisma.cattles.findUnique({
      where: { id },
    });

    if (!cattle) {
      throw new Error(`cattle does not exist`);
    }

    return await this.prisma.cattles.delete({
      where: { id },
    });
  }
}
