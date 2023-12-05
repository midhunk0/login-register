const express = require('express')
const router = express.Router();
const cors = require('cors');
const { 
    registerUser, 
    loginUser, 
    getProfile, 
    logoutUser, 
    // updateProfile 
} = require('../controllers/authController');

//middleware
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000"
    })
);

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getProfile);
router.post('/logout', logoutUser);
// router.put('/update/:id', updateProfile)

module.exports = router;