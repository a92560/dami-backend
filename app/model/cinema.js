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

  const CinemaSchema = new Schema({
    areaId: {
      type: Schema.Types.ObjectId,
      ref: 'City'
    },
    cinemaId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  })

  return mongoose.model("Cinema", CinemaSchema)
}