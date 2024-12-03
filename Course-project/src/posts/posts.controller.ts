import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Request,
  Body,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/guards/oauth2.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BodyParametersGuard } from '../guards/body-parameters-guard.service';

@UseGuards(JwtAuthGuard)
@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all post from authenticated user' })
  async getAllPosts(@Request() req: any) {
    return this.postService.getAllPosts(req.user.username);
  }

  @Post()
  @UseGuards(new BodyParametersGuard(['username', 'content']))
  @ApiOperation({ summary: 'Create post for user' })
  async createPost(@Body() body: { username: string; content: string }) {
    return this.postService.createPost(body.username, body.content);
  }

  @Put(':id')
  @UseGuards(new BodyParametersGuard(['content']))
  @ApiOperation({ summary: 'Update post for user by postId' })
  async updatePost(
    @Param('id') id: number,
    @Body() body: { content: string },
  ) {
    return this.postService.updatePost(id, body.content);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete post for user by postId' })
  async deletePost(@Param('id') id: number, @Request() req: any) {
    const user = req.user;

    const post = await this.postService.findPostById(id);
    if (!post) {
      throw new UnauthorizedException('Tweet not found');
    }

    if (post.username !== user.username) {
      throw new UnauthorizedException(
        'You are not authorized to delete this tweet',
      );
    }

    return this.postService.deletePost(id);
  }
}
