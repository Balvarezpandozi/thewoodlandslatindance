const _ = require('../../app');
const Database = require('../database');

describe('Test Database', () => {
    it('should connect', () => {
        const setMock = jest.spyOn(require('mongoose'), 'set');
        const connectMock = jest.spyOn(require('mongoose'), 'connect')
        const db = new Database();
        db.connect();
        expect(setMock).toHaveBeenCalledWith('runValidators', true);
        expect(connectMock).toHaveBeenCalledWith('mongodb://127.0.0.1:27017/');
    });
});