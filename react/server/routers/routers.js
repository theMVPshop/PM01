const express = require("express");
const controllers = require("../controllers/controllers");
const devlogController = require("../controllers/devlogController");
const router = express.Router();

router.get("/users", controllers.getAllUsers);

router.get("/projects", controllers.getAllProjects);

router.post("/users", controllers.createUser);

router.put("/users", controllers.updateRoleByUsername);

// router.get('/projects', controllers.getProjectByUser)

router.post("/projects", controllers.createProject);

router.get("/permissions", controllers.getAllPermissions);

router.delete("/permissions/:id", controllers.removePermission);

router.post("/permissions", controllers.addPermission);

router.get("/milestones/:project_id", controllers.getMilestoneByProject);

router.post("/milestones", controllers.createMilestone);

router.delete("/milestones/:id", controllers.deleteMilestoneById);

router.put("/milestones", controllers.updateMilestoneById);

router.get("/devlog/:project_id", devlogController.getDevlogByProject);

router.post("/devlog", devlogController.createDevlog);

router.delete("/devlog/:id", devlogController.deleteDevlogById);

router.put("/devlog", devlogController.updateDevlogById);

module.exports = router;
