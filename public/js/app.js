var express=require('express');
var app=express();
var path=require('path');
var bodyParser=require('body-parser');
var multer=require('multer');
var session=require('express-session');






app.set('views',path.resolve('../../app'));
app.set('view engine','html');
app.engine('.html',require('ejs').__express);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer().fields());
app.use(session({
	secret: 'secret',
	resave:true,
	saveUninitialized:false,
	cookie:{
		maxAge: 1000*60*10
	}
}));
app.use(function(req,res,next){
	console.log('中间件');
	console.log(req.session.user);
	res.locals.user=req.session.user;
	var err=req.session.error;
	res.locals.message='';
	if(err){
		res.locals.message='<div style="margin-bottom: 20px; color: red;"';
	}
		next();
})

app.get('/logout',function(req,res){
	req.session.user=null;
	req.session.error=null;
	res.redirect('index');

})
app.get('/index',function(req,res){
	res.render('index');
});


app.get('/',function(req,res){
	console.log('render login'+req);
	res.render('login');
});
app.post('/login',function(req,res){

	console.log(req);
	var user={
		username:'admin',
		password: 'admin'
	}
	console.log(req.body);
	if(req.body.username==user.username&&req.body.password==user.password){
		req.session.user=user;
		res.send(200);
	}else{
		req.session.error='用户名或者密码错误';
		res.send(404);
	}
	console.log('用户名称为'+req.body.username);
});




// app.get('/login',function(req,res){
// 	res.render('login');
// });
app.get('/home',function(req,res){
	console.log(req);
	if(req.session.user){
		res.render('home');
	}else{
		req.session.error="请先登录";
		res.redirect('login');
	}
});
app.listen(4000);