/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-11 14:59:07
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-12 10:37:04
 */
module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const SeatSchema = new Schema({
    id: {
      type: String
    },
    seatArray: {
      type: Array
    },
    selectedSeatArray: {
      type: [{
        id: {
          type: String
        },
        x: {
          type: Number
        },
        y: {
          type: Number
        },
        cinemaId: {
          type: String
        },
        status: {
          type: Number
        },
        price: {
          type: Number
        }
      }]
    },
    seatPriceArray: {
      type: Array
    }
  })

  return mongoose.model("Seat", SeatSchema)
}