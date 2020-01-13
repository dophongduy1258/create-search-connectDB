module.exports.requireLogin = (req,res,next)=>{
	if(!req.cookies.userID){
		res.redirect('/login');
	}

	var user = db.get('lstUsers').find({id: req.cookies.userID}).value();

	if(!user){
		res.redirect('/login');
	}

	next();
}