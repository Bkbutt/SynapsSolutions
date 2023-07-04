const express= require('express')

const User= require('../models/userModel');
const nodemailer = require('nodemailer')
exports.connectSynaps = async(req,res)=>{

   try{
    const {name,email,servicesWant,message}= req.body;

    const client =   new User({name,email,servicesWant,message})
     await client.save();
     let replacements= client;
     const transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:456,
        secure:true,
        auth:{
            user:'',
            pass:''
        } })
        readHTMLFile('./htmlTemplate/email.html', function(err,html){
            var template = Handlebars.compile(html);
            const htmlToSend= template(replacements);

            var mailOptions= {
                from:'Client of Synaps',
                to:"email",
                subject:"Customer Message",
                html:htmlToSend
            }
        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                console.log(error)
            }else{
                console.log("email came" + info.message)
                return res.status(400).json({error:error})
            }
        })
        })
    }catch(error){
        console.log(error)
        return res.status(400).json({msg:"error in try block"})
    }


}
 
var readHTMLFile= function(path,callback){
    fs.readFile(path,{encoding:"utf-8"},(err,html)=>{
        if (err){
            throw err;
            callback(err)
        }else{
            callback(null,html)
        }
    })
}







exports.getClientData=async(req,res)=>{
  
}