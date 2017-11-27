const config = require('./config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const Task = require('./models/note');
const User = require('./models/user');

const bodyParser = require('body-parser');
const passport = require('passport');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(config.dbUri);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

// load passport strategies
const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./middleware/auth-check');
app.use('/api', authCheckMiddleware);
// app.use('/auth', authCheckMiddleware);
app.use('/notes', authCheckMiddleware);

const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

const routes = require('./routes/notes');
routes(app);

app.listen(3000, () => console.log('todo list RESTful API server started on: 3000'));