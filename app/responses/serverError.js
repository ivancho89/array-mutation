/**
 * 500 (Internal Server Error) Response
 *
 * Usage:
 * return res.serverError();
 * return res.serverError(data);
 *
 * @param  {Object} data
 */
 const i18n    = require('i18n');


 module.exports = function ok (payload = {}) {

  const defaultFields = ['userMessage', 'serverInfo', 'data']
  // Get access to `req` & `res`
  var req = this.req;
  var res = this;

  var customRes = {
    code: 500,
    userMessage: i18n.__("general_server_error"),
    serverInfo: ''
  }
  // Set status code
  res.status(customRes.code);

  if (typeof payload !== 'object') { 
    
    customRes.data = payload;
    return res.json(customRes); 
  }

  defaultFields.forEach(f => {
    if(payload[f])
      customRes[f] = payload[f]
      delete payload[f]
  })

  if(!customRes.data)
    customRes.data = payload.data || payload

  return res.json(customRes);

};

