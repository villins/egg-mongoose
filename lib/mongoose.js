'use strict';

const assert = require('assert');
const path = require('path');
const mongoose = require('mongoose');

module.exports = app => {
  const config = app.config.mongoose;
  assert(config.url, '[egg-mongoose] url is required on config');
  app.coreLogger.info('[egg-mongoose] connecting %s', config.url);

  const db = mongoose.createConnection(config.url);
  db.Schema = mongoose.Schema;
  app.mongoose = db;

  loadModel(app);

  app.beforeStart(function* () {
    app.coreLogger.info('[egg-mongoose] start success');
  });
};

function loadModel(app) {
  const dir = path.join(app.config.baseDir, 'app/model');
  app.loader.loadToApp(dir, 'model', {
    inject: app.mongoose,
  });
  app.coreLogger.info(app.model.user);
}