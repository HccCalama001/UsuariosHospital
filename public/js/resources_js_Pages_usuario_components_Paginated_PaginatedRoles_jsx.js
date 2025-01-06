"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_usuario_components_Paginated_PaginatedRoles_jsx"],{

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

/***/ }),

/***/ "./resources/js/Pages/usuario/components/Paginated/PaginatedRoles.jsx":
/*!****************************************************************************!*\
  !*** ./resources/js/Pages/usuario/components/Paginated/PaginatedRoles.jsx ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Card_CardRoleWeb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Card/CardRoleWeb */ "./resources/js/Pages/usuario/components/Card/CardRoleWeb.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }



var PaginatedRoles = function PaginatedRoles(_ref) {
  var gruposWeb = _ref.gruposWeb;
  // Estado para la página actual
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1),
    _useState2 = _slicedToArray(_useState, 2),
    currentPage = _useState2[0],
    setCurrentPage = _useState2[1];

  // Número de elementos por página
  var itemsPerPage = 6;

  // Calcular los índices para la paginación
  var indexOfLastItem = currentPage * itemsPerPage;
  var indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Obtener los elementos de la página actual
  var paginatedGroups = gruposWeb.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular el número total de páginas
  var totalPages = Math.ceil(gruposWeb.length / itemsPerPage);

  // Función para cambiar de página
  var handlePageChange = function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("section", {
    children: gruposWeb.length > 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
        children: paginatedGroups.map(function (grupo, index) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Card_CardRoleWeb__WEBPACK_IMPORTED_MODULE_1__["default"], {
            gruposWeb: grupo
          }, index);
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "flex justify-center items-center mt-6 space-x-2",
        children: Array.from({
          length: totalPages
        }, function (_, idx) {
          var pageNum = idx + 1;
          var isActive = currentPage === pageNum;
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("button", {
            onClick: function onClick() {
              return handlePageChange(pageNum);
            },
            "aria-label": "Ir a la p\xE1gina ".concat(pageNum),
            className: "px-4 py-2 border rounded \n                    transition-colors duration-150 focus:outline-none\n                    ".concat(isActive ? "bg-teal-600 text-white border-teal-600" : "bg-gray-200 text-gray-800 hover:bg-gray-300"),
            children: pageNum
          }, pageNum);
        })
      })]
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
      className: "text-gray-500 italic",
      children: "No hay roles ni sistemas asociados."
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PaginatedRoles);

/***/ })

}]);