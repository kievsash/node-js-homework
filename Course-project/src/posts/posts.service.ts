import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { RedisClientType } from 'redis';

@Injectable()
export class PostsService {
  constructor(
      @Inject('DATABASE_POOL') private readonly pool: Pool,
      @Inject('REDIS') private readonly redis: RedisClientType,
  ) {}

  async getAllPosts(username: string): Promise<any> {

    const cacheKey = `user:${username}:posts`;
    const cachedUserPosts = await this.redis.get(cacheKey);
    if (cachedUserPosts) {
      return JSON.parse(cachedUserPosts);
    }

    const result = await this.pool.query('SELECT * FROM posts WHERE username = $1', [username]);

    if (result) {
      this.redis.set(cacheKey, JSON.stringify(result.rows), { EX: 3600 })
    }
    return result.rows;
  }

  async createPost(username: string, content: string): Promise<any> {
    const result = await this.pool.query(
      'INSERT INTO posts (username, content) VALUES ($1, $2) RETURNING *',
      [username, content],
    );
    return result.rows[0];
  }

  async updatePost(id: number, content: string): Promise<any> {
    const result = await this.pool.query(
      'UPDATE posts SET content = $1 WHERE id = $2 RETURNING *',
      [content, id],
    );
    return result.rows[0];
  }

  async deletePost(id: number): Promise<any> {
    await this.pool.query('DELETE FROM posts WHERE id = $1', [id]);
    return { message: `Post with id ${id} deleted successfully` };
  }

  async findPostById(id: number): Promise<any> {
    const result = await this.pool.query('SELECT * FROM posts WHERE id = $1', [
      id,
    ]);
    return result.rows[0];
  }
}
