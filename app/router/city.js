/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-11 15:25:22
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-13 15:53:36
 */
module.exports = app => {
  const { router, controller } = app
  const BASE_URL = app.config.BASE_URL.BASE_URL

  router.get(BASE_URL + "/cities", controller.city.findOne)
  router.get(BASE_URL + "/cities/query", controller.city.queryCity)
  router.get(BASE_URL + "/city", controller.city.getProvince)
}