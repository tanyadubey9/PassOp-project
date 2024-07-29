"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Navbar = function Navbar() {
  return /*#__PURE__*/_react["default"].createElement("nav", {
    className: "bg-blue-950 h-14 flex justify-around items-center font-bold"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-green-400 text-2xl"
  }, /*#__PURE__*/_react["default"].createElement("span", null, "<"), /*#__PURE__*/_react["default"].createElement("span", {
    className: "text-white"
  }, "Pass"), /*#__PURE__*/_react["default"].createElement("span", null, "OP/>")), /*#__PURE__*/_react["default"].createElement("button", {
    className: "flex items-center gap-2 bg-green-600 text-white rounded-full p-1 ring-white ring-1"
  }, /*#__PURE__*/_react["default"].createElement("img", {
    className: "invert w-8",
    src: "/icons/github.svg",
    alt: "GitHub logo"
  }), /*#__PURE__*/_react["default"].createElement("span", null, "GitHub")));
};
var _default = exports["default"] = Navbar;