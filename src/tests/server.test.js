const supertest = require('supertest');
const { Server } = require('../server');
const app = new Server().getApp();
const API = supertest(app);
describe('Test for server', () => { 
    it('should return 200', async () => {
        const response = await API.get('/');
        expect(response.status).toBe(200);
    })
    it('should return 404', async () => {
        const response = await API.get('/api/notvalidroute');
        expect(response.status).toBe(404);
    })
   
    
 })