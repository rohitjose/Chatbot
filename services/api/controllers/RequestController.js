var request = require('request');

module.exports = {
  get: function(req, res) {

    let intent = req.param('intentName') || req.body.result.metadata.intentName;
    let params = req.param('parameters') || JSON.stringify(req.body.result.parameters);
    let url = 'courseinformation/' + intent + '?parameters=' + params;

    console.log("################ INCOMING REQUEST ###################");
    console.log(req.body);
    console.log("################ INCOMING REQUEST ###################");

    if (!intent || !params) {
      console.log("################ ERROR IN REQUEST ###################");
      return res.badRequest({
        status: 'error',
        msg: 'invalid arguments'
      });
    }
    console.log("################ URL REDIRECT ###################");
    console.log(url);
    console.log("################ URL REDIRECT ###################");

    // Set the response header
    res.header("Content-Type", "application/json; charset=utf-8");

    // make the GET request
    request('http://localhost:1337/' + url, function(err, response) {

      if (err) return console.error(err.message);

      console.log("################ MIDDLEWARE RESPONSE ###################");
      console.log(response.body);
      console.log("################ MIDDLEWARE RESPONSE ###################");

      return res.ok(response.body);
    });
  }
}