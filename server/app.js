const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
const dbService = require('./dbService');
let corsOptions = {
    origin: 'trustedwebsite.com' // Compliant
  };
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
const bodyParser = require('body-parser');
const fs = require('fs');
var http= require("http");
var url =require("url");
const nodemailer = require('nodemailer');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const session =require('express-session')
const Two_Hours= 1000*60*60*2
app.use(express.static(path.join(__dirname,'../views')));
app.set("view engine", "ejs");
app.engine('html', require('ejs').renderFile);
app.set("views", path.join(__dirname,'../views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.disable('x-powered-by');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const{
    PORT=5000,
    SESS_SECRET='secret',
    SESS_LIFETIME=Two_Hours,
    SESS_NAME='sid',
    NODE_ENV = 'development'
} = process.env
const IN_PROD = NODE_ENV === 'production'
app.use(session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie:{
        maxAge:SESS_LIFETIME,
        sameSite: true,
        secure: IN_PROD

    }
}))
app.use(express.static(path.join(__dirname, 'public')));
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Path
app.get('/',(req,res) => {
    res.render(path.join(__dirname,'../views/home.html'));
});
app.get('/admin',(req,res) => {

    res.render(path.join(__dirname,'../views/admin.html'));
});
app.get('/faculty',(req,res) => {
    res.render(path.join(__dirname,'../views/faculty.html'));
});
app.get('/student',(req,res) => {
    res.render(path.join(__dirname,'../views/student.html'));
});
app.get('/about',(req,res) => {
    res.render(path.join(__dirname,'../views/about.html'));
});
app.get('/less',(req,res) => {
    res.render(path.join(__dirname,'../views/attendless.html'));
});
app.get('/faq',(req,res) => {
    res.render(path.join(__dirname,'../views/faq.html'));
});
app.get('/Checksemattendence',(req,res) => {
    res.render(path.join(__dirname,'../views/checksem.html'));
});
app.get('/Checkless',(req,res) => {
    res.render(path.join(__dirname,'../views/checkless.html'));
});
app.get('/view',(req,res) => {
    res.render(path.join(__dirname,'../views/viewattendence.html'));
});
app.get('/facultydashboard',(request,response) => {
    console.log(request.session.userId)
    if(typeof(request.session.userId)==="undefined"){
        response.redirect('/')
        console.log('hi')
    }
    else{
    response.render(path.join(__dirname,'../views/facultydash.html'));
    }
});
app.get('/gotofacultydashboard',(request,response) => {
    console.log('yes')
    if(typeof(request.session.userId)==="undefined"){
        response.redirect('/')
        console.log('hi')
    }
    else{
    response.redirect('/facultydashboard');
    }
});
app.get('/changepassword',(request,response) => {
    console.log('no')
    if(typeof(request.session.userId)==="undefined"){
        response.redirect('/')
        console.log('hi')
    }
    else{
    response.render(path.join(__dirname,'../views/password.html'));
    }
});
app.get('/checkattendence',(request,response) => {
    console.log('no')
    if(typeof(request.session.userId)==="undefined"){
        response.redirect('/')
        console.log('hi')
    }
    else{
    response.render(path.join(__dirname,'../views/checkstudent_attendence.html'));
    }
});
app.get('/takeattendence',(request,response) => {
    console.log('no')
    if(typeof(request.session.userId)==="undefined"){
        response.redirect('/')
        console.log('hi')
    }
    else{
    response.render(path.join(__dirname,'../views/takeattendence.html'));
    }
});
app.get('/admindash',(request,response) => {
    console.log('no')
    if(typeof(request.session.userId)==="undefined"){
        response.redirect('/')
        console.log('hi')
    }
    else{
    response.render(path.join(__dirname,'../views/admindashboard.html'));
    }

});
app.get('/studentdash',(request,response) => {
    console.log('no')
    if(typeof(request.session.userId)==="undefined"){
        response.redirect('/')
        console.log('hi')
    }
    else{
    response.render(path.join(__dirname,'../views/studentdash.html'));
    }
});
app.get('/factosubject',(request,response) => {
    console.log('no')
    if(typeof(request.session.userId)==="undefined"){
        response.redirect('/')
        console.log('hi')
    }
    else{
    response.render(path.join(__dirname,'../views/faculty_enroll.html'));
    }
});
app.get('/forgot',(request,response) => {
    console.log('no')
    if(typeof(request.session.userId)==="undefined"){
        response.redirect('/')
        console.log('hi')
    }
    else{
    response.render(path.join(__dirname,'../views/forgot.html'));
    }
});
app.get('/logout',(request,response) => {
    console.log('no')
    if(typeof(request.session.userId)==="undefined"){
        response.redirect('/')
        console.log('hi')
    }
    else{
    response.render(path.join(__dirname,'../views/logout.html'));
    }
});
app.get('/reset',(request,response) => {
    console.log('no')
    if(typeof(request.session.userId)==="undefined"){
        response.redirect('/')
        console.log('hi')
    }
    else{

    response.render(path.join(__dirname,'../views/reset1.html'));
    }
});
app.get('/newfac',(request,response) => {
    console.log('no')
    if(typeof(request.session.userId)==="undefined"){
        response.redirect('/')
        console.log('hi')
    }
    else{
    response.render(path.join(__dirname,'../views/signup_faculty.html'));
    }
});
app.get('/newstudent',(request,response) => {
    console.log('no')
    if(typeof(request.session.userId)==="undefined"){
        response.redirect('/')
        console.log('hi')
    }
    else{

    response.render(path.join(__dirname,'../views/signup_pro.html'));
}  
});
app.get('/studenttosubject',(request,response) => {
    console.log('no')
    if(typeof(request.session.userId)==="undefined"){
        response.redirect('/')
        console.log('hi')
    }
    else{
    response.render(path.join(__dirname,'../views/addstudent.html'));
}});
app.get('/startsession:username',(request,response,error) => {
    const { username } = request.params;
    request.session.userId=username
    console.log(request.session.userId)
    const db = dbService.getDbServiceInstance();
    result=db.insert(username)
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));

});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////create
app.post('/insert', (request, response) => {

    const { name, rollno,subject} = request.body;
    console.log(name);
    const db = dbService.getDbServiceInstance();
    
    const result = db.insertNewName(name,rollno,subject);
    

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});
app.post('/insertlog', (request, response) => {

    const { id,rollno,subject,Date,Hour,present,name} = request.body;
    console.log(name);
    const db = dbService.getDbServiceInstance();
    
    const result = db.insertNewNamelog(id,rollno,subject,Date,Hour,present,name);
    

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});
app.post('/insertrecord', (request, response) => {

    const { name, rollno,subject} = request.body;
    console.log(name);
    const db = dbService.getDbServiceInstance();
    
    const result = db.insertNewRecord(name,rollno,subject,0,0);
    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});
app.post('/insert_fac', (request, response) => {

    const { name, subject, department, semester, clas} = request.body;
    console.log(name);
    const db = dbService.getDbServiceInstance();
    
    const result = db.insertNewName_fac(name, subject, department, semester, clas);
    

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});
app.post('/insert_newuser', (request, response) => {

    const { name, rollno, department, clas, email} = request.body;
    console.log(name);
    const db = dbService.getDbServiceInstance();
    console.log('bi');
    const result = db.insertNewName_newuser(name, rollno, department, clas, email);
    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});
app.post('/getpass', (request, response) => {
    console.log(request.session)
    const { username,password} = request.body;
    console.log(username)
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData_pass(username,password);
    console.log(result)
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////read
app.get('/getall', (request, response) => {
    const db = dbService.getDbServiceInstance(); 
    const result = db.getAllData();
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})
app.get('/getall_fac', (request, response) => {
   
    const db = dbService.getDbServiceInstance();
    console.log('hi')
    const result =  db.getAllData_fac();
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})
app.get('/getall_attend:search', (request, response) => {
    console.log('hi')
    const { search } = request.params;
    const db = dbService.getDbServiceInstance();
    console.log('hi')
    const result = db.getAllData_attend(search);
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})
app.get('/getall_check:search', (request, response) => {
    console.log(request.session.userId)
    const { search } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData_check(search);
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})
app.get('/getall_log:search', (request, response) => {
    const { search } = request.params;
    const name= request.session.userId;
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData_log(search,name);
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})
app.get('/getallsem', (request, response) => {
    console.log(request.session.userId)
    const search=request.session.userId;
    const db = dbService.getDbServiceInstance();
    console.log('hi')
    const result = db.getAllData_checksem(search);
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})
app.get('/getpass_student:username', (request, response) => {
    console.log('hi')
    const { username } = request.params;
    const db = dbService.getDbServiceInstance();
    console.log('hi')
    const result = db.getAllData_pass_student(username);
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})
app.get('/getchangepass:password', (request, response) => {
    const { password } = request.params;
    const db = dbService.getDbServiceInstance();
    console.log(request.session)
    const result = db.getAllData_pass(request.session.userId,password);
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// update
app.patch('/update', (request, response) => {
    const { id, name } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.updateNameById(id, name);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});
app.patch('/update_fac', (request, response) => {
    const { id, name } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.updateNameById_fac(id, name);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});
app.patch('/update_attend', (request, response) => {
    const {subject} = request.body;
    const db = dbService.getDbServiceInstance();
    console.log('he')
    const result = db.updateNameById_attend(subject);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});
app.patch('/update_take', (request, response) => {
    const {id} = request.body;
    console.log(id)
    const db = dbService.getDbServiceInstance();

    const result = db.updateNameById_take(id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});
app.patch('/update_log', (request, response) => {
    const {id,Date,subject} = request.body;
    console.log(id)
    const db = dbService.getDbServiceInstance();

    const result = db.updateNameById_log(id,Date,subject);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});
app.patch('/update_password', (request, response) => {
    const {pass} = request.body;
    const hash = bcrypt.hashSync(pass, saltRounds);
    console.log('hello')
    const db = dbService.getDbServiceInstance();
    const result = db.updateNameById_password(hash,request.session.userId);
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////delete
app.delete('/delete/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById(id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});
app.delete('/delete_fac/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById_fac(id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////search
app.get('/search/:name', (request, response) => {
    const { name } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchByName(name);
    console.log(result);
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});
app.get('/search_fac/:name', (request, response) => {
    const { name } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchByName_fac(name);
    console.log(result);
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////logout
app.post('/logout',(request,response)=>{
    console.log(request.session)
    console.log(request.session.id)
    request.session.destroy(err=>{
        response.clearCookie('sid')
        response.redirect('/')
    })
    console.log(request.session)
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////mail
app.post('/forgot', function (req, res) {
    var email=req.body.uname;
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(email.match(mailformat)){
         console.log(email);
         res.send("Please check your mail, a verification mail is sent");
         let transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure:true,
            auth: {
               user: 'smartattendencesystem@gmail.com',
               pass: 'Q@123Enm'

            }
        });
        const message = {
            from: 'smartattendencesystem@gmail.com', // Sender address
            to: email,         // List of recipients
            subject: 'Acknowledgement', // Subject line
            text: 'This a verification mail u will receive a reset link asap',// Plain text body,
            html: '<p>This a verification mail u will receive a reset link asap <a href="http://127.0.0.1:5500/client/reset1.html">here</a> to reset your password</p>'
        };
        transport.sendMail(message, function(err, info) {
            if (err) {
              console.log(err)
            } else {
              console.log(info);
            }
        });
    }
    else{
        res.send("enter a valid mail ! refresh");
    }
});
var otpGenerator = require('otp-generator');
const e = require('express');
const { SIGUSR1 } = require('constants');
app.post('/signup_faculty', function (req, res) {
    var name=req.body.name;
    console.log(name)
    var fac_id=req.body.fac_id;
    console.log(fac_id)
    var department=req.body.dep;
    console.log(department)
    var email=req.body.email;
    var subject=req.body.subject;
    console.log(email)
    var otp=otpGenerator.generate(6, { upperCase: false, specialChars: false,alphabets:false });
    var password = bcrypt.hashSync(otp, saltRounds);
    console.log(otp)
    const db = dbService.getDbServiceInstance();
    console.log('bi');
    db.insertNewName_newfac_id(name, fac_id, department,email,password,subject);
    db.enrolluser(name,password);
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(email.match(mailformat)){
         console.log(email);
         res.send("Please check your mail, a verification mail is sent");
         let transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure:true,
            auth: {
               user: 'smartattendencesystem@gmail.com',
               pass: 'Q@123Enm'
            }
        });
        const message = {
            from:'smartattendencesystem@gmail.com', // Sender address
            to: email,         // List of recipients
            subject: 'Acknowledgement', // Subject line
            html: `This a verification mail u will receive a reset link <a href="http://127.0.0.1:5500/reset1.html">here</a> to reset your password and use this otp '${otp}'`
        };
        transport.sendMail(message, function(err, info) {
            if (err) {
              console.log(err)
            } else {
              console.log(info);
            }
        });
    }
    else{
        res.send("enter a valid mail ! refresh");
    }
});
app.post('/signup_Student', function (req, res) {
    var name=req.body.name;
    console.log(name)
    var student_id=req.body.rollno;
    console.log(student_id)
    var department=req.body.dep;
    console.log(department)
    var clas=req.body.class;
    console.log(clas)
    var email=req.body.email;
    console.log(email)
    var otp=otpGenerator.generate(6, { upperCase: false, specialChars: false,alphabets:false });
    console.log(otp)
    var password = bcrypt.hashSync(otp, saltRounds);
    const db = dbService.getDbServiceInstance();
    console.log('bi');
    db.insertNewName_newuser(name, student_id, department,clas,email,password);
    db.enrolluser(name,password);
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(email.match(mailformat)){
         console.log(email);
         res.send("Please check your mail, a verification mail is sent");
         let transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure:true,
            auth: {
               user: 'smartattendencesystem@gmail.com',
               pass: 'Q@123Enm'
            }
        });
        const message = {
            from: 'smartattendencesystem@gmail.com', // Sender address
            to: email,         // List of recipients
            subject: 'Acknowledgement', // Subject line
            html: `This a verification mail u will receive a reset link <a href="http://127.0.0.1:5500/reset1.html">here</a> to reset your password and use this otp '${otp}'`
        };
        transport.sendMail(message, function(err, info) {
            if (err) {
              console.log(err)
            } else {
              console.log(info);
            }
        });
    }
    else{
        res.send("enter a valid mail ! refresh");
    }
});
module.exports.app=app
app.listen(process.env.PORT, () => console.log('app is running'));
