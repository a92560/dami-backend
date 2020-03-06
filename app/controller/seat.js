const BaseController = require('./base')

class SeatController extends BaseController {
  async create() {
    const { ctx } = this
    const seats = [{
      "id": "5e439079854fc0452074abb0",
      "seatArray": ["_____aaaaa_____aaaa_____aaaa____", "___ccccccc____cccccc____ccccc___", "__aaaaaaaa___aaaaaaaa___aaaaaa__", "__cccccccc__bbbbbbbbbb__ccccccc_", "_aaccccccc_bbbbbbbbbbbb_ccccccca", "_aaccccccc_bbbbbbbbbbbb_ccccccca", "________________________________", "_aaaaaaaaa__cccccccccc__aaaaaaaa", "_aaaaaaaaa__cccccccccc__aaaaaaaa", "__aaaaaaaa___aaaaaaaa___aaaaaaa_", "__aaaaaaaa___aaaaaaaa___aaaaaaa_"],
      "seatPriceArray": [{
        "areaLevelName": "A",
        "price": 90
      }, {
        "areaLevelName": "B",
        "price": 100
      }, {
        "areaLevelName": "C",
        "price": 120
      }],
      "selectedSeatArray": [{
        "id": "1_6",
        "x": 1,
        "y": 6,
        "areaLevel": "A",
        "cinemaId": "12",
        "status": 1
      }, {
        "id": "1_7",
        "x": 1,
        "y": 7,
        "areaLevel": "A",
        "cinemaId": "12",
        "status": 1
      }]
    }, {
      "id": "5e439079854fc0452074abb1",
      "seatArray": ["_____aaaaa_____bbbb_____aaaa____", "___ccccccc____cccccc____ccccc___", "__aaaaaaaa___aaaaaaaa___aaaaaa__", "__cccccccc__bbbbbbbbbb__ccccccc_", "_aaccccccc_bbbbbbbbbbbb_ccccccca", "_aaccccccc_bbbbbbbbbbbb_ccccccca", "________________________________", "_aaaaaaaaa__cccccccccc__aaaaaaaa", "_aaaaaaaaa__cccccccccc__aaaaaaaa", "__aaaaaaaa___aaaaaaaa___aaaaaaa_", "__aaaaaaaa___cccccaaaa___aaaaaaa_"],
      "seatPriceArray": [{
        "areaLevelName": "A",
        "price": 90
      }, {
        "areaLevelName": "B",
        "price": 100
      }, {
        "areaLevelName": "C",
        "price": 120
      }],
      "selectedSeatArray": [{
        "id": "1_8",
        "x": 1,
        "y": 8,
        "areaLevel": "A",
        "cinemaId": "12",
        "status": 1
      }, {
        "id": "1_9",
        "x": 1,
        "y": 9,
        "areaLevel": "A",
        "cinemaId": "12",
        "status": 1
      }]
    }, {
      "id": "5e439079854fc0452074abb2",
      "seatArray": ["_____aaaaa_____aaaa_____aaaa____", "___ccccccc____cccccc____ccccc___", "__aaaaaaaa___aaaaaaaa___aaaaaa__", "__cccccccc__bbbbbbbbbb__ccccccc_", "_aabbccccc_bbbbbbbbbbbb_ccccccca", "_aabbccccc_bbbbbbbbbbbb_ccccccca", "________________________________", "_ccccccccc__cccccccccc__aaaaaaaa", "_aaaaaaaaa__cccccccccc__aaaaaaaa", "__aaaaaaaa___aaaaaaaa___aaaaaaa_", "__aaaaaaaa___aaaaaaaa___aaaaaaa_"],
      "seatPriceArray": [{
        "areaLevelName": "A",
        "price": 90
      }, {
        "areaLevelName": "B",
        "price": 100
      }, {
        "areaLevelName": "C",
        "price": 120
      }],
      "selectedSeatArray": [{
        "id": "1_16",
        "x": 1,
        "y": 16,
        "areaLevel": "A",
        "cinemaId": "12",
        "status": 1
      }, {
        "id": "1_17",
        "x": 1,
        "y": 17,
        "areaLevel": "A",
        "cinemaId": "12",
        "status": 1
      }]
    }, {
      "id": "5e439079854fc0452074abb3",
      "seatArray": ["_____aaaaa_____aaaa_____aaaa____", "___ccccccc____cccccc____ccccc___", "__aaaaaaaa___aaaaaaaa___aaaaaa__", "__cccccccc__bbbbbbbbbb__ccccccc_", "_aaccccccc_bbbbbbbbbbbb_ccccccca", "_aaccccccc_bbbbbbbbbbbb_ccccccca", "________________________________", "_aaaaaaaaa__cccccccccc__aaaaaaaa", "_aaaaaaaaa__cccccccccc__aaaaaaaa", "__aaaaaaaa___aaaaaaaa___aaaaaaa_", "__aaaaaaaa___aaaaaaaa___aaaaaaa_"],
      "seatPriceArray": [{
        "areaLevelName": "A",
        "price": 90
      }, {
        "areaLevelName": "B",
        "price": 100
      }, {
        "areaLevelName": "C",
        "price": 120
      }],
      "selectedSeatArray": [{
        "id": "1_6",
        "x": 1,
        "y": 6,
        "areaLevel": "A",
        "cinemaId": "12",
        "status": 1
      }, {
        "id": "1_7",
        "x": 1,
        "y": 7,
        "areaLevel": "A",
        "cinemaId": "12",
        "status": 1
      }]
    }, {
      "id": "5e439079854fc0452074abb4",
      "seatArray": ["_____aaaaa_____bbbb_____aaaa____", "___ccccccc____cccccc____ccccc___", "__aaaaaaaa___aaaaaaaa___aaaaaa__", "__cccccccc__bbbbbbbbbb__ccccccc_", "_aaccccccc_bbbbbbbbbbbb_ccccccca", "_aaccccccc_bbbbbbbbbbbb_ccccccca", "________________________________", "_aaaaaaaaa__cccccccccc__aaaaaaaa", "_aaaaaaaaa__cccccccccc__aaaaaaaa", "__aaaaaaaa___aaaaaaaa___aaaaaaa_", "__aaaaaaaa___cccccaaaa___aaaaaaa_"],
      "seatPriceArray": [{
        "areaLevelName": "A",
        "price": 90
      }, {
        "areaLevelName": "B",
        "price": 100
      }, {
        "areaLevelName": "C",
        "price": 120
      }],
      "selectedSeatArray": [{
        "id": "1_8",
        "x": 1,
        "y": 8,
        "areaLevel": "A",
        "cinemaId": "12",
        "status": 1
      }, {
        "id": "1_9",
        "x": 1,
        "y": 9,
        "areaLevel": "A",
        "cinemaId": "12",
        "status": 1
      }]
    }, {
      "id": "5e439079854fc0452074abb5",
      "seatArray": ["_____aaaaa_____aaaa_____aaaa____", "___ccccccc____cccccc____ccccc___", "__aaaaaaaa___aaaaaaaa___aaaaaa__", "__cccccccc__bbbbbbbbbb__ccccccc_", "_aabbccccc_bbbbbbbbbbbb_ccccccca", "_aabbccccc_bbbbbbbbbbbb_ccccccca", "________________________________", "_ccccccccc__cccccccccc__aaaaaaaa", "_aaaaaaaaa__cccccccccc__aaaaaaaa", "__aaaaaaaa___aaaaaaaa___aaaaaaa_", "__aaaaaaaa___aaaaaaaa___aaaaaaa_"],
      "seatPriceArray": [{
        "areaLevelName": "A",
        "price": 90
      }, {
        "areaLevelName": "B",
        "price": 100
      }, {
        "areaLevelName": "C",
        "price": 120
      }],
      "selectedSeatArray": [{
        "id": "1_16",
        "x": 1,
        "y": 16,
        "areaLevel": "A",
        "cinemaId": "12",
        "status": 1
      }, {
        "id": "1_17",
        "x": 1,
        "y": 17,
        "areaLevel": "A",
        "cinemaId": "12",
        "status": 1
      }]
    }]
    const rets = []
    seats.forEach(async seat => {
      let ret = await new ctx.model.Seat(seat).save()
      rets.push(ret)
    })
    this.success(rets)
  }

  async find() {
    const { ctx } = this
    const ret = await ctx.model.Seat.find({})
    this.success(ret)
  }

  async findOne() {
    const { ctx } = this
    const { id = '' } = ctx.query
    if (!id) {
      this.error('暂无数据,请稍后重试')
    }
    const ret = await ctx.model.Seat.find({ id })
    if (ret) {
      this.success(ret)
    }
  }
}

module.exports = SeatController