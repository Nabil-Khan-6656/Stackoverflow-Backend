const  express = require ('express');
const User = require('../models/auth');

const { login, signup } = require ('../controllers/auth.js')
const { getAllUsers, updateProfile } =require( '../controllers/users.js')
const auth = require( '../middleware/auth.js')

const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)

router.get('/getAllUsers', getAllUsers)
router.patch('/update/:id', auth, updateProfile)


module.exports=  router