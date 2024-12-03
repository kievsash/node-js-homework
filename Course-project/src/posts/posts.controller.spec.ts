import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/guards/oauth2.guard';
import { BodyParametersGuard } from '../guards/body-parameters-guard.service';
import { UnauthorizedException } from '@nestjs/common';

describe('PostsController', () => {
    let controller: PostsController;
    let service: PostsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PostsController],
            providers: [
                {
                    provide: PostsService,
                    useValue: {
                        getAllPosts: jest.fn(),
                        createPost: jest.fn(),
                        updatePost: jest.fn(),
                        findPostById: jest.fn(),
                        deletePost: jest.fn(),
                    },
                },
            ],
        })
            .overrideGuard(JwtAuthGuard)
            .useValue({ canActivate: jest.fn(() => true) })
            .overrideGuard(BodyParametersGuard)
            .useValue({ canActivate: jest.fn(() => true) })
            .compile();

        controller = module.get<PostsController>(PostsController);
        service = module.get<PostsService>(PostsService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getAllPosts', () => {
        it('should return all posts for authenticated user', async () => {
            const req = { user: { username: 'testuser' } };
            const result = ['post1', 'post2'];
            jest.spyOn(service, 'getAllPosts').mockResolvedValue(result);

            expect(await controller.getAllPosts(req)).toBe(result);
        });
    });

    describe('createPost', () => {
        it('should create a post for user', async () => {
            const body = { username: 'testuser', content: 'test content' };
            const result = { id: 1, ...body };
            jest.spyOn(service, 'createPost').mockResolvedValue(result);

            expect(await controller.createPost(body)).toBe(result);
        });
    });

    describe('updatePost', () => {
        it('should update a post for user by postId', async () => {
            const id = 1;
            const body = { content: 'updated content' };
            const result = { id, ...body };
            jest.spyOn(service, 'updatePost').mockResolvedValue(result);

            expect(await controller.updatePost(id, body)).toBe(result);
        });
    });

    describe('deletePost', () => {
        it('should delete a post for user by postId', async () => {
            const id = 1;
            const req = { user: { username: 'testuser' } };
            const tweet = { id, username: 'testuser' };
            jest.spyOn(service, 'findPostById').mockResolvedValue(tweet);
            jest.spyOn(service, 'deletePost').mockResolvedValue(true);

            expect(await controller.deletePost(id, req)).toBe(true);
        });

        it('should throw UnauthorizedException if post not found', async () => {
            const id = 1;
            const req = { user: { username: 'testuser' } };
            jest.spyOn(service, 'findPostById').mockResolvedValue(null);

            await expect(controller.deletePost(id, req)).rejects.toThrow(
                UnauthorizedException,
            );
        });

        it('should throw UnauthorizedException if user not authorized', async () => {
            const id = 1;
            const req = { user: { username: 'testuser' } };
            const tweet = { id, username: 'otheruser' };
            jest.spyOn(service, 'findPostById').mockResolvedValue(tweet);

            await expect(controller.deletePost(id, req)).rejects.toThrow(
                UnauthorizedException,
            );
        });
    });
});
