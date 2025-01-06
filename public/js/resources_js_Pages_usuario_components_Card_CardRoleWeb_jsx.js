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
  var Url = gruposWeb.Url,
    NombreGrupo = gruposWeb.NombreGrupo,
    imagen = gruposWeb.imagen,
    GrupoID = gruposWeb.GrupoID;
  var handleOpenSystem = function handleOpenSystem() {
    if (Url && Url !== "No Aplica" && Url !== "Desconocido") {
      window.open(Url, "_blank", "noopener,noreferrer");
    } else {
      console.log("La URL no es válida o no se puede aplicar.");
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: "\r flex flex-col items-center justify-between\r bg-white border border-gray-200 rounded-lg shadow-md\r hover:shadow-lg transition-shadow\r w-full max-w-xs sm:max-w-sm\r mx-auto               /* Esto centra la tarjeta horizontalmente */\r p-4                   /* Ajustamos el padding para que sea algo menor */\r h-[300px]            /* Reducimos la altura total */\r ",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "w-full text-sm text-gray-600",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
        className: "font-bold",
        children: "ID Sistema:"
      }), " ", GrupoID]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "flex justify-center my-4",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "w-24 h-24 overflow-hidden rounded-full shadow-md",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
          src: imagen || "/images/default.png",
          alt: NombreGrupo || "Imagen del sistema",
          className: "w-full h-full object-cover"
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("h3", {
      className: "text-lg font-semibold text-teal-800 text-center mb-2",
      children: ["Sistema: ", NombreGrupo]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
      onClick: handleOpenSystem,
      className: "\r w-full bg-teal-600 text-white py-2 px-4 rounded-lg\r hover:bg-teal-700 transition-colors\r ",
      children: "Dirigirse a Sistema"
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CardRoleWeb);

/***/ })

}]);