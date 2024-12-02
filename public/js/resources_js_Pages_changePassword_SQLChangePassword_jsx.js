"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_changePassword_SQLChangePassword_jsx"],{

/***/ "./resources/js/Pages/changePassword/SQLChangePassword.jsx":
/*!*****************************************************************!*\
  !*** ./resources/js/Pages/changePassword/SQLChangePassword.jsx ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _inertiajs_inertia_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @inertiajs/inertia-react */ "./node_modules/@inertiajs/inertia-react/dist/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



var SQLChangePassword = function SQLChangePassword() {
  var username = (0,_inertiajs_inertia_react__WEBPACK_IMPORTED_MODULE_1__.usePage)().props.username; // Obtener el username desde las props
  var _useForm = (0,_inertiajs_inertia_react__WEBPACK_IMPORTED_MODULE_1__.useForm)({
      new_password: "",
      new_password_confirmation: ""
    }),
    data = _useForm.data,
    setData = _useForm.setData,
    post = _useForm.post,
    errors = _useForm.errors;
  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    post("/sql-update-password");
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    className: "relative flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-emerald-500 to-green-600",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "absolute inset-0 bg-opacity-20 bg-white mix-blend-overlay"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "relative w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 z-10",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h1", {
        className: "text-3xl font-bold text-center mb-6 text-emerald-700",
        children: "Cambiar Contrase\xF1a"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("p", {
        className: "text-center text-gray-600 mb-6",
        children: ["Usuario:", " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
          className: "font-medium text-gray-800",
          children: username
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("form", {
        onSubmit: handleSubmit,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          className: "mb-6",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
            className: "block text-gray-700 font-medium mb-2",
            children: "Nueva Contrase\xF1a"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
            type: "password",
            value: data.new_password,
            onChange: function onChange(e) {
              return setData("new_password", e.target.value);
            },
            className: "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ".concat(errors.new_password ? "border-red-500" : ""),
            placeholder: "Ingrese su nueva contrase\xF1a"
          }), errors.new_password && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
            className: "text-red-500 text-sm mt-1",
            children: errors.new_password
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          className: "mb-6",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
            className: "block text-gray-700 font-medium mb-2",
            children: "Confirmar Nueva Contrase\xF1a"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
            type: "password",
            value: data.new_password_confirmation,
            onChange: function onChange(e) {
              return setData("new_password_confirmation", e.target.value);
            },
            className: "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ".concat(errors.new_password_confirmation ? "border-red-500" : ""),
            placeholder: "Confirme su nueva contrase\xF1a"
          }), errors.new_password_confirmation && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
            className: "text-red-500 text-sm mt-1",
            children: errors.new_password_confirmation
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("button", {
          type: "submit",
          className: "w-full bg-emerald-600 text-white font-medium py-2 rounded-lg hover:bg-emerald-700 transition duration-200 shadow-md",
          children: "Cambiar Contrase\xF1a"
        })]
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SQLChangePassword);

/***/ })

}]);