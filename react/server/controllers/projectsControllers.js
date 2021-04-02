const mysql = require("mysql");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const getAllProjects = (req, res) => {
  pool.query("SELECT * FROM projects", (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
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

module.exports = {
  getAllProjects,
  createProject,
};
