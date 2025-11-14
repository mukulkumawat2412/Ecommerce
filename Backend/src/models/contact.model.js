import mongoose,{Schema} from "mongoose"


const contactSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    fullName:{
        type:String,
        required:true,
        trim:true
    },


    email:{
        type:String,
        required:true,
        trim:true
    },

    phone:{
        type:Number,
        required:true,
        trim:true
    },

   status: {
    type: String,
    enum: ["Pending", "Replied", "Spam"],
    default: "Pending"
},


replyMessage:{
    type:String,
    default:""

},



    subject:{
        type:String,
        required:true,
        trim:true
    },


    department:{
        type:String,
        required:true,
        enum:["support","Sales","Partnership","Media & PR"],
        default:"support"
    },


    message:{
        type:String,
        required:true,
        trim:true
    }
},{timestamps:true})


const Contact = mongoose.model("Contact",contactSchema)


export default Contact