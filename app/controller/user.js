/*
 * @Description:
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-10 14:46:24
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-11 10:09:59
 */
const BaseController = require('./base')
  // 故名思意 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write
  // 管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole')
const fs = require('fs')
const path = require('path')
const md5 = require('md5')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

class UserController extends BaseController {
  async index() {
    const { ctx } = this
    const user = await ctx.service.user.find()
    ctx.body = user
  }

  // 登录
  async login() {
    const { ctx, app } = this
    const { email, password } = ctx.request.body

    // 查询下用户是否存在
    const user = await ctx.model.User.findOne({
      email,
      password: md5(`${password}${app.config.md5.salt}`)
    })

    console.log(`password: ${password}`)
    if (user) {
      // 生成token 返回
      const { email, _id } = user
      const token = app.jwt.sign({
          email,
          id: user._id
        },
        app.config.jwt.secret, {
          expiresIn: '1d'
        }
      )
      this.success({ token, email, _id })
    } else {
      this.error('用户名或密码错误')
    }
  }

  // 发送邮件
  async email() {
    const { ctx } = this
    const email = ctx.query.email
    const code = Math.random()
      .toString()
      .slice(2, 6)
    console.log(`发送验证码, 邮箱为：${email}验证码为：${code}`)
    const title = '大觅验证码'
    const html = `
      <h1>大觅验证码</h1>
      <div>
        <a href="https://www.baidu.com">${code}</a>
      </div>
    `
    const hasSend = await ctx.service.tools.sendEmail(email, title, html)
    if (hasSend) {
      ctx.session.emailCode = code
      this.message('发送成功')
    } else {
      this.error('发送失败')
    }
  }

  // 注册
  async register() {
    const { ctx, app } = this
    const { email, password, emailCode } = ctx.request.body
      // 是否已经注册过
    const repeatUser = await ctx.service.user.findUser(email)
    if (repeatUser) {
      this.error('此手机号已经被注册')
      return
    }
    /* if (emailCode !== ctx.session.emailCode) {
      return this.error("邮箱验证码不正确")
    } */
    // 创建新用户
    const user = await ctx.service.user.create({
      email,
      password: md5(`${password}${app.config.md5.salt}`)
    })
    if (user) {
      this.message('注册成功')
    } else {
      this.error('服务器错误，请稍后重试')
    }
  }

  async detail() {
    const { ctx } = this
    const ret = await ctx.model.User.find({ _id: ctx.state.user.id }, { ticketBuyerList: 0, orderList: 0 })
    if (ret) {
      this.success(ret)
    } else {
      this.error('服务器错误，请刷新重试')
    }
  }

  async getUserInfo() {
    const { ctx } = this
    const ret = ctx.state.user
    if (ret) {
      this.success(ret)
    } else {
      this.error('token无效', 666)
    }
  }

  async updateAvatar() {
    const file = this.ctx.request.files[0]
    const stream = fs.createReadStream(file.filepath)

    // 定义文件名
    let index = file.filename.indexOf('.')
    index > -1 ? index : (index = 0)
    const filename =
      Date.now() +
      file.filename.substring(0, index) +
      '' +
      path.extname(file.filename).toLocaleLowerCase()
      // 目标文件
    let target = path.join(__dirname, '../public/upload')
      // 不存在文件夹
    try {
      if (!fs.existsSync(target)) {
        fs.mkdir(target)
      }
    } catch (error) {
      this.error(error.message)
    }
    // 自动加 '/'的
    target = path.join(target, filename)
      // 会覆盖的
    if (fs.existsSync(target)) {
      // console.log("true")
    }
    const writeStream = fs.createWriteStream(target)
    try {
      // 异步把文件流 写入
      await awaitWriteStream(stream.pipe(writeStream))
      const id = this.ctx.state.user.id
      const url = `/public/upload/${filename}`
      const ret = await this.ctx.model.User.update({ _id: id }, { avatarUrl: url })
      if (ret) {
        this.success({ url })
      }
    } catch (err) {
      // 如果出现错误，关闭管道
      await sendToWormhole(stream)
        // 自定义方法
      this.error(err.message)
    }
    // 自定义方法
  }

  async updateUserDetail() {
    const { ctx } = this
    const update = ctx.request.body
      // console.log("update", update)
    const id = ctx.state.user.id
    const ret = await ctx.model.User.update({ _id: id }, update)
    if (ret) {
      this.message('修改成功')
    }
  }

  async getTicketBuyerList() {
    const { ctx } = this
    const id = ctx.state.user.id
    const ret = await ctx.model.User.find({ _id: id }, { ticketBuyerList: 1 })
    if (ret) {
      this.success(ret)
    }
    // const ticketbuyerList = [{
    //   "linkId": "640000201309145591",
    //   "name": "曹超",
    //   "cardId": "372892303849230398",
    //   "cardType": "0"
    // }, {
    //   "linkId": "370000200003154874",
    //   "name": "沈明",
    //   "cardId": "372892303849230398",
    //   "cardType": "0"
    // }, {
    //   "linkId": "23000020001004447X",
    //   "name": "范磊",
    //   "cardId": "372892303849230398",
    //   "cardType": "0"
    // }]
    // const ret = await ctx.model.User.update({}, { ticketBuyerList: ticketbuyerList })
  }

  async addTicketBuyer() {
    const { ctx } = this
    const id = ctx.state.user.id
    const body = ctx.request.body
    console.log('body', body)
    const ret = await ctx.model.User.update({ _id: id }, {
      $push: {
        ticketBuyerList: body
      }
    })
    this.message('添加成功')
  }

  async deleteTicketBuyer() {
    const { ctx } = this
    const id = ctx.state.user.id
    const queryId = ctx.query.id
    console.log('id', id)
    console.log('queryId', queryId)
    const ret = await ctx.model.User.update({ _id: id }, {
      $pull: {
        ticketBuyerList: {
          _id: queryId
        }
      }
    })
    this.message('删除成功')
  }

  async getOrderList() {
    const { ctx } = this
    const id = ctx.state.user.id
    const email = ctx.state.user.email
    const { itemName = '', _id = '', sellTime = '', orderType = '' } = ctx.query
    console.log({ itemName, sellTime, _id, orderType })
    const now = new Date()
    const conditions = [{
        // $regexMatch: { input: "$itemName", regex: new RegExp(itemName) }
        // itemName: itemName ? { $regex: new RegExp(itemName) } : { $regex: /./ },
        'orderList.itemName': { $regex: new RegExp(itemName) }
      },
      {
        // sellTime: { $gte: new Date(sellTime), $lte: now },
        'orderList.sellTime': { $gte: new Date(sellTime), $lte: now }
      },
      {
        // orderType: orderType,
        'orderList.orderType': Number(orderType)
      },
      {}
    ]

    function handleOrderType(orderType) {
      return orderType ? 2 : 3
    }

    function handleSellTime(sellTime) {
      return sellTime ? 1 : 3
    }

    function handleItemName(itemName) {
      return itemName ? 0 : 3
    }

    conditions[3] = {
        ...conditions[handleItemName(itemName)],
        ...conditions[handleSellTime(sellTime)],
        ...conditions[handleOrderType(orderType)]
      }
      // if (itemName && sellTime && orderType) {
      //   conditions[3] = {...conditions[0], ...conditions[1], ...conditions[2] }
      // } else if (itemName && !sellTime && orderType) {
      //   conditions[3] = {...conditions[0], ...conditions[2] }
      // } else if (itemName && sellTime && !orderType) {
      //   conditions[3] = {...conditions[0], ...conditions[1] }
      // } else if (itemName && !sellTime && !orderType) {
      //   conditions[3] = {...conditions[0] }
      // } else if (!itemName && sellTime && orderType) {
      //   conditions[3] = {...conditions[1], ...conditions[2] }
      // } else if (!itemName && !sellTime && orderType) {
      //   conditions[3] = {...conditions[2] }
      // } else if (!itemName && !sellTime && !orderType) {
      //   conditions[3] = {}
      // } else if (!itemName && sellTime && !orderType) {
      //   conditions[3] = {...conditions[1] }
      // }
    console.log('conditions[3]', conditions[3])
    const ret = await ctx.model.User.aggregate([{
        $project: { orderList: 1, _id: 1 }
      },
      {
        $unwind: '$orderList'
      },
      {
        $match: {
          _id: ObjectId(id),
          // "orderList.itemName": {
          //   $regex: /好/
          // }
          ...conditions[3]
        }
      },
      {
        $lookup: {
          from: "items",
          let: { orderListId: "$orderList.itemId" },
          pipeline: [{
            $project: {
              itemName: 1
            }
          }, {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$_id", "$$orderListId"] }
                ]
              }
            }
          }, ],
          // localField: "orderList.itemId",
          // foreignField: "_id",
          as: "item_docs"
        }
      },
      {
        $lookup: {
          from: "invoices",
          let: { invoiceId: "$orderList.invoiceId" },
          pipeline: [{
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$_id", "$$invoiceId"] },
                ]
              }
            }
          }, ],
          // localField: "orderList.itemId",
          // foreignField: "_id",
          as: "invoice_docs"
        }
      },
      {
        $lookup: {
          from: "cinemas",
          let: { cinemaId: "$orderList.cinemaId" },
          pipeline: [{
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$cinemaId", "$$cinemaId"] },
                ]
              }
            }
          }, ],
          // localField: "orderList.itemId",
          // foreignField: "_id",
          as: "cinema_docs"
        }
      }
    ])
    console.log('email', email)
      // const ret = await ctx.model.User.aggregate([{
      //   $unwind: "$orderList"
      // }, {
      //   $match: { "_id": { $in: [_id] } }
      // }])
    if (ret) {
      this.success(ret)
    }
  }

  // const orders = [{
  //   "sellTime": "1978-09-02",
  //   "itemName": "角片好军属与相能知月候持况约面装走制低调。",
  //   "num": 4,
  //   "itemType1Id": "5e4375b24ab4712c5025b9b6",
  //   "itemType2Id": "5e44b4e34e73ce2b8064287e",
  //   "unitPrice": 196,
  //   "totalAmount": 603,
  //   "orderType": "2",
  //   "operate": ""
  // }, {
  //   "sellTime": "1998-06-14",
  //   "itemName": "小长来小农过热委三米精别再东边往厂强引许。",
  //   "num": 3,
  //   "itemType1Id": "5e4375b24ab4712c5025b9ad",
  //   "itemType2Id": "5e4375b24ab4712c5025b9af",
  //   "unitPrice": 120,
  //   "totalAmount": 822,
  //   "orderType": "2",
  //   "operate": ""
  // }, {
  //   "sellTime": "2009-07-28",
  //   "itemName": "很身效都据参这层最示记两拉体打速影路该决。",
  //   "num": 4,
  //   "itemType1Id": "5e4375b24ab4712c5025b9d8",
  //   "itemType2Id": "5e4375b24ab4712c5025b9da",
  //   "unitPrice": 141,
  //   "totalAmount": 730,
  //   "orderType": "0",
  //   "operate": ""
  // }]
  // const ret = await ctx.model.User.update({}, { orderList: orders })

  async updateOrderList() {}

  async postItemComment() {
    const { ctx } = this
    const body = ctx.request.body
      // itemId
    const itemId = body.id
    const id = ctx.state.user.id
    delete body.id
    body.createdTime = new Date()
    body.userId = id
    const imgUrl = await ctx.model.User.find({ _id: id }, { avatarUrl: 1 })
    body.imgUrl = imgUrl[0].avatarUrl
    console.log('body.imgUrl', body.imgUrl)
    console.log('body', body)
    const ret = await ctx.model.Item.update({ _id: itemId }, {
      $push: {
        comments: body
      }
    })
    if (ret.nModified === 1) {
      this.message('评论成功')
    }
  }

  async postUserOrder() {
    const { ctx } = this
    const {
      companyName,
      taxNumber,
      invoiceType,
      isNeedInvoice,
      cinemaId,
      isNeedInsurance,
      linkIds,
      seatData,
      itemId,
      itemName
    } = ctx.request.body
      // 查询座位是否已经售出
    const seatId = seatData.map(({ id }) => id)
    const seatRet = await ctx.model.Seat.aggregate([{
        $unwind: '$selectedSeatArray'
      },
      {
        $match: {
          id: itemId,
          $and: [{
              'selectedSeatArray.id': {
                $in: seatId
              }
            },
            {
              'selectedSeatArray.status': 1
            }
          ]
        }
      }
    ])
    console.log('seatRet', seatRet)
    if (seatRet.length > 0) {
      return this.errorData('你选取的座位已被人选取', 888, seatData)
    }
    let invoiceRet = null
      // 判断是否需要发票
    if (Number(isNeedInvoice) === 1) {
      invoiceRet = await ctx.service.invoice.createInvoice({
        companyName,
        taxNumber,
        invoiceType
      })
      console.log('invoice ret', invoiceRet)
    }
    const id = ctx.state.user.id
    const totalAmount = seatData.reduce((accumulator, cur) => {
        return accumulator + cur.price
      }, 0)
      // 查找itemType1Id itemType2Id
    const item = await ctx.model.Item.find({ _id: itemId }, { itemType1Id: 1, itemType2Id: 1 })
    console.log('item', item)
    const ret = await ctx.model.User.update({ _id: id }, {
      $push: {
        orderList: {
          itemId,
          isNeedInsurance,
          insuranceAmount: Number(isNeedInsurance) === 1 ? 20 * seatData.length : 0,
          seatData,
          cinemaId,
          linkIds,
          totalAmount,
          number: seatData.length,
          itemName,
          itemType1Id: item[0].itemType1Id,
          itemType2Id: item[0].itemType2Id,
          isNeedInvoice: Number(isNeedInvoice),
          invoiceId: Number(isNeedInvoice) === 1 ? invoiceRet._id : ObjectId('5e5768ba7856393eccf1435a')
        }
      }
    })
    if (ret.nModified === 1) {
      // 将记录添加进数组集合
      const seatRet = await ctx.model.Seat.update({ id: itemId }, {
          $push: {
            selectedSeatArray: seatData
          }
        })
        // 查询出新插入的id
      if (seatRet.nModified === 1) {
        const ret = await ctx.model.User.aggregate([{
            $project: {
              orderList: 1,
              _id: 1
            }
          },
          {
            $unwind: "$orderList"
          },
          {
            $match: {
              _id: ObjectId(id)
            }
          },
          {
            $sort: {
              "orderList._id": -1
            }
          },
          {
            $limit: 1
          }
        ])
        this.success(ret)
      } else {
        return this.error("服务器错误,请刷新重试")
      }
    } else {
      return this.error("服务器错误,请刷新重试")
    }
  }

  async getOrder() {
    const { ctx } = this
    const id = ctx.state.user.id
    const orderId = ctx.params.orderId
    const ret = await ctx.model.User.aggregate([{
        $project: {
          _id: 1,
          orderList: 1,
        }
      },
      {
        $unwind: "$orderList"
      },
      {
        $match: {
          _id: ObjectId(id),
          "orderList._id": ObjectId(orderId)
        }
      },
      {
        $lookup: {
          from: "items",
          let: { orderList: "$orderList.itemId" },
          pipeline: [{
            $project: {
              itemName: 1
            }
          }, {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$_id", "$$orderList"] },
                ]
              }
            }
          }, ],
          // localField: "orderList.itemId",
          // foreignField: "_id",
          as: "item_docs"
        }
      },
      {
        $lookup: {
          from: "cinemas",
          let: { orderList: "$orderList.cinemaId" },
          pipeline: [{
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$cinemaId", "$$orderList"] },
                ]
              }
            }
          }, ],
          // localField: "orderList.itemId",
          // foreignField: "_id",
          as: "cinema_docs"
        }
      },
    ])
    if (ret && ret.length > 0) {
      this.success(ret)
    } else if (ret && ret.length <= 0) {
      this.error("订单号不存在", 777)
    } else {
      this.error("服务器错误,请稍后重试")
    }
  }
}

module.exports = UserController