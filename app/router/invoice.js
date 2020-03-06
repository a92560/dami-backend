module.exports = app => {
  const { router, controller } = app
  const BASE_URL = app.config.BASE_URL.BASE_URL
  const jwt = app.middleware.jwt(({ app }));
  router.post(BASE_URL + "/invoices", jwt, controller.invoice.createInvoice)
}