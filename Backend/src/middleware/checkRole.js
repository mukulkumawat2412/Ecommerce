import { ApiError } from "../utils/ApiError.js"

const authorizeRoles = (...allowedRoles)=>{
  console.log(allowedRoles)
  
// const allowedRoles = ["user","admin"]

 return (req,_,next)=>{
    if(!req.user && !allowedRoles.includes(req.user.role)){
      throw new ApiError(400,"You don't have permission")
    }


    // const user = {
    //   _id:723897237243jsdkfj3,
    //   name:"amit",
    //   email:"amit@gmail.com",
    //   role:"user"
    // }
   

   
   

    next()

  }

  

}



export default authorizeRoles
