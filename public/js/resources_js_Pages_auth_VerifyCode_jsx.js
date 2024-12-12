"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_auth_VerifyCode_jsx"],{

/***/ "./resources/js/Pages/auth/VerifyCode.jsx":
/*!************************************************!*\
  !*** ./resources/js/Pages/auth/VerifyCode.jsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }


var VerifyCode = function VerifyCode(_ref) {
  var errors = _ref.errors;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default().useState(""),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    code = _React$useState2[0],
    setCode = _React$useState2[1];
  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    // Aquí puedes manejar la lógica de envío del código
    console.log("Código enviado:", code);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 font-poppins",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "bg-white shadow-xl rounded-xl p-10 max-w-lg w-full",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h1", {
        className: "text-4xl font-bold text-teal-600 text-center mb-8",
        children: "Verificar C\xF3digo"
      }), (errors === null || errors === void 0 ? void 0 : errors.general) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
          children: errors.general
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("form", {
        onSubmit: handleSubmit,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
          className: "mb-6",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("label", {
            className: "block text-gray-700 font-medium mb-2",
            children: "C\xF3digo de Verificaci\xF3n"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
            type: "text",
            value: code,
            onChange: function onChange(e) {
              return setCode(e.target.value);
            },
            className: "w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none",
            placeholder: "Ingrese el c\xF3digo",
            required: true
          }), (errors === null || errors === void 0 ? void 0 : errors.code) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
            className: "text-red-500 text-sm mt-1",
            children: errors.code
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
          type: "submit",
          className: "w-full py-3 px-4 bg-teal-600 text-white font-medium rounded-lg shadow-lg hover:bg-teal-700 transition-all duration-200",
          children: "Verificar C\xF3digo"
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VerifyCode);

/***/ })

}]);