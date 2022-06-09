var mongoose = require("mongoose")
var Schema = mongoose.Schema

var event = new Schema({

    title: String,
    date: String,
    note: String

})
/*creates a Data object following the above schema*/
const Data = mongoose.model("data", event)

module.exports = Data