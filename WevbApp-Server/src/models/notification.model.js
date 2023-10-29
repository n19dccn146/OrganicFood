const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const { number } = require('joi');

const notificationSchema = mongoose.Schema(
    {
        product:{
            type : mongoose.Schema.Types.ObjectId,ref : 'Product'
        },
        image_url:{
            type: String
        },
        description:{
            type: String
        },
        status:{
            type: Boolean
        },
        type:{
            type: Boolean
        }
        // true : exp
        // false : quantity
    },
    {
        timestamps:true
    }
)

notificationSchema.plugin(toJSON);
const Notification = mongoose.model('notification', notificationSchema)
module.exports = Notification