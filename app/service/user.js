/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-10 15:09:45
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-11 09:08:21
 */
const Service = require("egg").Service


class UserService extends Service {
  async find() {
    const { ctx } = this
    const user = await ctx.model.User.find()
    return user
  }

  async create(User) {
    const { ctx } = this
    const UserModel = ctx.model.User
    const user = await new UserModel(User).save()
    return user
  }

  // 查找是否已经注册过了
  async findUser(email) {
    const { ctx } = this
    const repeatUser = await ctx.model.User.findOne({ email })
    return repeatUser
  }
}
module.exports = UserService