/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-11 16:01:13
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-11 16:06:55
 */
module.exports = app => {
  const { router, controller } = app
  const BASE_URL = app.config.BASE_URL.BASE_URL
  router.get(BASE_URL + "/allcities", controller.allCity.findAll)
  router.get(BASE_URL + "/allcities/hot", controller.allCity.findHot)
  router.get(BASE_URL + "/allcities/search", controller.allCity.findOne)
}