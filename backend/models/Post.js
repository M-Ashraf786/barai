const mongoose = require('mongoose');

const baraiPostSchema = new mongoose.Schema({
    postOwner:{type:mongoose.Schema.Types.ObjectId, ref:'BaraiUser',required: true},
    mediaUrl:{type:String},
    mediaType:{type:String , enum:['image','video']},
    content:{type:String},
    likingPersons:[{type:mongoose.Schema.Types.ObjectId,ref:'BaraiUser'}],
    likesCount:{type:Number,default:0},
    dislikingPersons:[{type:mongoose.Schema.Types.ObjectId,ref:'BaraiUser'}],
    dislikesCount:{type:Number,default:0},
    comments:[
        {
            commenter:{type:mongoose.Schema.Types.ObjectId,ref:'BaraiUser'},
            comment:{type:String, required: true},
            createdAt:{type: Date, default:Date.now()},
        }
    ],
    commentsCount:{type:Number, default:0}
   
},{timestamps:true})

const BaraiPost = mongoose.model('BaraiPost', baraiPostSchema)
module.exports = BaraiPost;
