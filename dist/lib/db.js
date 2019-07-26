"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var sqlite3 = require("sqlite3").verbose();

var Database =
/*#__PURE__*/
function () {
  function Database() {
    _classCallCheck(this, Database);

    // open the database
    this.db = '';
  }

  _createClass(Database, [{
    key: "open",
    value: function open() {
      this.db = new sqlite3.Database("../datos.sqlite", sqlite3.OPEN_READWRITE, function (err) {
        if (err) {
          console.error(err.message);
        }

        console.log("Connected to the database.");
      });
    }
  }, {
    key: "close",
    value: function close() {
      this.db.close(function (err) {
        if (err) {
          console.error(err.message);
        }

        console.log("Close the database connection.");
      });
    }
  }, {
    key: "dictamenesPorMes",
    value: function () {
      var _dictamenesPorMes = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this = this;

        var sql, promise, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                sql = "\n      SELECT strftime(\"%Y-%m\",Fecha) AS MonthYear,\n      SUM(Comprado) AS Total\n      FROM compras\n      GROUP BY strftime(\"%m-%Y\", Fecha) \n      ORDER BY strftime(\"%Y-%m\", Fecha);\n    "; // wrap query in a promise to return result

                promise = new Promise(function (resolve, reject) {
                  _this.db.all(sql, [], function (err, rows) {
                    if (err) {
                      throw err;
                    }

                    resolve(rows);
                  });
                });
                _context.next = 4;
                return promise;

              case 4:
                result = _context.sent;
                return _context.abrupt("return", result);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function dictamenesPorMes() {
        return _dictamenesPorMes.apply(this, arguments);
      }

      return dictamenesPorMes;
    }()
  }]);

  return Database;
}();

exports["default"] = Database;