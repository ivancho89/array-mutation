/**
 * 400 (Bad Request) Response
 *
 * Usage:
 * return res.badRquest();
 * return res.badRquest(data);
 *
 * @param  {Object} data
 */
const config = require("config");
const i18n    = require('i18n');
 module.exports = function badRequest (payload = {}) {
  const defaultFields = ["userMessage", "serverInfo", "data"];
  const erroFieldsMap = [ {field: "message", map: "data"}, {field: "stack", map: "serverInfo"}]
  // Get access to `req` & `res`
  var req = this.req;
  var res = this;
  var customRes = {code:400,userMessage:i18n.__("something_went_wrong"),serverInfo:'',data:{}}  
  // Set status code
  res.status(customRes.code);
  if (typeof payload !== 'object') { 
    customRes.data = payload;    
    if(config.env == 'test'){
      var result = JSON.stringify(customRes);
      return res.send(result);    
    }    
    
    return res.json(customRes); 
  }
  defaultFields.forEach(f => {
    if(payload[f]){
      customRes[f] = payload[f]
      delete payload[f]
    }
  })
  erroFieldsMap.forEach(errorField => {
    if(payload[errorField.field]){
      customRes[errorField.map] = payload[errorField.field]
      delete payload[errorField.field]
    }
  })
  if(!customRes.data)
    customRes.data = payload.data || payload
        
    if(config.env == 'test'){
      var result = JSON.stringify(customRes);
      return res.send(result);    
    }    
    
    return res.json(customRes); 
};