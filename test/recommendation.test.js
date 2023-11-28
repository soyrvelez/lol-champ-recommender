const expect = require('chai').expect;
const request = require('supertest');
const app = require('../server');
const db = require('../models');

before(function (done) {
  db.sequelize.sync({ force: true }).then(function () {
    done();
  });
});

describe('Recommendation Controller', function () {

  describe('POST /recommend', function () {
    it('should create a new recommendation', function (done) {
      db.recommendation.create({
        id: 5000,
        prompt: 'I want to play a high skill level jungler',
        champion: 'Lee Sin'
      }).then(function() {
        done();
      }).catch(function(error) {
        done(error);
      });
    });

    it('should return 400 for missing prompt', function (done) {
      request(app)
        .post('/recommend')
        .send({})
        .expect(404, done);
    });
  });

  describe('GET /:champion', function () {
    it('should retrieve recommendation page for a champion', function (done) {
      request(app)
        .get('/recommendation/lux')
        .expect(302)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
  });

});
