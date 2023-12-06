import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CommentService {
  private comments: CommentEntity[] = [
    {
      id: 1,
      user_id: '1',
      comment: 'This is a comment!',
    },
    {
      id: 2,
      user_id: '2',
      comment: 'This is another comment',
    },
  ];

  constructor(private readonly httpservice: HttpService) {}

  async create(createCommentDto: CreateCommentDto) {
    try {
      await firstValueFrom(
        this.httpservice.get(
          `https://github.com/users/${createCommentDto.user_id}`,
        ),
      );

      const lastId = this.comments[this.comments.length - 1]?.id || 0;

      const newComment = {
        id: lastId + 1,
        ...createCommentDto,
      };

      this.comments.push(newComment);

      return newComment;
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return this.comments;
  }

  findOne(id: number) {
    const comment = this.comments.find((comment) => comment.id === id);

    if (!comment) {
      throw new Error(`Comentário ${id} não encontrado`);
    }

    return comment;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = this.findOne(id);

    const index = this.comments.indexOf(comment);

    const newComment = {
      ...comment,
      ...updateCommentDto,
    };

    this.comments[index] = newComment;

    return newComment;
  }

  remove(id: number) {
    const comment = this.findOne(id);

    const index = this.comments.indexOf(comment);

    this.comments.splice(index, 1);
  }
}
