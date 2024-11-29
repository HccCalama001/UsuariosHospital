"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_SQLLogin_jsx"],{

/***/ "./resources/js/Pages/SQLLogin.jsx":
/*!*****************************************!*\
  !*** ./resources/js/Pages/SQLLogin.jsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _inertiajs_inertia_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @inertiajs/inertia-react */ "./node_modules/@inertiajs/inertia-react/dist/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



var SQLLogin = function SQLLogin() {
  var _useForm = (0,_inertiajs_inertia_react__WEBPACK_IMPORTED_MODULE_1__.useForm)({
      username: "",
      current_password: ""
    }),
    data = _useForm.data,
    setData = _useForm.setData,
    post = _useForm.post,
    errors = _useForm.errors;
  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    post("/sql-authenticate");
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    className: "relative flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-emerald-500 to-green-600",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "absolute inset-0 bg-opacity-20 bg-white mix-blend-overlay"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "relative w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 z-10",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h1", {
        className: "text-3xl font-extrabold text-center mb-4 text-emerald-700",
        children: "Bienvenido"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "text-center text-gray-600 mb-6",
        children: "Por favor, ingrese sus credenciales para continuar"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("form", {
        onSubmit: handleSubmit,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          className: "mb-6",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
            className: "block text-gray-700 font-medium mb-2",
            children: "Nombre de Usuario"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
            type: "text",
            value: data.username,
            onChange: function onChange(e) {
              return setData("username", e.target.value);
            },
            className: "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ".concat(errors.username ? "border-red-500" : ""),
            placeholder: "Ingrese su usuario"
          }), errors.username && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
            className: "text-red-500 text-sm mt-1",
            children: errors.username
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          className: "mb-6",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
            className: "block text-gray-700 font-medium mb-2",
            children: "Contrase\xF1a Actual"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
            type: "password",
            value: data.current_password,
            onChange: function onChange(e) {
              return setData("current_password", e.target.value);
            },
            className: "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ".concat(errors.current_password ? "border-red-500" : ""),
            placeholder: "Ingrese su contrase\xF1a actual"
          }), errors.current_password && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
            className: "text-red-500 text-sm mt-1",
            children: errors.current_password
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("button", {
          type: "submit",
          className: "w-full bg-emerald-600 text-white font-medium py-2 rounded-lg hover:bg-emerald-700 transition duration-200 shadow-md",
          children: "Iniciar Sesi\xF3n"
        })]
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SQLLogin);

/***/ })

}]);