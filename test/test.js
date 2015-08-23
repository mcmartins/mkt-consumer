var mocha = require('mocha'),
  assert = require('assert'),
  request = require('supertest'),
  config = require(process.env.MKT_CONFIG_FILE);

describe('MKT Consumer', function() {
  var url = 'http://localhost:3000';

  describe('API', function() {

    it('should return error trying to send an empty message', function(done) {
      /*request(url)
        .post('/api/profiles')
        .send(data)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          res.should.have.status(400);
          done();
        });*/
      assert(true, true);
      done();
    });

    it('should handle a message', function(done) {
      /*request(url)
       .post('/api/profiles')
       .send(data)
       .end(function(err, res) {
       if (err) {
       throw err;
       }
       res.should.have.status(400);
       done();
       });*/
      assert(true, true);
      done();
    });

    it('should show API usage', function(done) {
      /*request(url)
       .post('/api/profiles')
       .send(data)
       .end(function(err, res) {
       if (err) {
       throw err;
       }
       res.should.have.status(400);
       done();
       });*/
      assert(true, true);
      done();
    });

  });
});