var express = require('express');
var controller = require('../controllers/user.controller');
var router = express.Router();
var multer = require('multer');

var upload = multer({dest:'./public/uploads/'});

router.get('',controller.index);
router.get('/cookie',(req,res,next)=>{
	res.cookie('user-id',123456);
	res.send('Hello');
	
});
router.get('/search',controller.search);
router.get('/create',controller.create);
router.post('/create',upload.single('avatar'),controller.postCreate);

router.get('/:id',controller.getID);


module.exports = router; 