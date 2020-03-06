module.exports = app => {
  const { router, controller } = app
  const BASE_URL = app.config.BASE_URL.BASE_URL
  router.get(BASE_URL + "/seats", controller.seat.find)
  router.get(BASE_URL + "/seat", controller.seat.findOne)
  router.get(BASE_URL + "/seats/create", controller.seat.create)
}