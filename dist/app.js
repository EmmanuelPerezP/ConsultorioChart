"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _nodeSassMiddleware = _interopRequireDefault(require("node-sass-middleware"));

var _index = _interopRequireDefault(require("./routes/index"));

var _users = _interopRequireDefault(require("./routes/users"));

var _api = _interopRequireDefault(require("./routes/api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])(); // view engine setup

app.set('views', _path["default"].join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use((0, _nodeSassMiddleware["default"])({
  src: _path["default"].join(__dirname, 'public'),
  dest: _path["default"].join(__dirname, 'public'),
  indentedSyntax: false,
  // true = .sass and false = .scss
  sourceMap: true
}));
app.use(_express["default"]["static"](_path["default"].join(__dirname, 'public'))); // Route definition and redirection

app.use('/', _index["default"]);
app.use('/users', _users["default"]);
app.use('/api', _api["default"]); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next((0, _httpErrors["default"])(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render('error');
});
var _default = app;
exports["default"] = _default;