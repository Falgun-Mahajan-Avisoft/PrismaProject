import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Prisma } from '@prisma/client';


@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() createArtistDto: Prisma.ArtistCreateInput) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artistService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArtistDto: Prisma.ArtistUpdateInput) {
    return this.artistService.update(+id, updateArtistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artistService.remove(+id);
  }
}
