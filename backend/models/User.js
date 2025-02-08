const mongoose = require('mongoose')

const baraiUserSchema = new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,default:null},
    ethnicGroup:{type: String, default:null},
    community:{type: String, default:null},
    clan:{type: String, default:null},
    subgroup:{type: String, default:null},
    countryoFOrigin:{type:String,default:null},
    liveInCountry:{type:String,default:null},
    city:{type:String,default:null},
    profileImage:{type:String,default:null},
    followers:[{type: mongoose.Schema.Types.ObjectId, ref: 'BaraiUser'}],
    following:[{type: mongoose.Schema.Types.ObjectId, ref: 'BaraiUser'}],
    friends:[{type: mongoose.Schema.Types.ObjectId, ref: 'BaraiUser'}],
    friendsCount:{type:Number, default:0},
    followerCount:{type:Number,default:0},
    followingCount:{type:Number,default:0},
   
},{timestamps:true})

const BaraiUser = mongoose.model('BaraiUser', baraiUserSchema)

module.exports = BaraiUser;

