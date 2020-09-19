const config = require("config");
const path   = require("path");
const fs     = require('fs')
const zlib = require('zlib');
const Validator      = rootRequire("lib/validator");
const i18n    = require('i18n');

const headersSchema  = rootRequire("lib/utils/validators/headers");

const getEntity = (moduleName, entity = '', file = '') =>{

  let path = [
    process.cwd(),
    'app',
    'modules',
    moduleName
  ]

  if(entity != '')
    path.push(entity)

  if(file != '')
    path.push(`${file}.js`)

  let fullPath = path.join('/');

  if (!fs.existsSync(fullPath))
      return {};

  return require(fullPath);

}


const filterFiles = (fileName, extension) => {
  extension = extension || 'js';
  return path.extname(fileName) == ('.' + extension);
};


const listFilesInFolder  = (folderPath, extension) => {

  var completePath = path.join(`${process.cwd()}`, folderPath);  

  if (!fs.existsSync(completePath))
      return [];

  return fs.readdirSync(completePath)
  .filter(function (file) {
    return filterFiles(file, extension);
  });
};


const requireController = (moduleName) =>{

  return getEntity(moduleName, 'controllers', `${moduleName}.controller`)
}

const requireService = (moduleName, serviceName = '') =>{

  serviceName = serviceName == '' ? `${moduleName}.service` : serviceName
  return getEntity(moduleName, 'services', serviceName)
}

const requireModel = (moduleName, modelName = '') =>{

  modelName = modelName == '' ? `${moduleName}.model` : modelName
  return getEntity(moduleName, 'models', modelName)
}

const requireJoiSchema = (moduleName) =>{
  return getEntity(moduleName, 'schemas', 'index')
}

const requireBase = (baseName = '') =>{
  return getEntity('base', '', `base.${baseName}` )
}


const requireRoutes = (folderPath, totalModules = 1, app, express, globalApp, ) => {

  const router = express.Router();
  const urlPaths = config.urlPaths;

  listFilesInFolder(folderPath)
  .forEach(function (file) {  

    var entity;

    let routeModule = require(path.join(process.cwd(), folderPath, file))
    routeModule
    .routes
    .forEach((routhPath, index)=>{

      if(index == 0){
        entity = routhPath[index]
        return
      }

      let [method, routePath, headerValidationType, moduleController] = routhPath;
      let urlPath = "";

      if(routePath != ""){
        urlPath = totalModules > 1 ? `/${entity}/${routePath}` : `/${routePath}`
      }else{
        urlPath = totalModules > 1 ? `/${entity}` : `/`
      }

      let headersValidator;

      if( !moduleController){

        moduleController = headerValidationType;
        headersValidator = Validator(headersSchema.headers, {allowUnknown:true});

      }

      let finalCall = (req, res, next)=>{
        moduleController(req, res)
        next()
      }
      
      app[method](
        urlPath,
        headersValidator,
        finalCall
      )

    })

  });
};


const listFoldersInFolder = () => {

  var completePath =  path.join(`${process.cwd()}/app/modules`); 

  return fs.readdirSync(completePath)
  .filter(function (folder) {

    return fs.statSync(path.join(completePath, folder)).isDirectory();

  });
};


module.exports = {
  requireController:requireController,
  requireService:requireService, 
  requireModel:requireModel,
  requireBase:requireBase,
  listFoldersInFolder:listFoldersInFolder,
  requireRoutes:requireRoutes,
  requireJoiSchema:requireJoiSchema
}
