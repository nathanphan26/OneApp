let mongoose = require('mongoose');
let reg = require('../routes/users');
let User = require('../models/user');
let server = require('../app');
let chai = require('chai');
let chaiHttp = require('chai-Http');
let should = chai.should();

chai.use(chaiHttp);


describe ('/POST user successfully', () => {
  it('User should register sucessfully', (done) => {
    let User = {
      fname: "John",
      lname: "Smith",
      email: "jsmithgmailcom",
      username: "jsmith",
      password: "123456"
    }
    chai.request(server)
    .post('/users/register')
    .send(User)
    .end((err, res) => {
      res.body.should.be.a('object');
      res.body.should.have.property('msg').eql('User registered');
    done();
    })
  })
})

describe ('/POST user log in successfully', () => {
  it('User should be able to log in successfully after registering with their credentials', (done) => {
    let User = {
      username: "jsmith",
      password: "123456"
    }
    chai.request(server)
    .post('/users/authenticate')
    .send(User)
    .end((err, res) => {
      res.body.should.have.property('success');
    done();
    })
  })
})

describe ('/POST user unsuccessfully', () => {
  it('User should NOT be able to register due to missing form fields', (done) => {
    let User = {
      fname: "John",
      email: "jsmith@gmail.com",
      password: "123456"
    }
    chai.request(server)
    .post('/users/register')
    .send(User)
    .end((err, res) => {
      res.body.should.have.property('msg').eql('Failed to register user');
    done();
    })
  })
})

describe ('/GET user unsuccessfully', () =>{
  it('Should not be able to GET user due to unauthorization', (done) =>{
    chai.request(server)
    .get('/users/profile')
    .end((err, res) =>{
      res.should.have.status(401);
    done();
    })
  })
})

describe ('/POST user with random unregistered user', () => {
  it('User not found message should appear if trying to log in with false info', (done) => {
    let User = {
      username: "iushriuhvu",
      password: "123456"
    }
    chai.request(server)
    .post('/users/authenticate')
    .send(User)
    .end((err, res) => {
      res.body.should.have.property('msg').eql('User not found');
    done();
    })
  })
})

describe ('/POST user with wrong password', () => {
  it('Wrong password message should show up if incorrect credentials are provided', (done) => {
    let User = {
      username: "admin",
      password: "1234562"
    }
    chai.request(server)
    .post('/users/authenticate')
    .send(User)
    .end((err, res) => {
      res.body.should.have.property('msg').eql('Wrong password');
    done();
    })
  })
})
