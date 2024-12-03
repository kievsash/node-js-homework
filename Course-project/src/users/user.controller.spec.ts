import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { BodyParametersGuard } from '../guards/body-parameters-guard.service';

describe('UsersController', () => {
    let controller: UsersController;
    let service: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: {
                        findOneByUsername: jest.fn(),
                        createUser: jest.fn(),
                    },
                },
            ],
        })
            .overrideGuard(BodyParametersGuard)
            .useValue({ canActivate: jest.fn(() => true) })
            .compile();

        controller = module.get<UsersController>(UsersController);
        service = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('findOne', () => {
        it('should return user info for a specific username', async () => {
            const username = 'testuser';
            const result = { username: 'testuser', password: 'hashedpassword' };
            jest.spyOn(service, 'findOneByUsername').mockResolvedValue(result);

            expect(await controller.findOne(username)).toBe(result);
        });
    });

    describe('create', () => {
        it('should create a new user', async () => {
            const body = { username: 'newuser', password: 'newpassword' };
            jest.spyOn(service, 'createUser').mockResolvedValue(undefined);

            expect(await controller.create(body)).toEqual({
                message: 'User created successfully',
            });
        });
    });
});
