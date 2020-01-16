module.exports.requireLogin = (req,res,next)=>{
	console.log(req.cookies, req.signedCookies);
	if(!req.signedCookies.userID){
		res.redirect('/login');
	}

	var user = db.get('lstUsers').find({
		id: req.signedCookies.userID
	}).value();

	if(!user){
		res.redirect('/login');
	}

	res.locals.user = user;

	next();
}