/*
 * @Description:
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-12 12:36:36
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-13 11:15:56
 */
module.exports = app => {
  const { router, controller } = app
  const BASE_URL = app.config.BASE_URL.BASE_URL
  router.get(BASE_URL + '/items', controller.item.find)
  router.get(BASE_URL + '/items/index', controller.item.findIndexItem)
  router.get(BASE_URL + '/items/udpate', controller.item.updateAvatar)
  router.get(BASE_URL + '/items/desc', controller.item.findOne)
  router.get(BASE_URL + '/items/floor', controller.item.getFloorItems)
  router.get(BASE_URL + '/items/comments', controller.item.getComments)
  router.get(BASE_URL + '/items/create', controller.item.create)
  router.get(BASE_URL + '/items/address/update', controller.item.updateAddress)
  router.post(BASE_URL + '/items/history', controller.item.postHistory)
  router.get(BASE_URL + '/items/history', controller.item.getHistory)
  router.get(BASE_URL + '/items/recommend', controller.item.getRecommend)
}