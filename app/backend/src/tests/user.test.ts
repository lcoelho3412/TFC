import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import User from '../database/models/User';
import * as jwt from 'jsonwebtoken';

import { Response } from 'superagent';

import { login, token, user } from './mocks/user.mock'
import TokenValidation from '../utils/jwt';


chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Tests if login route works', () => {

   let chaiHttpResponse: Response;

   afterEach(()=> sinon.restore())

   it('tests if login is successful with valid email and password', async () => {
    sinon.stub(User, 'findOne').resolves(user as User)
    sinon.stub(jwt, 'sign').resolves(token)
    
    chaiHttpResponse = await chai 
        .request(app)
        .post('/login')
        .send(login);


     expect(chaiHttpResponse.status).to.be.equal(200);
     expect(chaiHttpResponse.body).to.be.deep.equal({ token });

   });

  it('tests if it is not possible to login with blank email', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: '', password: 'secret_admin' });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
  });

  it('tests if it is not possible to login with blank password', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password: '' });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
  });

  it('tests if it is not possible to login with Incorrect email', async () => {
    sinon.stub(User, 'findOne').resolves(null)

    chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'incorrect@email.com', password: 'secret_admin' });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
  });

  it('tests if it is not possible to login with Incorrect password', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password: 'incorrectPassword' });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
  });
});
