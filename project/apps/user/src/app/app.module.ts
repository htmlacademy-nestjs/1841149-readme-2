import { Module } from '@nestjs/common';
import { BlogUserModule } from './blog-user/blog-user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigUserModule, getMongooseOptions } from '@project/config-user';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    BlogUserModule,
    AuthenticationModule,
    ConfigUserModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
