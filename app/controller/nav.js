/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-12 10:19:53
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-13 16:26:14
 */
const BaseController = require("./base")


class NavController extends BaseController {
  async find() {
    const { ctx } = this
    const navs = await ctx.model.Nav.find({}, { __v: 0 })
    if (navs) {
      this.success(navs)
    } else {
      this.error("暂无数据")
    }
  }

  async findQueryNav() {
    const { ctx } = this
    const { parent = "" } = ctx.query
    let navs;
    if (!parent) {
      navs = await ctx.model.Nav.find({}, { hotItems: 0 })
    } else {
      navs = await ctx.model.Nav.find({ _id: parent }, { children: 1 })
    }
    this.success(navs)
  }

  async create() {
    const { ctx } = this
    const navModel = ctx.model.Nav
    const navs = []
    const ret = navs.forEach(async(nav) => {
      return await new navModel(nav).save()
    })
    const ret = await new navModel({
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

  // 横向导航栏
  async lineNav() {
    const { ctx } = this
    const lineNavs = await ctx.model.Nav.find({})
    if (lineNavs && lineNavs.length > 0) {
      this.success(lineNavs)
    } else {
      this.error("暂无数据")
    }
  }
}

module.exports = NavController