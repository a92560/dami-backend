/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-10 15:26:46
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-10 15:29:54
 */
const Controller = require("egg").Controller

class BaseController extends Controller {

  // 公用代码抽离
  success(data) {
    this.ctx.body = {
      code: 0,
      data
    }
  }

  error(message, code = -1) {
    this.ctx.body = {
      code,
      message
    }
  }

  errorData(message, code = -1, data) {
    this.ctx.body = {
      message,
      code,
      data
    }
  }

  message(message) {
    this.ctx.body = {
      code: 0,
      message
    }
  }
}

module.exports = BaseController