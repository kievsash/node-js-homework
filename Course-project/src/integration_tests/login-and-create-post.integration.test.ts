import { INestApplication } from '@nestjs/common';
import * as crypto from "node:crypto";

const axios = require('axios');

describe('UsersController (e2e)', () => {
    let app: INestApplication;
    let userName: string;
    let pass: string;
    let access_token: string;

    beforeAll(async () => {
        userName = 'testuser_' + crypto.randomBytes(20).toString('hex');
        pass = crypto.randomBytes(20).toString('hex');

    });

    afterAll(async () => {
    });

    it('should create a new user', async () => {
        const response = await axios.post('http://localhost:3000/users', {
            username: userName,
            password: pass,
        });
        expect(response.status).toBe(201);
        expect(response.data).toEqual({ message: 'User created successfully' });
    });

    it('should login', async () => {
        const response = await axios.post('http://localhost:3000/auth/login', {
            username: userName,
            password: pass,
        });
        expect(response.status).toBe(201);
        access_token = response.data.access_token;
    });

    it('should add post', async () => {
        const response = await axios.post('http://localhost:3000/posts', {
            username: userName,
            content: 'This is a test post'
        }, { headers: { 'Authorization': `Bearer ${access_token}` } })

        expect(response.status).toBe(201);
    })
});
