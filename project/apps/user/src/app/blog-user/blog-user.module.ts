import { Module } from '@nestjs/common';
import { BlogUserRepository } from './blog-user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogUserModel, BlogUserSchema } from './blog-user.model';
import { BlogUserService } from './blog-user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogUserModel.name, schema: BlogUserSchema },
    ]),
  ],
  providers: [BlogUserRepository, BlogUserService],
  exports: [BlogUserRepository, BlogUserService],
})
export class BlogUserModule {}
