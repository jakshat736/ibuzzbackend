const { json } = require('express');
var express = require('express');
const pool = require('./pool');
var router = express.Router();
const upload = require('./multer');
var WorkshopRegistration=require('./Schemas/WorkshopRegistrationSchema')

/* GET home page. */

router.post('/addworkshopregistration',upload.single() , async (req, res) => {
  console.log("sssssssssss",req.body)
  try {
    const workshopregistration = new WorkshopRegistration(req.body);
    await workshopregistration.save();
    const accountSid = 'ACe7cc75d227306a525e3ffc54ce170974';
    const authToken = '36be72a126a130bb84b85e420ba414c8';
    const client = require('twilio')(accountSid, authToken);
    
    client.messages.create({
      body: `Registeration For Workshop
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


router.get('/displayallworkshopregistrations', async (req, res) => {
   
    

  try {
    const workshopregistration = await WorkshopRegistration.find();
    return  res.status(200).json(workshopregistration)
  } catch (error) {
    console.log(error)
    return res.status(500).json({status:false})
  }
});



module.exports = router;