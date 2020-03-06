/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-12 10:19:53
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-12 10:38:19
 */
const BaseController = require("./base")


class SellController extends BaseController {
  async find() {
    const { ctx } = this
    const sells = await ctx.model.Sell.find({}, { _id: 0, __v: 0 })
    if (sells) {
      this.success(sells[0].data)
    } else {
      this.error("暂无数据")
    }
  }

  async create() {
    const { ctx } = this
    const sellModel = ctx.model.Sell
    const ret = await new sellModel({
      data: [{
        "itemName": "温动极明算流家查积花际如严。",
        "minPrice": 264,
        "imgUrl": "/public/img/cardimg4.jpg"
      }, {
        "itemName": "马候如酸些支在改线无还制度群。",
        "minPrice": 765,
        "imgUrl": "/public/img/cardimg5.jpg"
      }, {
        "itemName": "习定拉件近理得再号结场至也。",
        "minPrice": 994,
        "imgUrl": "/public/img/cardimg3.jpg"
      }, {
        "itemName": "好别气及被向究外容际六二采。",
        "minPrice": 536,
        "imgUrl": "/public/img/cardimg2.jpg"
      }, {
        "itemName": "名县中你他着现界后通引上区资带。",
        "minPrice": 811,
        "imgUrl": "/public/img/cardimg1.jpg"
      }, {
        "itemName": "常华声据严军天求万府北美没例。",
        "minPrice": 667,
        "imgUrl": "/public/img/cardimg4.jpg"
      }]
    }).save()

    this.success(ret)
  }
}

module.exports = SellController