module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const InvoiceSchema = new Schema({
    companyName: {
      type: String,
    },
    taxNumber: {
      type: String,
    },
    invoiceType: {
      type: String,
      default: 0
    }
  })

  return mongoose.model("Invoice", InvoiceSchema)
}