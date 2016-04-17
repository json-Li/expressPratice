var express=require('express');
var app=express();
var path=require('path');
var bodyParser=require('body-parser');
var multer=require('multer');






app.set('views',path.resolve('../../app'));
app.set('view engine','html');
app.engine('.html',require('ejs').__express);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());






app.get('/',function(req,res){
	res.render('login');
});
app.post('/login',function(req,res){
	console.log('用户名称为'+req.body.username);
});


// app.get('/login',function(req,res){
// 	res.render('login');
// });
// app.get('/home',function(req,res){
// 	res.render('home');
// });
app.listen(4000);