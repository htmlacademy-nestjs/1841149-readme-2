import { Module } from '@nestjs/common';
import { BlogUserModule } from './blog-user/blog-user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigUserModule } from '@project/libs/shared/config/user-config';

@Module({
  imports: [
    BlogUserModule,
    AuthenticationModule,
    ConfigUserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
