/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-11 14:59:07
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-13 10:40:12
 */
module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const ItemSchema = new Schema({
    itemName: {
      type: String,
    },
    avgScore: {
      type: Number,
    },
    imgUrl: {
      type: String
    },
    bigImgUrl: {
      type: String,
      default: ""
    },
    areaId: {
      type: String
    },
    itemType1Id: {
      type: Schema.Types.ObjectId,
      ref: "Nav",
    },
    itemType2Id: {
      type: Schema.Types.ObjectId,
      ref: "Nav",
    },
    state: {
      type: String
    },
    isHot: {
      type: Number
    },
    abstractMessage: {
      type: String
    },
    startTime: {
      type: [{
        type: Date
      }]
    },
    endTime: {
      type: [{
        type: Date
      }]
    },
    cinemaId: {
      type: String
    },
    cinemaId: {
      type: String
    },
    address: {
      type: String
    },
    latitude: {
      type: Number
    },
    longitude: {
      type: Number
    },
    minPrice: {
      type: Number
    },
    maxPrice: {
      type: Number
    },
    comments: {
      type: [{
        imgUrl: {
          type: String
        },
        score: {
          type: String
        },
        createdTime: {
          type: String
        },
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        content: {
          type: String
        }
      }]
    },
  })

  return mongoose.model("Item", ItemSchema)
}