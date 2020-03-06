/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-10 14:45:36
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-11 09:12:07
 */
module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const userSchema = new Schema({
    userName: {
      type: String,
    },
    email: {
      type: String,
      required: true
    },
    avatarUrl: {
      type: String,
      default: "/public/img/avatar.jpg"
    },
    password: {
      type: String,
    },
    realName: {
      type: String,
    },
    cardId: {
      type: String
    },
    birthday: {
      type: String
    },
    sex: {
      type: String
    },
    ticketBuyerList: {
      type: [{
        linkId: {
          type: String
        },
        cardId: {
          type: String
        },
        name: {
          type: String,
        },
        cardType: {
          type: String
        }
      }],
      default: []
    },
    phone: {
      type: String,
    },
    orderList: {
      type: [{
        sellTime: {
          type: Date,
          default: Date.now()
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
          type: Number,
          default: 0
        },
        operate: {
          type: String
        },
        invoiceId: {
          type: Schema.Types.ObjectId,
          ref: "Invoice",
        },
        linkIds: {
          type: Array,
          default: []
        },
        isNeedInsurance: {
          type: Number,
          default: 0
        },
        isNeedInvoice: {
          type: Number,
          default: 0
        },
        cinemaId: {
          type: String
        },
        seatData: {
          type: Array,
        },
        insuranceAmount: {
          type: Number
        },
        itemId: {
          type: Schema.Types.ObjectId,
          ref: "Item"
        }
      }],
      default: []
    },
    __v: {
      type: Number,
      select: false
    }
  }, {
    timestamps: true
  })

  return mongoose.model("User", userSchema)
}