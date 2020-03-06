/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-12 11:46:45
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-13 16:16:46
 */
module.exports = app => {
  const { router, controller } = app
  const BASE_URL = app.config.BASE_URL.BASE_URL
  router.get(BASE_URL + "/navs", controller.nav.find)
  router.get(BASE_URL + "/navs/query", controller.nav.findQueryNav)
    // router.get(BASE_URL + "/navs/line", controller.nav.lineNav)
    // router.get(BASE_URL + "/navs/create", controller.nav.create)
}