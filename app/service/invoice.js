const Service = require('egg').Service

class InvoiceService extends Service {
  async createInvoice(body) {
    const { ctx } = this
    return new ctx.model.Invoice(body).save()
  }
}

module.exports = InvoiceService