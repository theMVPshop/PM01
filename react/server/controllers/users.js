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

module.exports = {
    getAllUsers,
    getAllProjects
}