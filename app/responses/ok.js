/**
 * 200 (OK) Response
 *
 * Usage:
 * return res.ok();
 * return res.ok(data);
 *
 * @param  {Object} data
 */
const config = require("config");

 module.exports = function ok (payload = {}) {

  const defaultFields = ['userMessage', 'serverInfo', 'data']
  // Get access to `req` & `res`
  var req = this.req;
  var res = this;

  var customRes = {code:200,userMessage:'',serverInfo:'',data:{}}
  // Set status code
  res.status(customRes.code);

  if (typeof payload !== 'object'){
    customRes.data = payload;    
    if(config.env == 'test'){
      var result = JSON.stringify(customRes);
      return res.send(result);    
    }    
    
    return res.json(customRes); 
  }

  defaultFields.forEach(f => {
    if(payload[f])
      customRes[f] = payload[f]
      delete payload[f]
  })

  if(!customRes.data){
    customRes.data = payload.data || payload    
  }
  
  if(config.env == 'test'){
    var result = JSON.stringify(customRes);
    return res.send(result);    
  }    
  
  return res.json(customRes); 

};

