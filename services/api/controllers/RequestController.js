var request = require('request');

module.exports = {
  /*
  * entry point for all requests - they get redirected to their
  * respective service based on the requested intent
  */
  get: function(req, res) {

    let intent = req.param('intentName') || req.body.result.metadata.intentName;
    let params = req.param('parameters') || JSON.stringify(req.body.result.parameters);
    let url = 'courseinformation/' + intent + '?parameters=' + params;

    if (!intent || !params) {
      return res.badRequest({
        status: 'error',
        msg: 'invalid arguments'
      });
    }

    // Set the response header
    res.header("Content-Type", "application/json; charset=utf-8");

    // make the GET request
    request('http://localhost:1337/' + url, function(err, response) {

      if (err) return console.error(err.message);
      return res.ok(response.body);
    });
  }
}
