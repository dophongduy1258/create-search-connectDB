var md5 = require('md5');

module.exports.login = (req,res)=>{
	res.render('users/login');
}

module.exports.postLogin = (req,res)=>{
	var email = req.body.email;
	var password = req.body.password;

	var user = db.get('lstUsers').find({email:email}).value();

	if(!user){
		res.render('users/login',{
			errors:[
				'User does not exist.'
			],
			values: req.body
		});
		return;
	}

	var hashPassword = md5(password);

	if(user.password !== hashPassword){
		res.render('users/login',{errors:[
				'Wrong password.'
			],
			values: req.body
		});
	}	
	res.cookie('userID',user.id);
	res.redirect('/users');

}
