require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const { connect } = require('./db');
const router = require('./Routes/index');
const LoginHistory = require('./Model/loginHistory.js');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello This is My backend');
});

app.use('/api', router);
connect();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  }
});

function sendOtpEmail(email, otp) {
  const mailOptions = { 
    from: process.env.EMAIL,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

let otpStore = {};

function storeOtp(email, otp) {
  otpStore[email] = otp;
  setTimeout(() => {
    delete otpStore[email];
  }, 300000); 
}

app.use((req, res, next) => {
  req.ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  next();
});

app.post('/api/store-login-info', async (req, res) => {
  try {
    const { email, browser, os, deviceType } = req.body;
    const ipAddress = req.ipAddress;

    const loginHistory = new LoginHistory({
      email,
      browser,
      os,
      deviceType,
      ipAddress
    });

    await loginHistory.save();
    res.status(200).send({ success: true });
  } catch (error) {
    console.error('Error storing login info:', error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
});

app.get('/api/login-history/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const loginHistory = await LoginHistory.find({ email }).sort({ loginTime: -1 }); // Fetch login history and sort by loginTime
    res.status(200).json(loginHistory);
  } catch (error) {
    console.error('Error fetching login history:', error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
});

app.post('/send-otp', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send({ success: false, message: 'Email is required' });
  }

  const otp = generateOtp();
  sendOtpEmail(email, otp);
  storeOtp(email, otp);
  res.send({ success: true });
});

app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).send({ success: false, message: 'Email and OTP are required' });
  }

  if (otpStore[email] === otp) {
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
