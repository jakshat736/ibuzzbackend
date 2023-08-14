const { json } = require('express');
var express = require('express');
const pool = require('./pool');
var router = express.Router();
const upload = require('./multer');
var Registration=require('./Schemas/RegistrationSchema')

/* GET home page. */

router.post('/addregistration',upload.single() , async (req, res) => {
  console.log("sssssssssss",req.body)
  try {
    const registration = new Registration(req.body);
    await registration.save();
    const accountSid = 'ACe7cc75d227306a525e3ffc54ce170974';
    const authToken = '3c6404fa65defec35a2b9c9c7d88e3c9';
    const client = require('twilio')(accountSid, authToken);
    
    client.messages.create({
      body: `Registeration For Course
      Name:${req.body.name},
      email id:${req.body.email},
      Phone Number:${req.body.number}`,
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


router.get('/displayallregistrations', async (req, res) => {
   
    

  try {
    const registration = await Registration.find();
    return  res.status(200).json(registration)
  } catch (error) {
    console.log(error)
    return res.status(500).json({status:false})
  }
});



module.exports = router;
