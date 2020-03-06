/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-12 10:19:53
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-12 10:38:34
 */
const BaseController = require("./base")


class RecommendController extends BaseController {
  async find() {
    const { ctx } = this
    const recommends = await ctx.model.Recommend.find({}, { _id: 0, __v: 0 })
    if (recommends) {
      this.success(recommends[0].data)
    } else {
      this.error("暂无数据")
    }
  }

  async create() {
    const { ctx } = this
    const recommendModel = ctx.model.Recommend
    const ret = await new recommendModel({
      data: [{
        "itemName": "决省角系平总院员方你广红色还局斗林元。",
        "minPrice": 792,
        "imgUrl": "/public/img/cardimg4.jpg"
      }, {
        "itemName": "花克表除节毛题军例千节究。",
        "minPrice": 580,
        "imgUrl": "/public/img/cardimg5.jpg"
      }, {
        "itemName": "北养命日造根最而头细大光备。",
        "minPrice": 879,
        "imgUrl": "/public/img/cardimg3.jpg"
      }, {
        "itemName": "称段转质称算节建组置决议长导处存社。",
        "minPrice": 106,
        "imgUrl": "/public/img/cardimg2.jpg"
      }, {
        "itemName": "识打且面规所边关半与相实起热才及被几。",
        "minPrice": 352,
        "imgUrl": "/public/img/cardimg1.jpg"
      }, {
        "itemName": "志南于记效火派决总做作越地称发名复张。",
        "minPrice": 556,
        "imgUrl": "/public/img/cardimg4.jpg"
      }]
    }).save()

    this.success(ret)
  }
}

module.exports = RecommendController