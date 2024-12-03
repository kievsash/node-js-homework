import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
    let controller: AuthController;
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        validateUser: jest.fn(),
                        login: jest.fn(),
                        refreshAccessToken: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('login', () => {
        it('should return a user if validation is successful', async () => {
            const body = { username: 'testuser', password: 'testpass' };
            const user = { id: 1, username: 'testuser' };
            const mockToken = {
                access_token: 'new access token',
                refresh_token: 'new refresh token'
            }
            jest.spyOn(service, 'validateUser').mockResolvedValue(user);
            jest.spyOn(service, 'login').mockResolvedValue(mockToken);

            expect(await controller.login(body)).toBe(mockToken);
        });

        it('should throw UnauthorizedException if validation fails', async () => {
            const body = { username: 'testuser', password: 'testpass' };
            jest.spyOn(service, 'validateUser').mockResolvedValue(null);

            await expect(controller.login(body)).rejects.toThrow(
                UnauthorizedException,
            );
        });
    });

    describe('refresh', () => {
        it('should return a new token if refresh is successful', async () => {
            const body = { refresh_token: 'valid_token' };
            const mockToken = {
                access_token: 'new access token',
                refresh_token: 'new refresh token'
            }
            jest.spyOn(service, 'refreshAccessToken').mockResolvedValue(mockToken);

            expect(await controller.refresh(body)).toBe(mockToken);
        });

        it('should throw UnauthorizedException if refresh token is invalid', async () => {
            const body = { refresh_token: 'invalid_token' };
            jest.spyOn(service, 'refreshAccessToken').mockResolvedValue(null);

            await expect(controller.refresh(body)).rejects.toThrow(
                UnauthorizedException,
            );
        });
    });
});
