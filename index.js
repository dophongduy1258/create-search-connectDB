var express = require('express');
var port = 3000;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var userRoute = require('./routers/user.route');
var loginRoute = require('./routers/login.route');
var loginMiddleware = require('./middlewares/login.middleware');


var app = express();

app.set('view engine','pug');
app.set('views','./views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static('public'));



app.get('/',(req,res)=>{
	res.render('index');
});

app.use('/users',loginMiddleware.requireLogin,userRoute);
app.use('/login',loginRoute);



app.listen(port,()=>{
	console.log("Connect "+port+" successful!!!");
});