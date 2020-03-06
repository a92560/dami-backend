const BaseController = require('./base')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
class ChatController extends BaseController {
  async find() {
    const { ctx } = this
    const id = ctx.state.user.id
    const showUsers = ctx.query.users
      // 找出所有user
      // { $nor: [{ _id: id }] }
    let allUser = await ctx.model.User.find({ $nor: [{ _id: id }] }, { email: 1, avatarUrl: 1, _id: 1 })
      // console.log("allUser", allUser)
    const users = allUser.reduce((users, user) => {
        users[user._id] = { email: user.email, avatarUrl: user.avatarUrl }
        return users
      }, {})
      // console.log("users", users)
      // 查询跟我有关的信息
    const ret = await ctx.model.Chat.find({
      $or: [{ from: id }, { to: id }]
    })
    const userRet = showUsers == 1 ? users : {}
    this.success({
      users: userRet,
      ret
    })
  }

  async readChat() {
    // 修改别人的消息已读
    const { ctx } = this
    const to = ctx.state.user.id
    const from = ctx.request.body.from
    console.log('from', from)
    console.log('to', to)
    const ret = await ctx.model.Chat.update({ from, to, isRead: false }, { isRead: true }, { multi: true })
    console.log('ret', ret)
    if (ret.nModified >= 0) {
      this.message("更新成功")
    } else {
      this.error('服务器错误,请稍后重试')
    }
  }
}

module.exports = ChatController