const { json } = require('express');
var express = require('express');
const upload = require('./multer');
const pool = require('./pool');
var router = express.Router();
var Enquiries=require('./Schemas/enquiriesSchema')

/* GET home page. */

  router.post('/addenquiry',upload.single() , async (req, res) => {
    console.log("sssssssssss",req.body)
    try {
      const enquiry = new Enquiries(req.body);
      await enquiry.save();
      const accountSid = 'ACe7cc75d227306a525e3ffc54ce170974';
  const authToken = '3c6404fa65defec35a2b9c9c7d88e3c9';
  const client = require('twilio')(accountSid, authToken);
  
  client.messages.create({
    body: `Enquiry From Website
    Name:${req.body.name},
    Company Name:${req.body.companyName},
    email id:${req.body.email},
    Phone Number:${req.body.number},
    Service Wanted:${req.body.service}`,
          from: 'whatsapp:+14155238886',
          to: 'whatsapp:+918889430333'
      }).then(message => console.log(message.sid)).catch((error)=>{
        console.log(error)
      })
      return  res.status(200).json({status:true})
    } 
    catch (error) {
        console.log(error)
        return res.status(500).json({status:false})
      
    }
  });
  
  
  
  router.get('/displayallenquiries', async (req, res) => {
   
    

    try {
      const enquiries = await Enquiries.find();
      return  res.status(200).json(enquiries)
    } catch (error) {
      console.log(error)
      return res.status(500).json({status:false})
    }
  });

 
module.exports = router;
