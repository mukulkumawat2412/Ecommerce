import { ApiError } from "../utils/ApiError.js"

const authorizeRoles = (...allowedRoles)=>{

 return (req,_,next)=>{
    if(!req.user || !allowedRoles.includes(req.user.role)){
      throw new ApiError(400,"You don't have permission")
    }

    next()

  }

}

export default authorizeRoles
