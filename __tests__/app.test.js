const app = require('../app');
const request = require('supertest');
const { default: mongoose } = require('mongoose');

describe('GET /', () => { 
    it('responds with a 200 status code', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        mongoose.connection.close(); 
    });
    
    it('responds with an HTML page', async () => {
        await request(app).get('/').expect('Content-Type', /html/);
        mongoose.connection.close();
    });
})

describe('GET unexistent route', () => {
    afterEach(() => {
        mongoose.connection.close();
    })

    it('responds with a 404 status code', async () => {
        await request(app).get('/unexistent').expect(404); 
    });

    it('responds with an HTML page', async () => {
        await request(app).get('/unexistent').expect('Content-Type', /html/);
    });
});

describe('Test importing production environment variables when', () => {
    it('does not import the variables in the env file', async () => {
        const dbMock = jest.mock('../services/database');
        jest.resetModules();
        process.env.NODE_ENV = 'production';
        const mock = jest.spyOn(require('dotenv'), 'config');
        const app = require('../app');
        expect(mock).not.toHaveBeenCalled();
    });

    it('imports the variables in the env file', async () => {
        const dbMock = jest.mock('../services/database');
        jest.resetModules();
        process.env.NODE_ENV = 'development';
        const mock = jest.spyOn(require('dotenv'), 'config');
        const app = require('../app');
        expect(mock).toHaveBeenCalled();
    });
});