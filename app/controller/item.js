/*
 * @Description:
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-12 10:19:53
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-14 14:22:34
 */
const BaseController = require('./base')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

class ItemController extends BaseController {
  async find() {
    const { ctx } = this
    let {
      keyword,
      cityId: areaId,
      pageSize,
      currentPage,
      itemTypeId1: itemType1Id,
      itemTypeId2: itemType2Id,
      sort,
      indexList = false,
      startTime = '',
      endTime = ''
    } = ctx.query
    pageSize = Math.max(1, Number(pageSize))
    currentPage = Math.max(1, Number(currentPage))
    const skip = (currentPage - 1) * pageSize
    let index = -1
    let conditions = [{
        areaId: areaId ? areaId : /./,
        itemName: keyword ? { $regex: new RegExp(keyword) } : /./
      },
      {
        areaId: areaId ? areaId : /./,
        itemType1Id: itemType1Id,
        itemName: keyword ? { $regex: new RegExp(keyword) } : /./
      },
      {
        areaId: areaId ? areaId : /./,
        itemType2Id: itemType2Id,
        itemName: keyword ? { $regex: new RegExp(keyword) } : /./
      },
      {
        areaId: areaId ? areaId : /./,
        itemType1Id: itemType1Id,
        itemType2Id: itemType2Id,
        itemName: keyword ? { $regex: new RegExp(keyword) } : /./
      },
      { itemName: 1, itemType1Id: 1, itemType2Id: 1 },
      {},
      {
        startTime: {
          $elemMatch: { $gte: new Date(startTime), $lte: new Date(endTime) }
        }
      },
      {
        endTime: {
          $elemMatch: { $gte: new Date(startTime), $lte: new Date(endTime) }
        }
      },
      {
        startTime: {
          $elemMatch: { $gt: new Date(startTime), $lt: new Date(endTime) }
        },
        endTime: {
          $elemMatch: { $gt: new Date(startTime), $lt: new Date(endTime) }
        }
      }
    ]

    console.log('startTime', startTime)
    console.log('endTime', endTime)
    console.log('(!startTime && !endTime)', startTime && endTime)

    function handleTime() {
      if (!startTime && !endTime) {
        conditions[index] = {...conditions[index], ...conditions[5] }
      }
      if (startTime && !endTime) {
        conditions[index] = {...conditions[index], ...conditions[6] }
      }
      if (!startTime && endTime) {
        conditions[index] = {...conditions[index], ...conditions[7] }
      }
      if (startTime && endTime) {
        conditions[index] = {...conditions[index], ...conditions[8] }
      }
    }
    console.log('itemType1Id', itemType1Id)
    console.log('itemType2Id', itemType2Id)
    console.log('indexList', indexList)
    if (itemType1Id === '0' && itemType2Id === '0') {
      index = 0
      handleTime()
    } else if (itemType1Id && itemType2Id === '0') {
      index = 1
      handleTime()
    } else if (itemType1Id === '0' && itemType2Id) {
      index = 2
      handleTime()
    } else if (itemType1Id && itemType2Id) {
      index = 3
      handleTime()
    } else {
      index = 0
    }
    // indexList 表示展现首页搜索框
    console.log(index, 'index:::::::::')
    console.log(conditions[index], 'conditions[index]:::::::::')
    let itemModel = ctx.model.Item.find(conditions[index])
    let total = await itemModel.count()
    itemModel = ctx.model.Item.find(
      conditions[index],
      indexList ? conditions[4] : {}
    )
    const items = await itemModel
      .skip(skip)
      .limit(pageSize)
      .populate({ path: 'cinemaItem' })
      .populate({ path: 'cityItem' })
    if (items) {
      this.success(indexList ? items : { items, total, currentPage, pageSize })
    } else {
      this.error('暂无数据')
    }
  }

  async create() {
    const { ctx } = this
    const itemModel = ctx.model.Item
    const items = [{
        itemName: '理段分北议界求张素明本划心些里类观情即高。',
        avgScore: 2.6,
        imgUrl: '/public/img/calendar05.png',
        bigImgUrl: '',
        areaId: '120100',
        itemType1Id: '5e4375b24ab4712c5025b9b6',
        itemType2Id: '',
        state: 1,
        isHot: 1,
        abstractMessage: '少党代比门圆广热动复号根马就选新精具。',
        startTime: ['1997-06-02', '2003-02-24', '1999-02-06'],
        endTime: ['2012-02-06', '1971-10-20', '2013-11-18'],
        cinemaId: '102',
        address: '中国儿童中心剧院 - 海淀1',
        comments: [{
            userId: '12',
            imgUrl: '/public/img/avatar.jpg',
            score: 1.6,
            content: '喜剧风格引发深刻思考，精采!精采!精采!非常值得一看1!',
            createdTime: '2007-07-12'
          },
          {
            userId: '12',
            imgUrl: '/public/img/avatar.jpg',
            score: 2.6,
            content: '喜剧风格引发深刻思考，精采!精采!精采!非常值得一看2!',
            createdTime: '2000-09-01'
          },
          {
            userId: '12',
            imgUrl: '/public/img/avatar.jpg',
            score: 3.6,
            content: '喜剧风格引发深刻思考，精采!精采!精采!非常值得一看3!',
            createdTime: '1975-11-12'
          },
          {
            userId: '12',
            imgUrl: '/public/img/avatar.jpg',
            score: 4.6,
            content: '喜剧风格引发深刻思考，精采!精采!精采!非常值得一看4!',
            createdTime: '2018-09-18'
          }
        ],
        latitude: 78.36581517794424,
        longitude: 64.0175724886,
        minPrice: 98,
        maxPrice: 103
      },
      {
        itemName: '前次型定节自精色除养候回养状基织次被验金。',
        avgScore: 2.6,
        imgUrl: '/public/img/calendar05.png',
        bigImgUrl: '',
        areaId: '130100',
        itemType1Id: '5e4375b24ab4712c5025b9cf',
        itemType2Id: '5e4375b24ab4712c5025b9d0',
        state: 1,
        isHot: 1,
        abstractMessage: '工论元利在你加路约法现身格标给带东。',
        startTime: ['1981-01-13', '2015-07-24', '1989-05-20'],
        endTime: ['1971-01-15', '1984-06-20', '2018-12-27'],
        cinemaId: '102',
        address: '中国儿童中心剧院 - 海淀1',
        comments: [{
            userId: '12',
            imgUrl: '/public/img/avatar.jpg',
            score: 1.6,
            content: '喜剧风格引发深刻思考，精采!精采!精采!非常值得一看1!',
            createdTime: '2007-07-12'
          },
          {
            userId: '12',
            imgUrl: '/public/img/avatar.jpg',
            score: 2.6,
            content: '喜剧风格引发深刻思考，精采!精采!精采!非常值得一看2!',
            createdTime: '2000-09-01'
          },
          {
            userId: '12',
            imgUrl: '/public/img/avatar.jpg',
            score: 3.6,
            content: '喜剧风格引发深刻思考，精采!精采!精采!非常值得一看3!',
            createdTime: '1975-11-12'
          },
          {
            userId: '12',
            imgUrl: '/public/img/avatar.jpg',
            score: 4.6,
            content: '喜剧风格引发深刻思考，精采!精采!精采!非常值得一看4!',
            createdTime: '2018-09-18'
          }
        ],
        latitude: 81.886342385,
        longitude: 90.66778115983318,
        minPrice: 97,
        maxPrice: 112
      },
      {
        itemName: '价油变门头位路电根史和如据着林用便完适学。',
        avgScore: 2.6,
        imgUrl: '/public/img/calendar05.png',
        bigImgUrl: '',
        areaId: '110100',
        itemType1Id: '5e4375b24ab4712c5025b9c6',
        itemType2Id: '5e4375b24ab4712c5025b9c8',
        state: 0,
        isHot: 1,
        abstractMessage: '多动住解展准候取车场难了的同。',
        startTime: ['2019-01-15', '1977-01-07', '2007-11-26'],
        endTime: ['1980-02-07', '1991-10-13', '2007-07-19'],
        cinemaId: '102',
        address: '中国儿童中心剧院 - 海淀1',
        comments: [{
            userId: '12',
            imgUrl: '/public/img/avatar.jpg',
            score: 1.6,
            content: '喜剧风格引发深刻思考，精采!精采!精采!非常值得一看1!',
            createdTime: '2007-07-12'
          },
          {
            userId: '12',
            imgUrl: '/public/img/avatar.jpg',
            score: 2.6,
            content: '喜剧风格引发深刻思考，精采!精采!精采!非常值得一看2!',
            createdTime: '2000-09-01'
          },
          {
            userId: '12',
            imgUrl: '/public/img/avatar.jpg',
            score: 3.6,
            content: '喜剧风格引发深刻思考，精采!精采!精采!非常值得一看3!',
            createdTime: '1975-11-12'
          },
          {
            userId: '12',
            imgUrl: '/public/img/avatar.jpg',
            score: 4.6,
            content: '喜剧风格引发深刻思考，精采!精采!精采!非常值得一看4!',
            createdTime: '2018-09-18'
          }
        ],
        latitude: 63.5732372387,
        longitude: 66.13626333033,
        minPrice: 77,
        maxPrice: 261
      },
      {
        itemName: '式我群红受话区报产质维地级你价说五验中把。',
        avgScore: 2.6,
        imgUrl: '/public/img/calendar05.png',
        bigImgUrl: '',
        areaId: '130200',
        itemType1Id: '5e4375b24ab4712c5025b9be',
        itemType2Id: '',
        state: 0,
        isHot: 1,
        abstractMessage: '那提满资构酸阶参适积标集叫状。',
        startTime: ['1987-09-22', '1990-09-13', '2007-02-28'],
        endTime: ['2003-03-29', '1972-04-09', '2020-01-18'],
        cinemaId: '102',
        address: '中国儿童中心剧院 - 海淀1',
        comments: [{
            userId: '12',
            imgUrl: '/public/img/avatar.jpg',
            score: 1.6,
            content: '喜剧风格引发深刻思考，精采!精采!精采!非常值得一看1!',
            createdTime: '2007-07-12'
          },
          {
            userId: '12',
            imgUrl: '/public/img/avatar.jpg',
            score: 2.6,
            content: '喜剧风格引发深刻思考，精采!精采!精采!非常值得一看2!',
            createdTime: '2000-09-01'
          },
          {
            userId: '12',
            imgUrl: '/public/img/avatar.jpg',
            score: 3.6,
            content: '喜剧风格引发深刻思考，精采!精采!精采!非常值得一看3!',
            createdTime: '1975-11-12'
          },
          {
            userId: '12',
            imgUrl: '/public/img/avatar.jpg',
            score: 4.6,
            content: '喜剧风格引发深刻思考，精采!精采!精采!非常值得一看4!',
            createdTime: '2018-09-18'
          }
        ],
        latitude: 61.803349,
        longitude: 83.82654,
        minPrice: 88,
        maxPrice: 281
      },
      {
        itemName: '门为之圆种局指方路写过性北手任众眼代合行。',
        avgScore: 2.6,
        imgUrl: '/public/img/calendar05.png',
        bigImgUrl: '',
        areaId: '130300',
        itemType1Id: '5e4375b24ab4712c5025b9d8',
        itemType2Id: '5e4375b24ab4712c5025b9da',
        state: 2,
        isHot: 1,
        abstractMessage: '力体见查准论农铁重做活专种示温。',
        startTime: ['1987-12-22', '2004-08-25', '1999-08-05'],
        endTime: ['2009-12-04', '1986-09-24', '2008-11-06'],
        cinemaId: '102',
        address: '中国儿童中心剧院 - 海淀1',
        comments: [{
            userId: '12',
            imgUrl: '/public/img/avatar.jpg',
            score: 1.6,
            content: '喜剧风格引发深刻思考，精采!精采!精采!非常值得一看1!',
            createdTime: '2007-07-12'
          },
          {
            userId: '12',
            imgUrl: '/public/img/avatar.jpg',
            score: 2.6,
            content: '喜剧风格引发深刻思考，精采!精采!精采!非常值得一看2!',
            createdTime: '2000-09-01'
          },
          {
            userId: '12',
            imgUrl: '/public/img/avatar.jpg',
            score: 3.6,
            content: '喜剧风格引发深刻思考，精采!精采!精采!非常值得一看3!',
            createdTime: '1975-11-12'
          },
          {
            userId: '12',
            imgUrl: '/public/img/avatar.jpg',
            score: 4.6,
            content: '喜剧风格引发深刻思考，精采!精采!精采!非常值得一看4!',
            createdTime: '2018-09-18'
          }
        ],
        latitude: 99.8448215468,
        longitude: 99.55719536844,
        minPrice: 67,
        maxPrice: 253
      },
      {
        itemName: '什持报步准严门美拉部先华前结见争约影过但。',
        avgScore: 2.6,
        imgUrl: '/public/img/calendar05.png',
        bigImgUrl: '',
        areaId: '130300',
        itemType1Id: '5e4375b24ab4712c5025b9ad',
        itemType2Id: '5e4375b24ab4712c5025b9af',
        state: 1,
        isHot: 1,
        abstractMessage: '平石但好般给知始定志领取再油。',
        startTime: ['1998-02-25', '2010-04-08', '1979-02-05'],
        endTime: ['1979-06-09', '2001-06-14', '1994-11-18'],
        cinemaId: '102',
        address: '中国儿童中心剧院 - 海淀1',
        comments: [{
            userId: '12',
            imgUrl: '/public/img/avatar.jpg',
            score: 1.6,
            content: '喜剧风格引发深刻思考，精采!精采!精采!非常值得一看1!',
            createdTime: '2007-07-12'
          },
          {
            userId: '12',
            imgUrl: '/public/img/avatar.jpg',
            score: 2.6,
            content: '喜剧风格引发深刻思考，精采!精采!精采!非常值得一看2!',
            createdTime: '2000-09-01'
          },
          {
            userId: '12',
            imgUrl: '/public/img/avatar.jpg',
            score: 3.6,
            content: '喜剧风格引发深刻思考，精采!精采!精采!非常值得一看3!',
            createdTime: '1975-11-12'
          },
          {
            userId: '12',
            imgUrl: '/public/img/avatar.jpg',
            score: 4.6,
            content: '喜剧风格引发深刻思考，精采!精采!精采!非常值得一看4!',
            createdTime: '2018-09-18'
          }
        ],
        latitude: 95.47878456704777,
        longitude: 73.547788714469,
        minPrice: 68,
        maxPrice: 263
      }
    ]
    const ret = items.forEach(async item => {
      return await new itemModel(item).save()
    })

    this.success(ret)
  }

  async findIndexItem() {
    const { ctx } = this
    const ret = await ctx.model.Item.find({}, {
      itemName: 1,
      imgUrl: 1,
      _id: 1,
      itemType1Id: 1,
      itemType2Id: 1,
      minPrice: 1
    })
    this.success(ret)
  }

  async getFloorItems() {
    const { ctx } = this
    const index = ctx.query.index || 0
    const navIds = [
      '5e4375b24ab4712c5025b9ad',
      '5e4375b24ab4712c5025b9c6',
      '5e4375b24ab4712c5025b9cf',
      '5e4375b24ab4712c5025b9be',
      '5e4375b24ab4712c5025b9d8'
    ]
    let ret = await ctx.model.Item.find({ itemType1Id: navIds[index] }, {
      itemName: 1,
      imgUrl: 1,
      _id: 1,
      itemType1Id: 1,
      itemType2Id: 1,
      minPrice: 1,
      bigImgUrl: 1,
      startTime: 1,
      endTime: 1,
      areaId: 1
    })
    const itemTypeName = await ctx.model.Nav.find({ _id: navIds[index] }, { itemType: 1 })
    this.success({
      index: parseInt(index) + 1,
      itemTypeId: navIds[index],
      items: ret,
      itemType: itemTypeName[0].itemType
    })
  }

  async findOne() {
    const { ctx } = this
    const { id } = ctx.query
    const ret = await ctx.model.Item.find({ _id: id })
      .populate({ path: 'cinemaItem' })
      .populate({ path: 'cityItem' })
      .populate('itemType1Id')
      .populate('itemType2Id')
      // const ret = await ctx.model.Item.aggregate([{
      //     $project: {
      //       comments: 0
      //     }
      //   },
      //   {
      //     $match: {
      //       _id: ObjectId(id)
      //     }
      //   },
      //   {
      //     $unwind: "$cinemaId"
      //   },
      //   {
      //     $lookup: {
      //       from: 'navs',
      //       let: { itemTypeId: '$itemType1Id' },
      //       pipeline: [{
      //           $match: {
      //             $expr: {
      //               $and: [{ $eq: ['$_id', '$$itemTypeId'] }]
      //             }
      //           }
      //         },
      //         { $project: { itemType: 1, children: 1 } }
      //       ],
      //       // localField: "itemType1Id",
      //       // foreignField: "_id",
      //       as: 'nav_docs'
      //     }
      //   },
      //   {
      //     $lookup: {
      //       from: 'cities',
      //       let: { areaId: '$areaId' },
      //       pipeline: [{
      //           $unwind: '$value'
      //         },
      //         {
      //           $match: {
      //             $expr: {
      //               $and: [{ $eq: ['$value.id', '$$areaId'] }]
      //             }
      //           }
      //         }
      //       ],
      //       // localField: "itemType1Id",
      //       // foreignField: "_id",
      //       as: 'city_docs'
      //     }
      //   },
      //   {
      //     $lookup: {
      //       from: 'cinemas',
      //       let: { cinemaId: '$cinemaId.id' },
      //       pipeline: [{
      //         $match: {
      //           $expr: {
      //             $and: [{ $eq: ['$cinemaId', '$$cinemaId'] }]
      //           }
      //         }
      //       }],
      //       // localField: "itemType1Id",
      //       // foreignField: "_id",
      //       as: 'cinema_docs'
      //     }
      //   },
      // ]);
      // const areaId = ret.areaId
      // const city = await ctx.model.City.aggregate([{
      //       // 用来展示特定字段
      //       $project: { _id: 1, value: 1, }
      //     },
      //     {
      //       $unwind: "$value"
      //     },
      //     {
      //       $match: {
      //         "$or": [
      //           { "value.id": { $in: [areaId] } },
      //         ],
      //       },
      //     },
      //     {
      //       $limit: 50
      //     }
      //   ])
      // const ret = await ctx.model.Item.aggregate([{
      //   $match: {
      //     _id: ObjectId(id)
      //   }
      // }, {
      //   $lookup: {
      //     from: "City",
      //     // 获取Item的值
      //     let: { areaId1: "$areaId" },
      //     pipeline: [{ $unwind: "$value" }, {
      //       $match: {
      //         $expr: {
      //           $or: [
      //             { $eq: ["$id", "$$areaId1"] },
      //             { $eq: ["$$areaId1", "value.id"] },
      //           ]
      //         }
      //       }
      //     }, ],
      //     as: "item_docs"
      //   }
      // }])
    console.log('ret', ret)
    if (!ret) {
      this.error('暂无数据，请稍后重试')
    }
    this.success(ret)
  }

  async updateAvatar() {
    const { ctx } = this
    const ret = await ctx.model.Item.update({ 'comments.imgUrl': '/static/img/avatar.jpg' }, { $set: { 'comments.$.imgUrl': '/public/img/avatar.jpg' } }, { multi: true })
    this.success(ret)
  }

  async getComments() {
    const { ctx } = this
    const id = ctx.query.id
    if (!id) {
      this.error('服务器错误请重试')
      return
    }
    const ret = await ctx.model.Item.aggregate([{
        $project: {
          comments: 1,
          _id: 1
        }
      },
      {
        $unwind: '$comments'
      },
      {
        $match: {
          _id: ObjectId(id)
        }
      },
      {
        $lookup: {
          from: 'users',
          let: { userId: '$comments.userId' },
          pipeline: [{
              $match: {
                $expr: {
                  $and: [{ $eq: ['$_id', '$$userId'] }]
                }
              }
            },
            {
              $project: {
                email: 1
              }
            }
          ],
          // localField: "itemType1Id",
          // foreignField: "_id",
          as: 'user_docs'
        }
      },
      { $sort: { 'comments._id': -1 } }
    ])
    this.success(ret)
  }

  async updateAddress() {
    const { ctx } = this
    const ids = await ctx.model.Item.find({}, { _id: 1 })
    const addresses = [
      { name: '广州', log: '113.23', lat: '23.16' },
      { name: '花县', log: '113.19', lat: '23.4' },
      { name: '新十', log: '114.2', lat: '24.09' },
      { name: '增城', log: '113.81', lat: '23.13' },
      { name: '从化', log: '113.55', lat: '23.57' },
      { name: '龙门', log: '114.25', lat: '23.75' },
      { name: '番禺', log: '113.36', lat: '22.95' },
      { name: '海口', log: '110.35', lat: '20.02' },
      { name: '汕头', log: '116.69', lat: '23.39' },
      { name: '洪江', log: '110.38', lat: '21.2' },
      { name: '茂名', log: '110.88', lat: '21.68' },
      { name: '佛山', log: '113.11', lat: '23.05' },
      { name: '江门', log: '113.06', lat: '22.61' },
      { name: '深圳', log: '114.07', lat: '22.62' },
      { name: '宝安', log: '113.85', lat: '22.58' },
      { name: '珠海', log: '113.52', lat: '22.3' },
      { name: '韶关', log: '113.62', lat: '24.84' },
      { name: '曲江', log: '113.58', lat: '24.68' },
      { name: '乐昌', log: '113.35', lat: '25.14' },
      { name: '仁化', log: '113.73', lat: '25.11' },
      { name: '南雄', log: '114.33', lat: '25.14' },
      { name: '始兴', log: '114.08', lat: '24.78' },
      { name: '翁源', log: '114.13', lat: '24.36' },
      { name: '佛岗', log: '113.52', lat: '23.86' },
      { name: '英德', log: '113.38', lat: '24.17' },
      { name: '清远', log: '113.01', lat: '23.7' },
      { name: '阳山', log: '112.65', lat: '24.48' },
      { name: '连县', log: '112.4', lat: '24.77' },
      { name: '连山', log: '112.07', lat: '24.59' },
      { name: '连南', log: '112.28', lat: '24.77' },
      { name: '惠州', log: '114.4', lat: '23.09' },
      { name: '惠阳', log: '114.4', lat: '23.09' },
      { name: '博罗', log: '114.28', lat: '23.18' },
      { name: '河源', log: '114.68', lat: '23.73' },
      { name: '连平', log: '114.48', lat: '24.39' },
      { name: '和平', log: '114.89', lat: '24.45' },
      { name: '龙川', log: '115.25', lat: '24.09' },
      { name: '紫金', log: '115.18', lat: '23.64' },
      { name: '惠东', log: '114.7', lat: '22.97' },
      { name: '东莞', log: '113.75', lat: '23.04' },
      { name: '梅州', log: '116.1', lat: '24.55' },
      { name: '梅县', log: '116.1', lat: '24.55' },
      { name: '平远', log: '117.9', lat: '24.59' },
      { name: '蕉岭', log: '116.18', lat: '24.66' },
      { name: '大埔', log: '116.7', lat: '24.34' },
      { name: '丰顺', log: '116.18', lat: '23.78' },
      { name: '五华', log: '115.75', lat: '23.93' },
      { name: '兴宁', log: '115.75', lat: '24.15' },
      { name: '潮州', log: '116.63', lat: '23.68' },
      { name: '澄海', log: '116.8', lat: '23.48' },
      { name: '潮安', log: '116.63', lat: '23.68' },
      { name: '饶平', log: '117.01', lat: '23.7' },
      { name: '南澳', log: '117.03', lat: '23.44' },
      { name: '潮阳', log: '116.61', lat: '23.27' },
      { name: '惠来', log: '116.29', lat: '23.07' },
      { name: '陆丰', log: '117.64', lat: '22.95' },
      { name: '海丰', log: '117.33', lat: '22.98' },
      { name: '普宁', log: '116.17', lat: '23.29' },
      { name: '揭西', log: '115.82', lat: '23.45' },
      { name: '揭阳', log: '116.35', lat: '23.55' },
      { name: '南海', log: '113.11', lat: '23.05' },
      { name: '三水', log: '112.89', lat: '23.18' },
      { name: '顺德', log: '113.24', lat: '22.84' },
      { name: '中山', log: '113.38', lat: '22.52' },
      { name: '斗门', log: '113.25', lat: '22.2' },
      { name: '新会', log: '113.02', lat: '22.52' },
      { name: '鹤山', log: '112.94', lat: '22.76' },
      { name: '开平', log: '112.68', lat: '22.36' },
      { name: '台山', log: '112.78', lat: '22.27' },
      { name: '恩平', log: '112.29', lat: '22.21' },
      { name: '高明', log: '112.76', lat: '21.71' },
      { name: '廉江', log: '110.27', lat: '21.63' },
      { name: '化州', log: '110.59', lat: '21.64' },
      { name: '高州', log: '110.83', lat: '21.95' },
      { name: '信宜', log: '110.9', lat: '22.36' },
      { name: '阳春', log: '111.78', lat: '22.16' },
      { name: '阳江', log: '111.95', lat: '21.85' },
      { name: '电白', log: '110.99', lat: '21.52' },
      { name: '吴川', log: '110.78', lat: '21.43' },
      { name: '徐闻', log: '110.17', lat: '20.34' },
      { name: '海康', log: '110.07', lat: '20.91' },
      { name: '遂溪', log: '110.24', lat: '21.39' },
      { name: '肇庆', log: '112.44', lat: '23.05' },
      { name: '高要', log: '112.44', lat: '23.05' },
      { name: '怀集', log: '112.18', lat: '23.93' },
      { name: '广宁', log: '112.43', lat: '23.14' },
      { name: '四会', log: '112.68', lat: '23.36' },
      { name: '新兴', log: '112.2', lat: '22.68' },
      { name: '云浮', log: '112.02', lat: '22.93' },
      { name: '罗定', log: '111.56', lat: '22.77' },
      { name: '郁南', log: '111.51', lat: '23.23' },
      { name: '德庆', log: '111.75', lat: '23.15' },
      { name: '封开', log: '111.48', lat: '23.45' }
    ]

    ids.forEach(async(item, i) => {
      await ctx.model.Item.update({
        _id: ObjectId(item._id)
      }, {
        longitude: addresses[i].log,
        latitude: addresses[i].lat
      })
    })
    this.success('更新成功')
  }

  async postHistory() {
    const { ctx } = this
    const { id, userId } = ctx.request.body || {}
    const ret = await ctx.model.User.update({ _id: ObjectId(userId) }, {
      $push: {
        historyList: {
          itemId: id
        }
      }
    })
    this.success(ret)
  }

  async getHistory(userId1) {
    const { ctx } = this
    const { userId } = ctx.query || userId1
    const ret = await ctx.model.User.aggregate([{
          $project: { historyList: 1, _id: 1 }
        },
        {
          $unwind: '$historyList'
        },
        {
          $match: {
            _id: ObjectId(userId)
              // "orderList.itemName": {
              //   $regex: /好/
              // }
              // ...conditions[3]
          }
        },
        // {
        //   $project: {
        //     itemName: 1
        //   }
        // },
        {
          $lookup: {
            from: 'items',
            let: { historyListId: '$historyList.itemId' },
            pipeline: [{
              $match: {
                $expr: {
                  $and: [{ $eq: ['$_id', '$$historyListId'] }]
                }
              }
            }],
            // localField: "orderList.itemId",
            // foreignField: "_id",
            as: 'item_docs'
          }
        }
      ])
      // const ret = await ctx.model.User.aggregate([{
      //   $unwind: "$orderList"
      // }, {
      //   $match: { "_id": { $in: [_id] } }
      // }])

    if (ret) {
      this.success(ret)
    }
    return ret
      // this.success(ret)
  }

  async getRecommend() {
    const { ctx } = this
    const { areaId, userId } = ctx.query
    const realId = await this.getAreaId(areaId)
    let realAreaId = ''
    if (realId[0] && realId[0].value && realId[0].value && realId[0].value.id) {
      realAreaId = realId[0].value.id
    }
    console.log()
    const ret2 = await this.getHistory(userId)
      // console.log('ret2', ret2);
    const ret3 = this.findMaxItemTypeId(ret2)
      // console.log(ret3);
    const condition = {}
    if (ret3[0]) {
      condition['itemType1Id'] = ret3[0]
    }
    if (realAreaId) {
      condition['areaId'] = realAreaId
    }
    console.log(condition, 'condition222')
    const ret = await ctx.model.Item.find({
        $or: [{
            itemType1Id: ret3[0] || /./
          },
          {
            areaId: realAreaId || /./
          }
        ]
      })
      .populate({ path: 'cinemaItem' })
      .populate({ path: 'cityItem' })
      .sort({ avgScore: -1 })

    this.success(ret)
  }

  findMaxItemTypeId(arr = []) {
    const map = {}
    const map1 = {}
    arr.forEach(item => {
      const { item_docs = [] } = item || {}
      const finalItem = item_docs[0] || {}
      const { itemType1Id, areaId } = finalItem || {}
      if (!map[itemType1Id]) {
        map[itemType1Id] = 1
      } else {
        map[itemType1Id] += 1
      }
      if (!map[areaId]) {
        map1[areaId] = 1
      } else {
        map1[areaId] += 1
      }
    })
    let max = 0
    let key = ''
    let max1 = 0
    let key1 = ''
    for (let m in map) {
      if (map[m] > max) {
        max = map[m]
        key = m
      }
    }
    for (let m in map1) {
      if (map[m] > max1) {
        max1 = map[m]
        key1 = m
      }
    }
    return [key]
  }

  async getAreaId(name) {
    console.log('name', name)
    const { ctx } = this
    const city = await ctx.model.City.aggregate([{
        // 用来展示特定字段
        $project: { _id: 1, value: 1 }
      },
      {
        $unwind: '$value'
      },
      {
        $match: {
          $or: [{
              'value.name': name + '市' //"郑州市",
            },
            {
              'value.province': name + '市' //"郑州市",
            }
          ]
        }
      },
      {
        $limit: 50
      }
    ])
    return city
  }
}

module.exports = ItemController