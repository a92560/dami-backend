/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-10 13:09:31
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-12 12:37:03
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 用户
  require("./router/user.js")(app)
    // 省市联动
  require("./router/province.js")(app)
    // 省市联动
  require("./router/city.js")(app)
    // 搜索模糊查询城市
  require("./router/allCity.js")(app)
    // 即将开售
  require("./router/sell.js")(app)
    // 今日推荐
  require("./router/recommend.js")(app)
    // 导航
  require("./router/nav.js")(app)
  require("./router/item.js")(app)
  require("./router/seat.js")(app)
  require("./router/order.js")(app)
  require("./router/chat.js")(app)
  app.io.route('chat', app.io.controller.chat.ping);
  app.io.route('sendMessage', app.io.controller.chat.sendMessage);
};