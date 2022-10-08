import { Module } from '@nestjs/common';
import { CommentService } from './comment/comment.service';
import { HttpModule } from '@nestjs/axios';
import { CommentController } from './comment/comment.controller';

@Module({
  imports: [HttpModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class AppModule {}
