var http = require('http');

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
    // return res.redirect(url);

    var options = {
      host: 'localhost',
      port: 1337,
      path: "/" + url
    };

    http.get(options, function(resp) {
      resp.on('data', function(chunk) {
        //do something with chunk
        console.log(chunk);
      });
    }).on("error", function(e) {
      console.log("Got error: " + e.message);
    });
  }
}