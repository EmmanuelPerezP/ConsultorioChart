"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _db = _interopRequireDefault(require("../lib/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

/* GET home page. */
router.get('/dictamenes-por-mes', function (req, res, next) {
  _db["default"].open();

  var data = _db["default"].dictamenesPorMes();

  _db["default"].close();

  res.send(data);
});
var _default = router;
exports["default"] = _default;