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

//     let response = `{
//   "speech": "Description",
//   "source": "chappie_middleware",
//   "displayText": "Course Details",
//   "data": {
//     "facebook": {
//       "attachment": {
//         "type": "template",
//         "payload": {
//           "template_type": "button",
//           "text": "Hardcoded response",
//           "buttons": [{
//             "type": "web_url",
//             "url": "http://www.handbook.unsw.edu.au/postgraduate/courses/2017/COMP9323.html",
//             "title": "Handbook link"
//           }, {
//             "type": "web_url",
//             "url": "http://www.cse.unsw.edu.au/~cs9323",
//             "title": "Outline link"
//           }, {
//             "type": "web_url",
//             "url": "http://www.cse.unsw.edu.au/",
//             "title": "School Page"
//           }]
//         }
//       }
//     }
//   }
// }`;

//     return res.ok(JSON.parse(response));
  }
}