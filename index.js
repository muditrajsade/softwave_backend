let x = require('express');
let app = x();
let bodyParser = require('body-parser');
let path = require('path');
const nodemailer = require('nodemailer');
let cors = require('cors');

app.use(
    cors({
        origin: '*',
    })
);
app.use(x.json());

app.use(bodyParser.urlencoded({ extended: true }));


const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email provider (e.g., Gmail, Outlook)
    auth: {
      user: 'softwavesolutions135@gmail.com', // Replace with your email
      pass: 'lnmf pmke kaxk hjqh', // Replace with your email password or app password
    },
  });
//testing
app.get('/',function(req,res){

    res.sendFile(path.join(__dirname, '/index.html'));

})

app.post('/send_message',async function(req,res){

    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let message = req.body.message;

    try{
        const mailOptions = {
            from: 'softwavesolutions135@gmail.com', // The email address from the frontend
            to: 'softwavesolutions135@gmail.com', // The recipient's email
            subject: 'New Message from Contact Form',
            text: `You have a new message:
            
            First Name: ${firstname}
            Last Name: ${lastname}
            Email: ${email}
            
            Message:
            ${message}`,
          };

        await transporter.sendMail(mailOptions);

    // Respond with success
        res.status(200).json({ success: true, message: 'Email sent successfully!' });
    }
    catch(error){
        console.log(error);
    }
    





});





app.listen(8000, () => {
    console.log('Server is running on port 8000');
});