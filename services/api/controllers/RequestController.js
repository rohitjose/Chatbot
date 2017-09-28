module.exports = {
  get: function (req, res) {

    let intent = req.param('intentName');
    let params = req.param('parameters');

    let url = 'courseinformation/'+intent+'?parameters='+params;

  console.log(url);
    if (intent == 'course_description')
      return res.redirect(url);

    if (intent == 'class_detail')
      return res.redirect('classdetails/get');

    else {
      return res.badRequest({
        status: 'error',
        msg:'intent could not be identified'
      });
    }
  }
}
