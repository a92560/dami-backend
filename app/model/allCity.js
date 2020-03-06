/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-11 15:23:54
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-12 09:34:01
 */
module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const AllCitySchema = new Schema({
    cities: {
      type: [{
        id: {
          type: Number,
        },
        nm: {
          type: String,
        },
        isHot: {
          type: Number
        },
        py: {
          type: String
        }
      }],
      default: []
    },
  })

  return mongoose.model("AllCity", AllCitySchema)
}