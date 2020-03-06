module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const ChatSchema = new Schema({
    from: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    },
    chat_id: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    isRead: {
      type: Boolean,
      default: false
    },
    createTime: {
      type: Date,
      default: Date.now()
    },
  })

  return mongoose.model("Chat", ChatSchema)
}