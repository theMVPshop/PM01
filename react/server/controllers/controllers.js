const mysql = require("mysql");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const getAllUsers = (req, res) => {
  pool.query("SELECT * FROM users", (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const getAllProjects = (req, res) => {
  pool.query("SELECT * FROM projects", (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const updateRoleByUsername = (req, res) => {
  let { username, isModerator } = req.body;
  let sql = "UPDATE users SET isModerator = ? WHERE username = ?";
  sql = mysql.format(sql, [isModerator, username]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json({
      message: `Updated role: ${username} to ${
        isModerator ? "Moderator" : "Client"
      }`,
    });
  });
};

const createProject = (req, res) => {
  let { title, description } = req.body;
  let sql = "INSERT INTO projects (title, description) VALUE  (?, ?)";
  sql = mysql.format(sql, [title, description]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json({ message: `Created project: ${rows.insertId}` });
  });
};

const getAllPermissions = (req, res) => {
  pool.query("SELECT * FROM permissions", (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const addPermission = (req, res) => {
  let { username, project_id } = req.body;
  let sql = "INSERT INTO permissions (username, project_id) VALUE  (?, ?)";
  sql = mysql.format(sql, [username, project_id]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json({
      message: `Added ${project_id} permission for ${username}`,
    });
  });
};

const getMilestoneByProject = (req, res) => {
  let sql = "SELECT * FROM milestones WHERE project_id = ?";
  sql = mysql.format(sql, [req.params.project_id]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const createMilestone = (req, res) => {
  console.log("the whole request", req.body);
  let {
    ms_status,
    due_date,
    title,
    subtitle,
    project_id,
    description,
  } = req.body;
  let sql =
    "INSERT INTO milestones (title, subtitle, project_id, due_date, ms_status, description) VALUE (?, ?, ?, ?, ?, ?)";
  sql = mysql.format(sql, [
    title,
    subtitle,
    project_id,
    due_date,
    ms_status,
    description,
  ]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json({ message: `Created milestone: ${rows.insertId}` });
  });
};

const deleteMilestoneById = (req, res) => {
  let sql = "DELETE FROM milestones WHERE id = ?";
  sql = mysql.format(sql, [req.params.id]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json({
      message: `Deleted milestone: ${rows.affectedRows}`,
      id: req.body.id,
    });
  });
};

const updateMilestoneById = (req, res) => {
  let { title, subtitle, project_id, due_date, ms_status, id } = req.body;
  let sql =
    "UPDATE milestones SET title = ?, subtitle = ?, project_id = ?, due_date = ?, ms_status = ? WHERE id = ?";
  sql = mysql.format(sql, [
    title,
    subtitle,
    project_id,
    due_date,
    ms_status,
    id,
  ]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json({ message: `Updated Milestone: ${rows.insertId}` });
  });
};

module.exports = {
  getAllUsers,
  getAllProjects,
  createProject,
  getMilestoneByProject,
  createMilestone,
  deleteMilestoneById,
  updateMilestoneById,
  updateRoleByUsername,
  addPermission,
  getAllPermissions,
};
