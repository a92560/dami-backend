/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-12 10:19:53
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-12 10:38:19
 */
const BaseController = require("./base")
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

class OrderController extends BaseController {
  async find() {
    const { ctx } = this
    const id = ctx.state.user.id
    const order = await ctx.model.Order.aggregate([{
      $match: {
        // "orderList.itemName": {
        //   $regex: new RegExp("好")
        // },
        "_id": ObjectId(id)
      }
    }])
    if (order) {
      this.success(order)
    } else {
      this.error("暂无数据")
    }
  }

  async create() {
    const { ctx } = this
    const orderModel = ctx.model.Order
    const id = await ctx.state.user.id
    const ret = await new orderModel({
      _id: id,
      orderList: [{
          "_id": "5e4a00dcf53f493fe8c62d45",
          "sellTime": "2019-09-02T18:00:00.000Z",
          "itemName": "角片好军属与相能知月候持况约面装走制低调。",
          "unitPrice": 150,
          "number": 3,
          "totalAmount": 450,
          "orderType": 1,
          "operate": ""
        },
        {
          "_id": "5e4a00dcf53f493fe8c62d46",
          "sellTime": "2019-06-14T00:00:00.000Z",
          "itemName": "小长来小农过热委好三米精别再东边往厂强引许。",
          "unitPrice": 120,
          "number": 6,
          "totalAmount": 720,
          "orderType": 1,
          "operate": ""
        },
        {
          "_id": "5e4a00dcf53f493fe8c62d47",
          "sellTime": "2009-07-28T00:00:00.000Z",
          "itemName": "很身效都据参这层最示记两拉体打速影路该决。",
          "unitPrice": 140,
          "number": 5,
          "totalAmount": 700,
          "orderType": 0,
          "operate": ""
        }
      ]
    }).save()

    this.success(ret)
  }
}

module.exports = OrderController