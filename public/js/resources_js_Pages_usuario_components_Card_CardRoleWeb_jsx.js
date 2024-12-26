"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_usuario_components_Card_CardRoleWeb_jsx"],{

/***/ "./resources/js/Pages/usuario/components/Card/CardRoleWeb.jsx":
/*!********************************************************************!*\
  !*** ./resources/js/Pages/usuario/components/Card/CardRoleWeb.jsx ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");


var CardRoleWeb = function CardRoleWeb(_ref) {
  var gruposWeb = _ref.gruposWeb;
  var handleButtonClick = function handleButtonClick() {
    // Si la URL no es "Desconocido" o "No Aplica", redirigimos
    if (gruposWeb.Url && gruposWeb.Url !== "No Aplica" && gruposWeb.Url !== "Desconocido") {
      // Abre la URL en otra pestaña/ventana
      window.open(gruposWeb.Url, "_blank");
    } else {
      console.log("La URL no es válida o no se puede aplicar.");
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: "bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("h3", {
      className: "text-lg font-semibold text-teal-800 mb-2",
      children: ["Sistema: ", gruposWeb.NombreGrupo]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "text-sm text-gray-600 mb-4",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("p", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
          className: "font-bold",
          children: "ID Sistema:"
        }), " ", gruposWeb.NombreGrupo]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
      className: "w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors",
      onClick: handleButtonClick,
      children: "Dirigirse a Sistema"
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CardRoleWeb);

/***/ })

}]);