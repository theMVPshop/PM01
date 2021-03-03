const express = require('express')
const usersController = require('../controllers/users')
const router = express.Router()

router.get('/users', usersController.getAllUsers)

router.get('/projects', usersController.getAllProjects)

module.exports = router;