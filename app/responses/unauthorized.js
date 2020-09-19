/**
 * 401 (Bad Request) Handler
 *
 * Usage:
 * return res.unauthorized();
 * return res.unauthorized(data);
 *
 * @param  {Object} data
 */

const i18n    = require('i18n');


 module.exports = function unauthorized (payload)  {

  const defaultFields = ['userMessage', 'serverInfo', 'data']
  // Get access to `req` & `res`
  var req = this.req;
  var res = this;

  var customRes = {
    code: 401,
    userMessage: i18n.__("login_required"),
    serverInfo: 'unauthorized_request',
  }

  // Set status code
  res.status(customRes.code);

  if (typeof payload !== 'object') { 
    
    customRes.data = payload;
    return res.json(customRes); 
  }

  defaultFields.forEach(f => {
    if(data[f])
      customRes[f] = data[f]
      delete payload[f]

  })

  return res.json(data);

};


