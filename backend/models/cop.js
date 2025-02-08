const mongoose = require('mongoose')

const baraiUserSchema = new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,default:null},
    gender:{type:String,default:null},
    dateOfBirth:{type:Date,default:null},
    profileImage:{type:String,default:null},
    coverPhoto:{type:String,default:null},
    followers:[{type: mongoose.Schema.Types.ObjectId, ref: 'BaraiUser'}],
    following:[{type: mongoose.Schema.Types.ObjectId, ref: 'BaraiUser'}],
    friends:[{type: mongoose.Schema.Types.ObjectId, ref: 'BaraiUser'}],
    friendsCount:{type:Number, default:0},
    followerCount:{type:Number,default:0},
    followingCount:{type:Number,default:0},
    caste:{type: String, default:null},
    subgroup:{type: String, default:null},
    country:{type:String,default:null},
    city:{type:String,default:null},
    bio:{type: mongoose.Schema.Types.ObjectId, ref: 'Biodata'}
},{timestamps:true})

const BaraiUser = mongoose.model('BaraiUser', baraiUserSchema)

module.exports = BaraiUser;