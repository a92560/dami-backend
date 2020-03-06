/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-11 15:03:09
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-11 15:37:10
 */
const BaseController = require("./base")

class ProvinceController extends BaseController {
  async find() {
    const { ctx } = this
    const provinces = await ctx.model.Province.find({})
    console.log("find:::", provinces)
    if (provinces.length > 0) {
      this.success(provinces)
    }
  }
}

module.exports = ProvinceController