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
    // return res.redirect(url);

    request('http://localhost:1337' + url, function(error, response, body) {
      console.log('error:', error); 
      console.log('statusCode:', response && response.statusCode); 
      console.log('body:', body); // Print the HTML for the Google homepage.
    });

    // return res.ok({
    //   "status": "success",
    //   "displayText": "Description for COMP9323 e-Enterprise Project :\nCareer: postgraduate\nDescription: This course covers principles, techniques, architectures, and enabling technologies for the development of the different components and layers of complex e-Commerce systems (presentation and personalisation layer, business logic, message exchange). In particular, it discusses the processes related to (1) building a large enterprise system in collaboration with other project members, (2) developing software in a culture of participation, (3) developing software using agile software engineering methodologies, (4) integrating a number of separate components to build an integrated system, and (5) developing appropriate testing strategies and methodologies for given projects.\nDescription for COMP9323 e-Enterprise Project :\nCareer: undergraduate\nDescription: This course covers principles, techniques, architectures, and enabling technologies for the development of the different components and layers of complex e-Commerce systems (presentation and personalisation layer, business logic, message exchange). In particular, it discusses the processes related to (1) building a large enterprise system in collaboration with other project members, (2) developing software in a culture of participation, (3) developing software using agile software engineering methodologies, (4) integrating a number of separate components to build an integrated system, and (5) developing appropriate testing strategies and methodologies for given projects.\n",
    //   "speech": "Description for COMP9323 e-Enterprise Project :\nCareer: postgraduate\nDescription: This course covers principles, techniques, architectures, and enabling technologies for the development of the different components and layers of complex e-Commerce systems (presentation and personalisation layer, business logic, message exchange). In particular, it discusses the processes related to (1) building a large enterprise system in collaboration with other project members, (2) developing software in a culture of participation, (3) developing software using agile software engineering methodologies, (4) integrating a number of separate components to build an integrated system, and (5) developing appropriate testing strategies and methodologies for given projects.\nDescription for COMP9323 e-Enterprise Project :\nCareer: undergraduate\nDescription: This course covers principles, techniques, architectures, and enabling technologies for the development of the different components and layers of complex e-Commerce systems (presentation and personalisation layer, business logic, message exchange). In particular, it discusses the processes related to (1) building a large enterprise system in collaboration with other project members, (2) developing software in a culture of participation, (3) developing software using agile software engineering methodologies, (4) integrating a number of separate components to build an integrated system, and (5) developing appropriate testing strategies and methodologies for given projects.\n",
    //   "source": "http://www.handbook.unsw.edu.au/postgraduate/courses/2017/COMP9323.html"
    // });
  }
}