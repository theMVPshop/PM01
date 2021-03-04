//dependencies
require('dotenv').config()
const express = require("express");
const session = require('express-session');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

//routers
const usersRouter = require('./routers/users');
const authRouter = require('./routers/auth');

//more initializing
const app = express();
const port = process.env.PORT || 4001;

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json())
app.use('/', express.static('client/build'), usersRouter)
app.use('/auth', authRouter)


// app.get('/', (req, res) => {
//     res.send('Welcome to our server!');
// })

app.listen(port, () => {
    console.log(`Web server is listening on port ${port}!`);
});
