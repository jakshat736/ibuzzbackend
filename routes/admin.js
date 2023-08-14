const express = require('express');
const router = express.Router();
const pool = require('./pool')
const Admin = require('./Schemas/adminSchema');

/* GET home page. */
// async function insertAdmin(adminId, adminPassword) {
  //   try {
    //   const admin = new Admin({ adminId, adminPassword });
    //   await admin.save();
    //   console.log('Admin credentials inserted successfully');
    // } catch (error) {
 //           console.error(error);
   //  }
  // }
  
   // Call insertAdmin function with desired credentials
  // const adminId = 'ibuzz123@gmail.com';
  // const adminPassword = 'Ibuzz9999';
  // insertAdmin(adminId, adminPassword);
router.post('/check_admin_login',async function(req, res, next) {
    const { adminId, adminPassword } = req.body;
    console.log(adminId,adminPassword)
    try {
      const admin = await Admin.findOne({ adminId });
         console.log(admin)
      if (admin && admin.adminPassword === adminPassword) {
        console.log('Admin credentials verified successfully');
        return res.json({ status: true });
      } else {
        console.log('Incorrect admin credentials');
        res.status(401).json({ error: 'Incorrect admin credentials' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
