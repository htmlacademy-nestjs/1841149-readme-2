import { Module } from '@nestjs/common';
import { AuthentificationController } from './authentification.controller';
import { FeedController } from './feed.controller';
import { FilesController } from './files.controller';
import { PostsController } from './post.controller';
import { HttpModule } from '@nestjs/axios';
import { HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT } from './app.config';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { SubscribeController } from './subscribe.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    }),
  ],
  controllers: [
    AuthentificationController,
    FeedController,
    FilesController,
    PostsController,
    SubscribeController,
  ],
  providers: [CheckAuthGuard],
})
export class AppModule {}
