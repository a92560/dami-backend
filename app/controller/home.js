/*
 * @Description:
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-10 13:09:31
 * @LastEditors: Darren
 * @LastEditTime: 2020-02-10 15:39:26
 */
'use strict'

const BaseController = require('./base')

class HomeController extends BaseController {
  async index() {
    const { ctx } = this
    ctx.body = 'hi, egg'
  }
}

module.exports = HomeController