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
    { id: 3, user_id: '3', comment: 'This is a third comment' },
    { id: 4, user_id: '4', comment: 'This is a fourth comment' },
    { id: 5, user_id: '5', comment: 'This is a fifth comment' },
    { id: 6, user_id: '6', comment: 'This is a sixth comment' },
    { id: 7, user_id: '7', comment: 'This is a seventh comment' },
    { id: 8, user_id: '8', comment: 'This is a eighth comment' },
    { id: 9, user_id: '9', comment: 'This is a ninth comment' },
    { id: 10, user_id: '10', comment: 'This is a tenth comment' },
    { id: 11, user_id: '11', comment: 'This is a eleventh comment' },
    { id: 12, user_id: '12', comment: 'This is a twelfth comment' },
    { id: 13, user_id: '13', comment: 'This is a thirteenth comment' },
    { id: 14, user_id: '14', comment: 'This is a fourteenth comment' },
    { id: 15, user_id: '15', comment: 'This is a fifteenth comment' },
    { id: 16, user_id: '16', comment: 'This is a sixteenth comment' },
    { id: 17, user_id: '17', comment: 'This is a seventeenth comment' },
    { id: 18, user_id: '18', comment: 'This is a eighteenth comment' },
    { id: 19, user_id: '19', comment: 'This is a nineteenth comment' },
    { id: 20, user_id: '20', comment: 'This is a twentieth comment' },
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
