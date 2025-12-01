import Contact from "../models/contact.model.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";


import { sendEmail } from "../utils/SendEmail.js";
import  nodemailer  from 'nodemailer';



const contactUs = asyncHandler(async (req, res) => {
  const { fullName, email, phone, subject, department, message,status } = req.body;

 const SubmittedContact =  await Contact.create({
    user: req.user?._id,
    fullName,
    email,
    phone,
    subject,
    department,
    message,
    status:status || "pending"
  });

  // Email body (HTML)
  const htmlMsg = `
    <h2>New Contact Form Submission</h2>
    <p><b>Name:</b> ${fullName}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Phone:</b> ${phone}</p>
    <p><b>Subject:</b> ${subject}</p>
    <p><b>Department:</b> ${department}</p>
    <p><b>Message:</b> ${message}</p>
  `;

  // ⭐⭐ FIX: Pass "to" email ⭐⭐
  await sendEmail({
    to: process.env.ADMIN_EMAIL,      
    subject: "New Contact Form Submitted",
    html: htmlMsg,
  });

  return res
    .status(201)
    .json(new ApiResponse(201,SubmittedContact,"Contact form submitted successfully"));
});




const AdminReplyMessage = asyncHandler(async(req,res)=>{

    
 const contact =   await Contact.findById(req.params.contactId)


 if(!contact){
    throw new ApiError(404,"Contact record not found")
 }


 const {message} = req.body


 contact.replyMessage = message
 contact.status = "Replied"


 await contact.save()

 await sendEmail({
  from:process.env.ADMIN_EMAIL,
  to: contact.email,
  subject: `Reply to your message: ${contact.subject || "Contact Form"}`,
  html: `
    <p>Hi ${contact.fullName},</p>
    <p>Admin has replied:</p>
    <blockquote>${message}</blockquote>
  `,
});


return res.status(200).json(new ApiResponse(200,contact,"Admin reply successfully!"))


}) 





const ContactUserDetails = asyncHandler(async(req,res)=>{

   const AllContactRecords =  await Contact.find({})

//    console.log(AllContactUser)

   if(!AllContactRecords){
    throw new ApiError(404,"Contact user not found")
   }


   return res.status(200).json(new ApiResponse(200,AllContactRecords,"All contact User successfully fetched"))

})



const deleteContactRecord = asyncHandler(async(req,res)=>{

const user =   await  User.findById(req.user?._id)


if(!user){
    throw new ApiError(401,"Unauthorized, please login")
}


const {cId} = req.params


const contact = await Contact.findById(cId)

console.log(contact)

if(!contact){
    throw new ApiError(404,"Contact Record not found")
}


const deletedContactRecord = await Contact.findByIdAndDelete(cId)

return res.status(200).json(new ApiResponse(200,deletedContactRecord,"Contact records successfully deleted"))




})


const GetContactRecordById = asyncHandler(async(req,res)=>{

    const {cId} = req.params


 const contactRecord =   await Contact.findById(cId)

 if(!contactRecord){
    throw new ApiError(404,"Contact record not found")
 }

 return res.status(200).json(new ApiResponse(200,contactRecord,"Contact record fetched successfully"))

})



const updateContactRecord = asyncHandler(async(req,res)=>{


const contact =  await  Contact.findById(req.params.cId)



if(!contact){
    throw new ApiError(404,"Contact record not found")
}


console.log(req.body)

const {fullName,email,phone,message,department,subject,status} = req.body

const contactRecordUpdated =  await Contact.findByIdAndUpdate(req.params.cId,{
    fullName,
    email,
    phone,
    message,
    department,
    subject,
    status
},{new:true})



return res.status(200).json(new ApiResponse(200,contactRecordUpdated,"Contact record successfully updated"))


})


const sendImageOnly = asyncHandler(async (req, res) => {
  const image = req.file;

  if (!image) {
    throw new ApiError(400, "Image is required");
  }

  console.log(image.mimetype)

  // Nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,  // smtp.gmail.com
    port: process.env.SMTP_PORT,  // 587
    secure: false,
    auth: {
      user: process.env.SMTP_USER,   // jis email par bhejna hai
      pass: process.env.SMTP_PASS      // Gmail app password
    }
  });

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.ADMIN_EMAIL,       // admin ko send
    subject: "New Image Received",
    html: `<h3>User ne ek image bheji hai:</h3>`,
    attachments: [
      {
        filename: image.originalname,  // sahi
        content: image.buffer,
        contentType:image.mimetype       // sahi
      }
    ]
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Image sent successfully to Admin"));
});









export {contactUs,ContactUserDetails,deleteContactRecord,
GetContactRecordById,updateContactRecord,AdminReplyMessage,sendImageOnly

}