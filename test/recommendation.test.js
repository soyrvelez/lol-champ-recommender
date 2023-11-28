const expect = require('chai').expect;
const request = require('supertest');
const app = require('../server');
const db = require('../models');

before(function(done) {
  db.sequelize.sync({ force: true }).then(function() {
    done();
  });
});

describe('Recommendation Controller', function() {

  describe('POST /recommend', function() {
    it('should create a new recommendation', function(done) {
      request(app)
        .post('/recommend')
        .send({
          id: 1,
          prompt: 'I want to play a high skill ceiling jungler'
        })
        .expect(302)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });

    it('should return 400 for missing prompt', function(done) {
      request(app)
        .post('/recommend')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          // No prompt provided
        })
        .expect(400, done);
    });
  });

  describe('GET /:champion', function() {
    it('should retrieve recommendation data for a champion', function(done) {
      request(app)
        .get('/championName') // Replace 'championName' with a test champion name
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          // Additional assertions e.g. check if the body contains expected champion data.
          done();
        });
    });

    it('should handle non-existing champions', function(done) {
      request(app)
        .get('/nonExistingChampion')
        .expect(404, done);
    });
  });

  // Additional tests for other controller functions
});

// Helper function tests
describe('Helper Functions', function() {
  // Tests for getChampionRecommendation, isChampionPresent, etc.
});
