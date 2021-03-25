const express = require('express')
const usersController = require('../controllers/users')
const router = express.Router()

router.get('/users', usersController.getAllUsers)

router.get('/projects', usersController.getAllProjects)

router.post('/projects', usersController.createProject)

router.get('/milestones/:project_id', usersController.getMilestoneByProject)

router.post('/milestones', usersController.createMilestone)

router.delete('/milestones/:id', usersController.deleteMilestoneById)

router.put('/milestones', usersController.updateMilestoneById)

module.exports = router;