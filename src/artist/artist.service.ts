import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ArtistService {
  constructor(private prisma:PrismaService){}
  create(createArtistDto: Prisma.ArtistCreateInput) {
    return this.prisma.artist.create({
      data:createArtistDto
    });
  }

  findAll() {
    return this.prisma.artist.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} artist`;
  }

  update(id: number, updateArtistDto: Prisma.ArtistUpdateInput) {
    return `This action updates a #${id} artist`;
  }

  remove(id: number) {
    return `This action removes a #${id} artist`;
  }
}
