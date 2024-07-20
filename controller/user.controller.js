import { request, response } from "express";
import User from "../model/user.model.js";
import { validationResult } from "express-validator";

export const signIn = async (request,response,next)=>{
    try{
       let {email,password} = request.body;
       let result = await User.findOne(email,password);
       return result.length ? response.status(200).json({message: "sign in success", user: result[0]}) : response.status(401).json({error: "Bad request"});
    }
    catch(err){
        return response.status(500).json({error: "Internal Server Error"});
    }
}

export const saveUser = (request,response,next)=>{
   const errors = validationResult(request);
   if(!errors.isEmpty())
    return response.status(401).json({error: "Bad request", errorMessage: errors.array()});

   let {username,email,password} = request.body;//{username:'',email:'',password} 
   // Save user into database 
   let user = new User(null,username,email,password);
   user.create()
   .then(result=>{
    return response.status(201).json({message: "user created successfully"});
   }).catch(err=>{
    console.log(err);
    return response.status(500).json({error: "Internal Server Error"});
   });
}
//====================================================
//localhost://3000/user/Upadte
export const Update = (request,response,next)=>{
    // Upadte the  user record  into database
    let {id} = request.params; 
    let {username,email,password} = request.body;//{'id' 'username':'',email:'',password} 
    User.Update(id,username,email,password)
    .then(result=>{
     return response.status(201).json({message: "user record Updated successfully"});
    }).catch(err=>{
     console.log(err);
     return response.status(500).json({error: "Internal Server Error"});
    });
 }
//======================================================
 //localhost://3000/user/Delete
 //Delete the user record
 export const Delete = (request,response,next)=>{
//   let {id}= request.body //{id}

  User.Delete(request.params.id).then(result=>{
  return response.status(201).json({message: "user record deleted successefully"});
  }).catch((err)=>{
   return response.status(500).json({error:"Internal Sever Error"});
  });
 }