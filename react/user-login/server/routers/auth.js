const mysql = require('mysql')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

// for bcrypt
const saltRounds = 10
const jwtExpirySeconds = 1200

// const createUser = (req, res) => {
//     let sql = "INSERT INTO users (user_name) VALUE (?)"
//     sql = mysql.format(sql, [req.body.username]);

//     pool.query(sql, (err, rows) => {
//         if (err) return handleSQLError(res, err)
        
//     })
// }

const signup = (req, res) => {
    const { username, password } = req.body;
    console.log(username);
    let sql = "INSERT INTO users (user_name, pword) VALUES (?, ?)";

    bcrypt.hash(password, saltRounds, function(err, hash) {
        sql = mysql.format(sql, [ username, hash ]);
        
        pool.query(sql, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY')
                return res.status(409).send('Username is taken')
                // return handleSQLError(res, err)
            }
            createPlayer(req, res);
            console.log("sign up successful")
            res.redirect('/')
            res.end()
        })
    })
    
}

const login = (req, res) => {
    const { username, password } = req.body
    const user = {
        username: username,
        password: password
    }
    // console.log(user);
    let sql = "SELECT * FROM users WHERE user_name = ?"
    sql = mysql.format(sql, [ username ])

    pool.query(sql, (err, rows) => {
        if (err) return handleSQLError(res, err)
        if (!rows.length) return res.status(404).send('No matching users')

        const hash = rows[0].password
        bcrypt.compare(password, hash)
            // .catch(err => {
            //     res.sendStatus(err)
            // })
            .then(result => {
                if (!result) return res.status(400).send('Invalid password')

                const data = { ...rows[0] }
                data.password = 'REDACTED'

                let token = jwt.sign(data, 'secret', { expiresIn: jwtExpirySeconds })
                
            //maxAge is in milliseconds
                res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 })
                res.cookie("username", username, { maxAge: jwtExpirySeconds * 1000 })
                // res.json({
                //     msg: 'Login successful',
                //     token
                // })
                setTimeout(() => {
                    res.redirect('/playerpage')
                }, 500)
                
                // res.end()
            })
    })
}

module.exports = {
  signup,
  login
//   logout
}