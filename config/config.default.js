/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-10 13:09:31
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-11 15:02:03
 */
/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
const path = require("path")
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1581311366813_8951';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mongoose = {
    client: {
      url: 'mongodb+srv://Darren:parents520++@darren-ql5vi.mongodb.net/dami?retryWrites=true&w=majority',
      options: {
        useUnifiedTopology: true
      },
      // mongoose global plugins, expected a function or an array of function and options
      // plugins: [createdPlugin, [updatedPlugin, pluginOptions]],
    },
  }

  // app.config.jwt.secret
  config.jwt = {
    secret: "Darren"
  };

  config.md5 = {
    salt: "darren+-*/"
  }

  config.BASE_URL = {
    BASE_URL: "/api"
  }

  config.security = {
    csrf: {
      enable: false,
    },
  }

  config.multipart = {
    mode: "file"
  }

  config.io = {
    init: {
      wsEngine: 'ws',
    }, // passed to engine.io
    namespace: {
      '/': {
        connectionMiddleware: ['connection'],
        packetMiddleware: [],
      },
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};