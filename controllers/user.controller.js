var db = require('../db');
var shortID = require('shortid');

module.exports.index = (req,res)=>{
	res.render('users/users',{lstUsers:db.get('lstUsers').value()});
};

module.exports.search = (req,res)=>{
	var a = req.query.a;
	var findUser = db.get('lstUsers').value().filter((valuesUser)=>{
		return valuesUser.name.toLowerCase().indexOf(a.toLowerCase()) != -1;
	});
	res.render('users/users',{lstUsers:findUser});
};

module.exports.create = (req,res)=>{
	res.render('users/create');
};

module.exports.postCreate = (req,res)=>{
	var errors = [];
	if(!req.body.name){
		errors.push('Name is required.');
	}

	if(!req.body.phone){
		errors.push('Phone is required.');
	}

	if(errors.length){
		res.render('users/create',{
			errors: errors,
			values: req.body
		});
		return;
	}
	req.body.id = shortID.generate();
	db.get('lstUsers').push(req.body).write();
	res.redirect('/users');
};

module.exports.getID = (req,res)=>{
	var id = req.params.id;
	var user = db.get('lstUsers').find({id:id}).value('name');
	res.render('users/infor',{inforUser : user});
};