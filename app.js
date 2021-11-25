const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index');
const login = require('./routes/Login');
const register = require('./routes/Register')
const getUserAvatar = require('./routes/GetUserAvatar')
const createGroup = require('./routes/CreateGroup')
const joinGroup = require('./routes/JoinGroup')
const getGroups = require('./routes/GetData')
const addRecord = require('./routes/AddRecord')
const dissmissGroup = require('./routes/DismissGroup')
const deleteRecord = require('./routes/DeleteRecord')
const modifyRecord = require('./routes/ModifyRecord')
const getUsers = require('./routes/GetUsers')

const app = express();

// CORS
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', indexRouter);
app.use('/login', login);
app.use('/register', register)
app.use('/getUserAvatar', getUserAvatar)
app.use('/createGroup', createGroup)
app.use('/joinGroup', joinGroup)
app.use('/getGroups', getGroups)
app.use('/addRecord', addRecord)
app.use('/dissmissGroup', dissmissGroup)
app.use('/deleteRecord', deleteRecord)
app.use('/modifyRecord', modifyRecord)
app.use('/getUsers', getUsers)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
