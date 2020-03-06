const BaseController = require('./base')

class InvoiceController extends BaseController {
  async createInvoice() {
    const { ctx } = this
    const body = ctx.request.body
  }
}

module.exports = InvoiceController