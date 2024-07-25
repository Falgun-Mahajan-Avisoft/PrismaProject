import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { ArtistModule } from './artist/artist.module';
import { UserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';
import { PrismaService } from './prisma.service';
import { ApplicationModule } from './application/application.module';
import { AccountsModule } from './accounts/accounts.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './task/task.service';

@Module({
  imports: [SongsModule, ArtistModule, UserModule, PostsModule, ApplicationModule, AccountsModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService,PrismaService, TaskService],
})
export class AppModule {}
