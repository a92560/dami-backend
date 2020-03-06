/*
 * @Description:
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-11 15:59:52
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-12 10:05:32
 */
const BaseController = require('./base')

class AllCitiesController extends BaseController {
  async findOne() {
    const { ctx } = this
    const query = ctx.query.city

    const ret = await ctx.model.AllCity.aggregate([{
        // 用来展示特定字段
        $project: { _id: 1, cities: 1 }
      },
      {
        $unwind: '$cities'
      },
      {
        $match: {
          $or: [
            { 'cities.nm': { $regex: new RegExp(query) } },
            { 'cities.py': { $regex: new RegExp(query) } }
          ]
        }
      },
      {
        $limit: 50
      }
    ])
    if (ret && ret.length === 0) {
      this.error('暂无结果')
    } else {
      this.success(ret)
    }
  }

  async findHot() {
    const { ctx } = this
    const { isHot = [0, 1] } = ctx.query
    const ret = await ctx.model.AllCity.aggregate([{
        $project: {
          _id: 0,
          cities: 1
        }
      },
      {
        $unwind: '$cities'
      },
      {
        $match: {
          $and: [{ 'cities.isHot': { $in: [parseInt(isHot)] } }]
        }
      },
      {
        $limit: 8
      }
    ])
    if (ret.length > 0) {
      this.success(ret)
    } else {
      this.error('服务器错误，请稍后重试')
    }
  }

  async findAll() {
    const { ctx } = this
    const ret = await ctx.model.AllCity.find({})
    if (ret.length > 0) {
      this.success(ret)
    } else {
      this.error("服务器错误，请稍后重试")
    }
  }
}

module.exports = AllCitiesController