/*
 * @Description:
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-11 08:42:44
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-11 10:54:43
 */
module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt(({ app }));
  const BASE_URL = '/api';
  router.get(BASE_URL + '/users', controller.user.index);
  router.get(BASE_URL + '/user', jwt, controller.user.getUserInfo);
  router.post(BASE_URL + '/user/login', controller.user.login);
  router.get(BASE_URL + '/user/email', controller.user.email);
  router.post(BASE_URL + '/user/register', controller.user.register);
  router.get(BASE_URL + '/user/detail', jwt, controller.user.detail);
  router.put(BASE_URL + '/user/detail', jwt, controller.user.updateUserDetail);
  router.get(BASE_URL + '/user/ticketbuyers', jwt, controller.user.getTicketBuyerList);
  router.post(BASE_URL + '/user/ticketbuyers', jwt, controller.user.addTicketBuyer);
  router.delete(BASE_URL + '/user/ticketbuyers', jwt, controller.user.deleteTicketBuyer);
  router.post(BASE_URL + '/user/avatar', jwt, controller.user.updateAvatar);
  router.get(BASE_URL + '/user/orders', jwt, controller.user.getOrderList);
  router.get(BASE_URL + '/user/orders/:orderId', jwt, controller.user.getOrder);
  router.post(BASE_URL + '/user/orders', jwt, controller.user.postUserOrder);
  router.post(BASE_URL + '/user/comments', jwt, controller.user.postItemComment);
};