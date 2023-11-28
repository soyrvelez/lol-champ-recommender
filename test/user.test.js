const expect = require('chai').expect;
const db = require('../models');

before(function(done) {
  db.sequelize.sync({ force: true }).then(function() {
    done();
  });
});

describe('Creating a User', function() {
  it('should create successfully', function(done) {
    db.user.create({
      email: 'test@test.co',
      name: 'Muttbuncher',
      password: 'password'
    }).then(function() {
      done();
    }).catch(function(error) {
      done(error);
    });
  });

  it('should throw an error on invalid email addresses', function(done) {
    db.user.create({
      email: 'test',
      name: 'Brian',
      password: 'password'
    }).then(function(newUser) {
      done(newUser);
    }).catch(function(error) {
      done();
    });
  });

  it('should throw an error on invalid name', function(done) {
    db.user.create({
      email: 'test@test.co',
      name: '',
      password: 'password'
    }).then(function(newUser) {
      done(newUser);
    }).catch(function(error) {
      done();
    });
  });

  it('should throw an error on invalid password', function(done) {
    db.user.create({
      email: 'test@test.co',
      name: 'Brian',
      password: 'short'
    }).then(function(newUser) {
      done(newUser);
    }).catch(function(error) {
      done();
    });
  });

  it('should hash the password before save', function(done) {
    db.user.create({
      email: 'test@test.co',
      name: 'Muttbuncher',
      password: 'password'
    }).then(function(newUser) {
      if (newUser.password === 'password') {
        done(newUser);
      } else {
        done();
      }
    }).catch(function(error) {
      done(error);
    });
  });
});

describe('User instance methods', function() {
  describe('validPassword', function() {
    it('should validate a correct password', function(done) {
      db.user.findOne().then(function(user) {
        if (user.validPassword('123123123')) {
          done();
        } else {
          done(user);
        }
      }).catch(function(error) {
        done(error);
      });
    });

    it('should invalidate an incorrect password', function(done) {
      db.user.findOne().then(function(user) {
        if (!user.validPassword('nope')) {
          done();
        } else {
          done(user);
        }
      }).catch(function(error) {
        done(error);
      });
    });
  });

  describe('toJSON', function() {
    it('should return a user without a password field', function(done) {
      db.user.findOne().then(function(user) {
        if (user.toJSON().password === undefined) {
          done();
        } else {
          done(user);
        }
      }).catch(function(error) {
        done(error);
      });
    });
  });
});

describe('Updating a user', function() {
  it('should update successfully', function(done) {
    db.user.update({
      name: 'New Name',
    }, {
      where: { id: 1 }
    }).then(function() {
      return db.user.findByPk(1);
    }).then(function(updatedUser) {
      if (updatedUser.name === 'New Name') {
        done();
      } else {
        done(new Error('User was not updated successfully'));
      }
    }).catch(function(error) {
      done(error);
    });
  });
});

describe('Deleting a user', function() {
  it('should delete successfully', function(done) {
    db.user.destroy({
      where: {
        id: 1
      }
    }).then(function() {
      done();
    }).catch(function(error) {
      done(error);
    });
  });
});
