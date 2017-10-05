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

    // make the GET request
    // request('http://localhost:1337/' + url, function(err, response) {
    //   if (err) return console.error(err.message);

    //   console.log(response.body);
    //   return res.ok(response.body);
    // });

    let response = `{
      "status": "success",
      "source": "http://www.handbook.unsw.edu.au/postgraduate/courses/2017/COMP9323.html",
      "course": "COMP9323",
      "data": {
        "facebook": {
          "attachment": {
            "type": "template",
            "payload": {
              "template_type": "generic",
              "buttons": [{
                "type": "web_url",
                "url": "http://www.handbook.unsw.edu.au/postgraduate/courses/2017/COMP9323.html",
                "title": "COMP9323 Handbook"
              }]
            }
          }
        }
      }
    }`;

    return res.ok(response);
  }
}