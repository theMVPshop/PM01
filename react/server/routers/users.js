const express = require('express')
const usersController = require('../controllers/users')
const router = express.Router()

router.get('/users', usersController.getAllUsers)

router.get('/projects', usersController.getAllProjects)

router.get('/milestones', usersController.getMilestoneByProject)

router.post('/milestones', usersController.createMilestone)

router.delete('/milestones', usersController.deleteMilestoneById)

module.exports = router;