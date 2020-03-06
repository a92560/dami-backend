module.exports = app => {
  const { router, controller } = app
  const BASE_URL = app.config.BASE_URL.BASE_URL
  const jwt = app.middleware.jwt(({ app }));
  router.get(BASE_URL + "/chats", jwt, controller.chat.find)
  router.post(BASE_URL + "/chats/read", jwt, controller.chat.readChat)
}