"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_usuario_components_Grid_UserInfoGrid_jsx"],{

/***/ "./resources/js/Pages/usuario/components/Card/UserInfoCard.jsx":
/*!*********************************************************************!*\
  !*** ./resources/js/Pages/usuario/components/Card/UserInfoCard.jsx ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");


var UserInfoCard = function UserInfoCard(_ref) {
  var title = _ref.title,
    content = _ref.content;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: "bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3", {
      className: "text-xs font-semibold text-gray-500 uppercase tracking-wide",
      children: title
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
      className: "text-xl font-bold text-teal-800 mt-2 truncate",
      children: content
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserInfoCard);

/***/ }),

/***/ "./resources/js/Pages/usuario/components/Grid/UserInfoGrid.jsx":
/*!*********************************************************************!*\
  !*** ./resources/js/Pages/usuario/components/Grid/UserInfoGrid.jsx ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Card_UserInfoCard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Card/UserInfoCard */ "./resources/js/Pages/usuario/components/Card/UserInfoCard.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



var UserInfoGrid = function UserInfoGrid(_ref) {
  var userNew = _ref.userNew;
  if (!userNew) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
      className: "text-gray-500 italic",
      children: "No hay informaci\xF3n general disponible."
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-6",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Card_UserInfoCard__WEBPACK_IMPORTED_MODULE_1__["default"], {
      title: "Nombre Completo",
      content: "".concat(userNew.Nombre, " ").concat(userNew.ApellidoPaterno, " ").concat(userNew.ApellidoMaterno)
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Card_UserInfoCard__WEBPACK_IMPORTED_MODULE_1__["default"], {
      title: "Nombre de Usuario",
      content: userNew.NombreUsuario
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Card_UserInfoCard__WEBPACK_IMPORTED_MODULE_1__["default"], {
      title: "RUT",
      content: userNew.Rut
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Card_UserInfoCard__WEBPACK_IMPORTED_MODULE_1__["default"], {
      title: "Correo Electr\xF3nico",
      content: userNew.EmailUsuario
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Card_UserInfoCard__WEBPACK_IMPORTED_MODULE_1__["default"], {
      title: "Tel\xE9fono",
      content: userNew.NumeroTelefono
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Card_UserInfoCard__WEBPACK_IMPORTED_MODULE_1__["default"], {
      title: "Estado",
      content: userNew.is_active ? "Activo" : "Inactivo"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Card_UserInfoCard__WEBPACK_IMPORTED_MODULE_1__["default"], {
      title: "Fecha de Creaci\xF3n",
      content: new Date(userNew.created_at).toLocaleDateString()
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserInfoGrid);

/***/ })

}]);