/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-11 14:58:54
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-11 15:02:48
 */
module.exports = app => {
  const { router, controller } = app
  const BASE_URL = app.config.BASE_URL.BASE_URL
  router.get(BASE_URL + "/provinces", controller.province.find)
}