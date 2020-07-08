
const express = require('express')

const UserControl = require('../controllers/userControl')

const router = express.Router()

router.post('/user', UserControl.createUser)
router.put('/user/:id', UserControl.updateUser)
router.delete('/user/:id', UserControl.deleteUser)
router.get('/user/:id', UserControl.getUserById)
router.get('/users', UserControl.getUsers)

module.exports = router