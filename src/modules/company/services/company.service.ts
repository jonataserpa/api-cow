import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/PrismaService';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async create(companyDto: CreateCompanyDto) {
    const user = await this.prisma.company.create({
      data: {
        reasonsocial: companyDto.reasonsocial,
        namefantasy: companyDto.namefantasy,
        CNPJ: companyDto.CNPJ,
        phone: companyDto.phone,
        address: {
          createMany: {
            data: companyDto.address,
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
      data = await this.prisma.company.findMany({
        include: {
          address: {
            include: {
              trail: false,
            },
          },
        },
      });
    } else {
      data = await this.prisma.company.findMany({
        skip,
        take,
        where: {
          reasonsocial: {
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

    const totalCount = await this.prisma.company.findMany();

    const dataCompanys = {
      data,
      headers: totalCount.length === 1 ? 1 : totalCount.length - 1,
    };
    return dataCompanys;
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

  async update(id: number, companyDto: UpdateCompanyDto) {
    const company = await this.prisma.company.findUnique({
      where: { id },
    });

    if (!company) {
      throw new Error(`company ${id} does not exist`);
    }

    const updateCompany = await this.prisma.company.update({
      data: {
        reasonsocial: companyDto.reasonsocial,
        namefantasy: companyDto.namefantasy,
        CNPJ: companyDto.CNPJ,
        phone: companyDto.phone,
      },
      where: { id },
    });

    this.prisma.$transaction(
      companyDto.address.map((adr) =>
        this.prisma.address.upsert({
          where: { id: adr.id },
          update: {
            adrees: adr.adrees,
            cep: adr.cep,
            city: adr.city,
            number_end: adr.number_end,
            state: adr.state,
            company_id_address: adr.company_id_address,
          },
          create: adr,
        }),
      ),
    );

    return updateCompany;
  }

  async remove(id: number) {
    const company = await this.prisma.company.findUnique({
      where: { id },
    });

    if (!company) {
      throw new Error(`company does not exist`);
    }

    return await this.prisma.company.delete({
      where: { id },
    });
  }
}
