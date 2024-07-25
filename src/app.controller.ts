import {
  Controller,
  Get,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { User } from './user.decorator';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private prisma: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('sequential')
  getSequentialResults() {
    return this.prisma.$transaction([
      this.prisma.post.findMany(),
      this.prisma.artist.findMany(),
      this.prisma.song.findMany(),
    ]);
  }

  @Post('uploads')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/files',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return {
      message: 'File uploaded successfully',
    };
  }

  @Post('uploads-png')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/files',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  uploadPngFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'png',
        })
        .addMaxSizeValidator({ maxSize: 10000 })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
    return {
      message: 'File uploaded successfully',
    };
  }

  @Get('/user/:id')
  findOne(@User() user: { id: Number; name: string }) {
    return user;
  }

  @Get('set-cookie')
  setCookie(@Res({ passthrough: true }) response: Response) {
    response.cookie(
      'UserId',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    );
    response.send('Cookie saved successfully');
  }

  @Get('get-cookie')
  getCookie(@Req() request:Request) {
  return request.cookies
  }
}
