const mongoose = require('mongoose')

const PlayListSchema = new mongoose.Schema({
    email: String,
    movies: [Number]
    
})

const PlayListModel = mongoose.model("playList",PlayListSchema)
module.exports = PlayListModel