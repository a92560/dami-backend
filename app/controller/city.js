/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-11 15:26:33
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-13 16:03:23
 */
const BaseController = require('./base');

class CityController extends BaseController {
  async findOne() {
    const { ctx } = this
    const id = ctx.query.proId
    const cities = await ctx.model.City.find({ id })
    if (cities.length > 0) {
      this.success(cities[0].value)
    } else {
      this.error("暂无数据")
    }
  }

  async getProvince() {
    const { ctx } = this
    const city = await ctx.model.City.aggregate([{
        // 用来展示特定字段
        $project: { _id: 1, value: 1, }
      },
      {
        $unwind: "$value"
      },
      {
        $match: {
          "$or": [
            { "value.id": { $in: ["130100"] } },
          ],
        },
      },
      {
        $limit: 50
      }
    ])
    if (city) {
      this.success(city)
    } else {
      this.error("服务器错误，请稍后重试")
    }
  }


  async queryCity() {
    const { ctx } = this
    const cities = await ctx.model.City.find({}, { _id: 0 }).limit(20)
    this.success(cities)
  }
}

module.exports = CityController