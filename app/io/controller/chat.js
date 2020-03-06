module.exports = app => {
  class Controller extends app.Controller {
    async ping() {
      const message = this.ctx.args[0];
      console.log("message", message);
      await this.ctx.socket.emit('res2', `Hi! I've got your message: ${message}`);
      const nsp = app.io.of('/');
      const sockets = nsp.sockets
        // console.log("sockets", sockets)
    }

    async sendMessage() {
      const { ctx } = this
      const { from, to, content, socketId: id } = ctx.args[0]
      const chat_id = [from, to].sort().join("_")
      const ret = await new ctx.model.Chat({ from, to, content, chat_id }).save()
      console.log("ret", ret)
      const nsp = ctx.app.io.of('/');
      const clients = nsp.clients;
      // console.log("id", id)
      nsp.emit('receiveMessage', ret);
      // if (nsp.sockets[id]) {
      //   // 通过id给指定socket连接发送消息
      //   console.log("执行了")
      //   nsp.sockets[id].emit('receiveMessage', ret);
      //   // this.ctx.socket.disconnect();
      // }
    }
  }
  return Controller
};