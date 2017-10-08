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

    // // make the GET request
    // request('http://localhost:1337/' + url, function(err, response) {

    //   if (err) return console.error(err.message);

    //   console.log("################ MIDDLEWARE RESPONSE ###################");
    //   console.log(response.body);
    //   console.log("################ MIDDLEWARE RESPONSE ###################");

    //   return res.ok(response.body);
    // });

    let response = `{
  "speech": "Description",
  "source": "chappie_middleware",
  "displayText": "Course Details",
  "data": {
    "facebook": {
      "attachment": {
        "type": "template",
        "payload": {
        "template_type": "list",
        "top_element_style": "compact",
        "elements": [
          {
            "title": "Classic T-Shirt Collection",
            "subtitle": "See all our colors",
            "image_url": "https://peterssendreceiveapp.ngrok.io/img/collection.png",          
            "buttons": [
              {
                "title": "View",
                "type": "web_url",
                "url": "https://peterssendreceiveapp.ngrok.io/collection",
                "webview_height_ratio": "tall"           
              }
            ]
          },
          {
            "title": "Classic White T-Shirt",
            "subtitle": "See all our colors"
          },
          {
            "title": "Classic Blue T-Shirt",
            "image_url": "https://peterssendreceiveapp.ngrok.io/img/blue-t-shirt.png",
            "subtitle": "100% Cotton, 200% Comfortable",
            "default_action": {
              "type": "web_url",
              "url": "https://peterssendreceiveapp.ngrok.io/view?item=101",
              "webview_height_ratio": "tall"
            },
            "buttons": [
              {
                "title": "Shop Now",
                "type": "web_url",
                "url": "https://peterssendreceiveapp.ngrok.io/shop?item=101",
                "webview_height_ratio": "tall"           
              }
            ]        
          }
        ],
         "buttons": [
          {
            "title": "View More",
            "type": "postback",
            "payload": "payload"            
          }
        ]  
      }
      }
    }
  }
}`;

    return res.ok(JSON.parse(response));
  }
}