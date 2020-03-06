/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-11 10:45:02
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-11 11:01:08
 */
module.exports = ({ app }) => {
  return async function verify(ctx, next) {
    let token = ctx.request.header.authorization
    if (!token) {
      return ctx.body = {
        code: 666,
        message: "token无效"
      }
    }
    try {
      token = token.replace("Bearer ", "")
      let ret = await app.jwt.verify(token, app.config.jwt.secret)
      ctx.state.user = ret
      console.log("中间件获取token信息", ret)
      await next()
    } catch (error) {
      console.log("error::::::", error)
      if (error.name === 'TokenExpiredError') {
        return ctx.body = {
          code: 666,
          message: "token过期了，请重新登录"
        }
      } else if (error.name === 'JsonWebTokenError') {
        return ctx.body = {
          code: 666,
          message: "token无效"
        }
      } else {
        return ctx.body = {
          code: 666,
          message: error.message
        }
      }
    }
  }
}