const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const getAllUsers = (req, res) => {
    pool.query("SELECT * FROM users", (err, rows) => {
        if (err) return handleSQLError(res, err)
        return res.json(rows);
    })
}

const getAllProjects = (req, res) => {
    pool.query("SELECT * FROM projects", (err, rows) => {
        if (err) return handleSQLError(res, err)
        return res.json(rows);
    })
}

const getMilestoneByProject = (req, res) => {
    let sql = "SELECT * FROM milestones WHERE project_id = ?"
    sql = mysql.format(sql, [ req.params.project_id ])

    pool.query(sql, (err, rows) => {
        if (err) return handleSQLError(res, err)
        return res.json(rows);
    })
}

const createMilestone = (req, res) => {
    let { status, date, title, subtitle, project_id } = req.body
    let sql = "INSERT INTO milestones (title, subtitle, project_id, due_date, ms_status) VALUE  (?, ?, ?, ?, ?)"
    sql = mysql.format(sql, [ title, subtitle, project_id, date, status ]);

    pool.query(sql, (err, rows) => {
        if (err) return handleSQLError(res, err)
        return res.json({ message: `Created milestone: ${rows.insertId}` });
    })
}

const deleteMilestoneById = (req, res) => {
    let sql = "DELETE FROM milestones WHERE id = ?"
    sql = mysql.format(sql, [ req.body.id ])

    pool.query(sql, (err, rows) => {
        if (err) return handleSQLError(res, err)
        return res.json({ message: `Deleted milestone: ${rows.affectedRows}`, id: req.body.id });
    })
}

module.exports = {
    getAllUsers,
    getAllProjects,
    getMilestoneByProject,
    createMilestone,
    deleteMilestoneById
}