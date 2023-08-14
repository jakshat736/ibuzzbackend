var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors')
var axios = require('axios');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var superadminRouter = require('./routes/superadmin');
var enquiriesRouter = require('./routes/enquiries');
var registrationRouter = require('./routes/registration');
var workshopRegistrationRouter = require('./routes/workshopregistration');
var adminRouter= require('./routes/admin');
var DB= require('./routes/pool')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
const crypto = require('crypto');
const upload = require('./routes/multer');


app.post('/api/proxy',upload.single(''), (req, res) => {

  const encodedData = btoa(JSON.stringify(req.body));
  const body1={"request":encodedData}
  console.log(encodedData)
  const hash = crypto.createHash('sha256').update(encodedData+'/pg/v1/paye459eaa1-388c-4721-815a-0e0a401605bd').digest('hex');
  const sha=hash+"###1"
  console.log(typeof(sha))

  const apiUrl = 'https://api.phonepe.com/apis/hermes/pg/v1/pay';
  const headers = {
    'Content-Type': 'application/json',
    'X-Verify': sha,
  };

  const requestBody = body1;

  // Make the API call
  axios.post(apiUrl, requestBody, { headers })
    .then(response => {
      // Return the API response back to the frontend
      console.log('succes',response.data.data)
      return res.status(200).json(response.data);
    })
    .catch(error => {
      // Handle the error
     
      res.status(500).json({ error: 'An error occurred' });
    });
});
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/adminlogin', superadminRouter);
app.use('/enquiries', enquiriesRouter);
app.use('/registration',registrationRouter);
app.use('/admin',adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
