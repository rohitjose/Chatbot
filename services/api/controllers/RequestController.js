module.exports = {
  get: function (req, res) {

    let intent = req.param('intentName');
    let params = req.param('parameters');
    let url = 'courseinformation/'+intent+'?parameters='+params;

    console.log("################ INCOMING REQUEST ###################");
    console.log(req);
    console.log("################ INCOMING REQUEST ###################");

    if (!intent || !params) {
      return res.badRequest({
        status:'error',
        msg:'invalid arguments'
      });
    }
    console.log(url);
    return res.redirect(url);
  }
}
