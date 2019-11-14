
const server = require('../api/server');
const request = require('supertest');
const Users = require('./users-model');
const db = require('../database/dbConfig');

describe('users model', () => {
    beforeEach(async () => {
      await db('users').truncate();
    })
    describe('insert()', () => {
        it('should insert user into the db', async () => {
          await Users.insert({ username: 'Test1', password: 'Test1' });
          const response = await db('users');      
          expect(response).toHaveLength(1);
        });
    
        it('should fail to insert user into the db', async () => {
          try {
            await Users.insert({ username: 'TestInsert' });
          } catch (error) {
            expect(error);
          }
        });
      });
    
      describe('find()', () => {
        it('should retrieve two users from the db', async () => {
          await Users.insert({ username: 'Test1', password: 'Test1' });
          await Users.insert({ username: 'Test2', password: 'Test2' });
          const users = await Users.find();
          expect(users).toHaveLength(2);
        });
      });
    
      describe('remove(id)', () => {
        it('should delete one user from the db', async () => {
          await Users.insert({ username: 'Test1', password: 'Test1'});
          await Users.insert({ username: 'Test2', password: 'Test2'});
          const deleted = await Users.remove(1);      
          expect(deleted).toBe(1);
          const response = await Users.find();      
          expect(response).toHaveLength(1);
        });
    
        it('should fail to delete non-existant user', async () => {
          const deleted = await Users.remove(1);      
          expect(deleted).toBe(0);
        });
      });
    })