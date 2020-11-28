var express  = require('express') ,
app =express(),
bodyParser = require('body-parser')
port = process.env.PORT || 8000;
const nodemailer = require("nodemailer");
var router = express.Router();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  });
console.log(port)
app.listen(port, () => console.log(`Running on http://localhost:${port}/`));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', router);

router.post('/email', function (req, res) {
let reqBody =req.body
let url = ''
async function main() {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, 
    auth: {
      user: testAccount.user, 
      pass: testAccount.pass, 
    },
  });

  let info = await transporter.sendMail({
    from: '"Notchup" <developer@notchup.com>',
    to: reqBody.email , 
    subject: "NotchUp Trial Class Booked successfully",
    text: 'Dear '+ reqBody.p_name +', '+ reqBody.c_name+'\'s class at ' + reqBody.time + ' has been successfully booked'
    });
  url = nodemailer.getTestMessageUrl(info)
  res.send(url);
}
 main().catch(console.error) 


});
console.log('running on' + port)