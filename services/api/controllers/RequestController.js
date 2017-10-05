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
    request('http://localhost:1337/' + url, function(err, response) {
      if (err) return console.error(err.message);

      console.log(response.body);
      return res.ok(response.body);
    });

    // let response = `{
    //   "speech": "Here you go: ",
    //   "source": "www.testclan.com",
    //   "displayText": "Here you go: ",
    //   "data": {
    //     "facebook": {
    //       "attachment": {
    //         "type": "template",
    //         "payload": {
    //           "template_type": "generic",
    //           "elements": [{
    //             "title": "Rainbow Six Siege",
    //             "subtitle": "Blitz Guide",
    //             "image_url": "http://img.youtube.com/vi/36q5NnL3uSM/0.jpg",
    //             "buttons": [{
    //               "type": "web_url",
    //               "url": "https://www.youtube.com/watch?v=36q5NnL3uSM",
    //               "title": "Watch video"
    //             }]
    //           }]
    //         }
    //       }
    //     }
    //   }
    // }`;

    // return res.ok(JSON.parse(response));
  }
}