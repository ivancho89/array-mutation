/* eslint no-param-reassign: 0 no-unused-vars: 0 */
const express      = require("express");
const cors         = require("cors");
const i18n         = require('i18n');
const fs           = require('fs')
const device       = require('express-device');
const bodyParser   = require("body-parser");
const path         = require("path");

const expressValidator = require("express-validator");

const { getStatusText, INTERNAL_SERVER_ERROR } = require("http-status-codes");

var customResponses = require('express-custom-responses');
customResponses(path.join(process.cwd(), '/app/responses'));


// Load Modules
const loadModules = (app, express, globalApp) => {

  const { listFoldersInFolder, requireRoutes } = rootRequire('lib/utils/files.util');
  const totalModules = listFoldersInFolder().length - 1;

  listFoldersInFolder()
  .forEach(function (moduleFolder) {
    requireRoutes(path.join('app/modules', moduleFolder, 'routes'), totalModules, app, express, globalApp);

  });
}


// Setup express application
const createExpressApplication = ( globalApp) => {

  const appEnv  = globalApp.env
  const appConf = globalApp.config;
  const app = express();

  // Express setup
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  app.use(expressValidator());

  // Apidoc
  app.use(express.static('public/apidoc'));

  app.get("/are-you-alive", (req, res) => {
    res.ok();
  });

  i18n.configure({
    locales: ['en', 'es'],
    defaultLocale: 'en',
    directory: `${process.cwd()}/app/init/locales`
  });

  app.use(i18n.init)

  app.use(device.capture());

  //load modules dynamically
  loadModules(app, express, globalApp)

  //404 Handdler
  app.get('*', function(req, res) {
    res.notFound({ resource: req.originalUrl })
  })


  app.use((error, req, res, next) => {

    let stack = error.stack.split("\n");
    let info  = "".concat(stack[0], stack[1]);

    res.serverError({userMessage:i18n.__("internal_server_error"), serverInfo:info, data: (req.body || req.query || req.params ) })
  });


  return app;
};

module.exports = App => {
  App.express = createExpressApplication(App);
};
