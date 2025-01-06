"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_usuario_components_Card_CardSisEscr_jsx"],{

/***/ "./resources/js/Pages/usuario/components/Card/CardSisEscr.jsx":
/*!********************************************************************!*\
  !*** ./resources/js/Pages/usuario/components/Card/CardSisEscr.jsx ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");


var CardSisEscr = function CardSisEscr(_ref) {
  var escritorio = _ref.escritorio;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: "bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("h3", {
      className: "text-lg font-semibold text-teal-800 mb-2",
      children: ["Sistema: ", escritorio.NombreGrupo]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "text-sm text-gray-600",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("p", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
          className: "font-bold",
          children: "ID Sistema:"
        }), " ", escritorio.GrupoID.trim()]
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CardSisEscr);

/***/ })

}]);