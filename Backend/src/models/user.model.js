import mongoose,{Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema  =  new Schema({

    username:{
        type:String,
        required:true,

    },


    email:{
        type:String,
        required:true,
        unique:true
    },


    password:{
        type:String,
        required:true,
        
    },


    fullName:{
        type:String,
        required:true
    },


    refreshToken:{
        type:String
    },


    refreshTokenExpiry: {
  type: Date
},

    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    }


   

},{timestamps:true})



userSchema.methods.generateAccessToken = function(){
   return jwt.sign({
        _id:this._id,
        username:this.username,
        email:this.email,
        role:this.role
    },process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY}

)
}


userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id:this._id
    },process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
)
}



userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
        this.password = await bcrypt.hash(this.password,10)
    next()


})


userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password,this.password)

}






const User = mongoose.model("User",userSchema)


export default User
