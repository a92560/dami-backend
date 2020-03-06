/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-11 16:01:13
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-12 10:25:31
 */
module.exports = app => {
  const { router, controller } = app
  const BASE_URL = app.config.BASE_URL.BASE_URL
  router.get(BASE_URL + "/sells", controller.sell.find)
  router.get(BASE_URL + "/sells/create", controller.sell.create)
}