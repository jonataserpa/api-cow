import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/PrismaService';
import { UserCreateDto } from '../dto/userCreate.dto';
import { UpdateModuleDto } from '../dto/userUpdate.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(userDto: UserCreateDto) {
    const user = await this.prisma.user.create({
      data: {
        name: userDto.name,
        dateborn: userDto.dateborn,
        email: userDto.email,
        phone: userDto.phone,
        radiogender: userDto.radiogender,
        companyId: userDto.companyId,
        address: {
          createMany: {
            data: userDto.address,
          },
        },
      },
    });

    return user;
  }

  async findAll(params: { skip?: number; take?: number; filter?: string }) {
    const { skip, take, filter } = params;
    let data;

    if (isNaN(skip)) {
      data = await this.prisma.user.findMany({
        include: {
          address: {
            include: {
              trail: false,
            },
          },
        },
      });
    } else {
      data = await this.prisma.user.findMany({
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
          address: {
            include: {
              trail: false,
            },
          },
        },
      });
    }

    const totalCount = await this.prisma.user.findMany();

    const dataUsers = {
      data,
      headers: totalCount.length === 1 ? 1 : totalCount.length - 1,
    };
    return dataUsers;
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      include: {
        address: {
          include: {
            trail: false,
          },
        },
      },
      where: { id },
    });
  }

  async update(id: number, userDto: UpdateModuleDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error(`User ${id} does not exist`);
    }

    const updateUser = await this.prisma.user.update({
      data: {
        name: userDto.name,
        dateborn: userDto.dateborn,
        email: userDto.email,
        phone: userDto.phone,
        radiogender: userDto.radiogender,
        companyId: userDto.companyId,
      },
      where: { id },
    });

    this.prisma.$transaction(
      userDto.address?.map((adr) =>
        this.prisma.address?.upsert({
          create: adr,
          update: {
            id: adr?.id,
            adrees: adr?.adrees,
            cep: adr?.cep,
            city: adr?.city,
            number_end: adr?.number_end,
            state: adr?.state,
            user_id: adr?.user_id,
          },
          where: { id: adr?.id },
        }),
      ),
    );

    return updateUser;
  }

  async remove(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error(`User does not exist`);
    }

    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
