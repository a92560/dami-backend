/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-11 14:59:07
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-12 10:19:37
 */
module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const SellSchema = new Schema({
    data: {
      type: [{
        itemName: {
          type: String
        },
        minPrice: {
          type: Number
        },
        imgUrl: {
          type: String
        }
      }],
      required: true
    }
  })

  return mongoose.model("Sell", SellSchema)
}