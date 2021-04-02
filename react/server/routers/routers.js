const express = require("express");
const usersControllers = require("../controllers/usersControllers");
const projectsControllers = require("../controllers/projectsControllers");
const milestonesControllers = require("../controllers/milestonesControllers");
const permissionsControllers = require("../controllers/permissionsControllers");
const devlogController = require("../controllers/devlogController");
const router = express.Router();

// users controllers
router.get("/users", usersControllers.getAllUsers);
router.post("/users", usersControllers.createUser);
router.put("/users", usersControllers.updateRoleByUsername);

// projects controllers
router.get("/projects", projectsControllers.getAllProjects);
router.post("/projects", projectsControllers.createProject);
// router.get('/projects', controllers.getProjectByUser)

// permissions controllers
router.get("/permissions", permissionsControllers.getAllPermissions);
router.delete("/permissions/:id", permissionsControllers.removePermission);
router.post("/permissions", permissionsControllers.addPermission);

// milestones controllers
router.get(
  "/milestones/:project_id",
  milestonesControllers.getMilestoneByProject
);
router.post("/milestones", milestonesControllers.createMilestone);
router.delete("/milestones/:id", milestonesControllers.deleteMilestoneById);
router.put("/milestones", milestonesControllers.updateMilestoneById);
router.put("/milestones/:id", milestonesControllers.updateMilestoneStatusById);

// devlog controllers
router.get("/devlog/:project_id", devlogController.getDevlogByProject);
router.post("/devlog", devlogController.createDevlog);
router.delete("/devlog/:id", devlogController.deleteDevlogById);
router.put("/devlog", devlogController.updateDevlogById);

module.exports = router;
