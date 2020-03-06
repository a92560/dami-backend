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

  const CitySchema = new Schema({
    id: {
      type: String,
      required: true
    },
    value: {
      type: Array,
      default: []
    },
  })

  return mongoose.model("City", CitySchema)
}