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

const createProject = (req,res) => {
    let { project_name } = req.body
    let sql = "INSERT INTO projects (project_name) VALUE  (?)"
    sql = mysql.format(sql, [ project_name ]);

    pool.query(sql, (err, rows) => {
        if (err) return handleSQLError(res, err)
        return res.json({ message: `Created project: ${rows.insertId}` });
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
    let { ms_status, due_date, title, subtitle, project_id } = req.body
    let sql = "INSERT INTO milestones (title, subtitle, project_id, due_date, ms_status) VALUE  (?, ?, ?, ?, ?)"
    sql = mysql.format(sql, [ title, subtitle, project_id, due_date, ms_status ]);

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

const updateMilestoneById = (req, res) => {
    let { title, subtitle, project_id, due_date, ms_status, id } = req.body;
    let sql = "UPDATE milestones SET title = ?, subtitle = ?, project_id = ?, due_date = ?, ms_status = ? WHERE id = ?"
    sql = mysql.format(sql, [ title, subtitle, project_id, due_date, ms_status, id ]);

    pool.query(sql, (err, rows) => {
        if (err) return handleSQLError(res, err)
        return res.json({ message: `Updated Milestone: ${rows.insertId}` });
    })
}

module.exports = {
    getAllUsers,
    getAllProjects,
    createProject,
    getMilestoneByProject,
    createMilestone,
    deleteMilestoneById,
    updateMilestoneById
}