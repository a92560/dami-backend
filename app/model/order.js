/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-11 15:23:54
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-11 15:25:03
 */
module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const OrderSchema = new Schema({
    orderList: {
      type: [{
        sellTime: {
          type: Date
        },
        itemName: {
          type: String
        },
        itemTypeId1: {
          type: String
        },
        itemTypeId2: {
          type: String
        },
        number: {
          type: Number
        },
        unitPrice: {
          type: Number
        },
        totalAmount: {
          type: Number
        },
        orderType: {
          type: Number
        },
        operate: {
          type: String
        },
        cinemaId: {
          type: String
        },
        onTime: {
          type: String
        }
      }],
      default: []
    },
  })

  return mongoose.model("Order", OrderSchema)
}