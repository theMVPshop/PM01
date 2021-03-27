const express = require("express");
const controllers = require("../controllers/controllers");
const router = express.Router();

router.get("/users", controllers.getAllUsers);

router.get("/projects", controllers.getAllProjects);

router.post("/projects", controllers.createProject);

router.get("/milestones/:project_id", controllers.getMilestoneByProject);

router.post("/milestones", controllers.createMilestone);

router.delete("/milestones/:id", controllers.deleteMilestoneById);

router.put("/milestones", controllers.updateMilestoneById);

module.exports = router;
