/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-11 14:59:07
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-11 15:00:47
 */
module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const provinceSchema = new Schema({
    id: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
  })

  return mongoose.model("Province", provinceSchema)
}