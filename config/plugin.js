/*
 * @Description:
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-10 13:09:31
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-11 09:41:04
 */
'use strict'

/** @type Egg.EggPlugin */
/* module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
}; */
exports.mongoose = {
  enable: true,
  package: 'egg-mongoose'
}

exports.jwt = {
  enable: true,
  package: 'egg-jwt'
}

exports.io = {
  enable: true,
  package: 'egg-socket.io'
}