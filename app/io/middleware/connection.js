'use strict';
module.exports = () => {
  return async(ctx, next) => {
    // console.log("ctx.socket", ctx.socket)
    const id = ctx.socket.id;
    console.log("id", id)
    ctx.socket.emit('res1', id);
    await next();
    console.log('disconnection!');
  };
};