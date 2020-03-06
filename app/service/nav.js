/*
 * @Description:
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-12 14:12:42
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-12 15:04:19
 */
const Service = require('egg').Service

class NavService extends Service {
  async getHotChildren(itemType1Id) {
    const { ctx } = this
    console.log('itemType1Id', itemType1Id)
    return ctx.model.Item.find({ isHot: 1, itemType1Id: itemType1Id })
  }
}

module.exports = NavService