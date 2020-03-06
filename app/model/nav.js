/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-11 14:59:07
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-12 15:40:38
 */
module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const NavSchema = new Schema({
    itemType: {
      type: String
    },
    level: {
      type: Number,
    },
    parent: {
      type: Number
    },
    aliasName: {
      type: String,
    },
    children: {
      type: [{
        itemType: {
          type: String
        },
        level: {
          type: Number
        },
        parent: {
          type: String
        },
        aliasName: {
          type: String
        }
      }]
    },
    hotItems: {
      type: [{
        _id: {
          type: String
        },
        itemName: {
          type: String
        },
        minPrice: {
          type: String
        },
        imgUrl: {
          type: String
        }
      }]
    }
  })

  return mongoose.model("Nav", NavSchema)
}