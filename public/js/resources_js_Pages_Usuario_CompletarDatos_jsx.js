"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_usuario_CompletarDatos_jsx"],{

/***/ "./resources/js/Pages/usuario/CompletarDatos.jsx":
/*!*******************************************************!*\
  !*** ./resources/js/Pages/usuario/CompletarDatos.jsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _inertiajs_inertia_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @inertiajs/inertia-react */ "./node_modules/@inertiajs/inertia-react/dist/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



var CompletarDatos = function CompletarDatos(_ref) {
  var _userLogin$segu_usuar, _userLogin$segu_usuar2, _userLogin$segu_usuar3, _userLogin$segu_usuar4, _userLogin$segu_usuar5, _userLogin$segu_usuar6;
  var userLogin = _ref.userLogin,
    current_password = _ref.current_password;
  var _useForm = (0,_inertiajs_inertia_react__WEBPACK_IMPORTED_MODULE_1__.useForm)({
      name: (userLogin === null || userLogin === void 0 || (_userLogin$segu_usuar = userLogin.segu_usuario) === null || _userLogin$segu_usuar === void 0 ? void 0 : _userLogin$segu_usuar.Segu_Usr_Nombre) || "",
      apellido_paterno: (userLogin === null || userLogin === void 0 || (_userLogin$segu_usuar2 = userLogin.segu_usuario) === null || _userLogin$segu_usuar2 === void 0 ? void 0 : _userLogin$segu_usuar2.Segu_Usr_ApellidoPaterno) || "",
      apellido_materno: (userLogin === null || userLogin === void 0 || (_userLogin$segu_usuar3 = userLogin.segu_usuario) === null || _userLogin$segu_usuar3 === void 0 ? void 0 : _userLogin$segu_usuar3.Segu_Usr_ApellidoMaterno) || "",
      rut: (userLogin === null || userLogin === void 0 || (_userLogin$segu_usuar4 = userLogin.segu_usuario) === null || _userLogin$segu_usuar4 === void 0 ? void 0 : _userLogin$segu_usuar4.Segu_Usr_RUT) || "",
      email: (userLogin === null || userLogin === void 0 || (_userLogin$segu_usuar5 = userLogin.segu_usuario) === null || _userLogin$segu_usuar5 === void 0 ? void 0 : _userLogin$segu_usuar5.email) || "",
      phone: (userLogin === null || userLogin === void 0 || (_userLogin$segu_usuar6 = userLogin.segu_usuario) === null || _userLogin$segu_usuar6 === void 0 ? void 0 : _userLogin$segu_usuar6.phone) || "",
      current_password: current_password || "",
      userLogin: userLogin.name || "" || ""
    }),
    data = _useForm.data,
    setData = _useForm.setData,
    post = _useForm.post,
    errors = _useForm.errors;
  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    post("/guardar-datos");
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    className: "relative flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-emerald-500 to-green-600",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "absolute inset-0 bg-opacity-20 bg-white mix-blend-overlay"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "relative w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8 z-10",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h1", {
        className: "text-3xl font-extrabold text-center mb-4 text-emerald-700",
        children: "Completar Datos Faltantes"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "text-center text-gray-600 mb-6",
        children: "Por favor, completa los campos requeridos para continuar."
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("form", {
        onSubmit: handleSubmit,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          className: "mb-6",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
            htmlFor: "name",
            className: "block text-gray-700 font-medium mb-2",
            children: "Nombre"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
            type: "text",
            id: "name",
            value: data.name,
            onChange: function onChange(e) {
              return setData("name", e.target.value);
            },
            className: "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ".concat(errors.name ? "border-red-500" : ""),
            placeholder: "Ingresa tu nombre"
          }), errors.name && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
            className: "text-red-500 text-sm mt-1",
            children: errors.name
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          className: "mb-6",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
            htmlFor: "apellido_paterno",
            className: "block text-gray-700 font-medium mb-2",
            children: "Apellido Paterno"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
            type: "text",
            id: "apellido_paterno",
            value: data.apellido_paterno,
            onChange: function onChange(e) {
              return setData("apellido_paterno", e.target.value);
            },
            className: "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ".concat(errors.apellido_paterno ? "border-red-500" : ""),
            placeholder: "Ingresa tu apellido paterno"
          }), errors.apellido_paterno && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
            className: "text-red-500 text-sm mt-1",
            children: errors.apellido_paterno
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          className: "mb-6",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
            htmlFor: "apellido_materno",
            className: "block text-gray-700 font-medium mb-2",
            children: "Apellido Materno"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
            type: "text",
            id: "apellido_materno",
            value: data.apellido_materno,
            onChange: function onChange(e) {
              return setData("apellido_materno", e.target.value);
            },
            className: "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ".concat(errors.apellido_materno ? "border-red-500" : ""),
            placeholder: "Ingresa tu apellido materno"
          }), errors.apellido_materno && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
            className: "text-red-500 text-sm mt-1",
            children: errors.apellido_materno
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          className: "mb-6",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
            htmlFor: "rut",
            className: "block text-gray-700 font-medium mb-2",
            children: "RUT"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
            type: "text",
            id: "rut",
            value: data.rut,
            onChange: function onChange(e) {
              return setData("rut", e.target.value);
            },
            className: "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ".concat(errors.rut ? "border-red-500" : ""),
            placeholder: "Ingresa tu RUT"
          }), errors.rut && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
            className: "text-red-500 text-sm mt-1",
            children: errors.rut
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          className: "mb-6",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
            htmlFor: "email",
            className: "block text-gray-700 font-medium mb-2",
            children: "Correo Electr\xF3nico"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
            type: "email",
            id: "email",
            value: data.email,
            onChange: function onChange(e) {
              return setData("email", e.target.value);
            },
            className: "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ".concat(errors.email ? "border-red-500" : ""),
            placeholder: "Ingresa tu correo electr\xF3nico"
          }), errors.email && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
            className: "text-red-500 text-sm mt-1",
            children: errors.email
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          className: "mb-6",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
            htmlFor: "phone",
            className: "block text-gray-700 font-medium mb-2",
            children: "N\xFAmero de Tel\xE9fono"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
            type: "text",
            id: "phone",
            value: data.phone,
            onChange: function onChange(e) {
              return setData("phone", e.target.value);
            },
            className: "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ".concat(errors.phone ? "border-red-500" : ""),
            placeholder: "Ingresa tu n\xFAmero de tel\xE9fono"
          }), errors.phone && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
            className: "text-red-500 text-sm mt-1",
            children: errors.phone
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
          type: "hidden",
          id: "current_password",
          value: data.current_password,
          onChange: function onChange(e) {
            return setData("current_password", e.target.value);
          }
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("button", {
            type: "submit",
            className: "w-full bg-emerald-600 text-white font-medium py-2 rounded-lg hover:bg-emerald-700 transition duration-200 shadow-md",
            children: "Guardar"
          })
        })]
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CompletarDatos);

/***/ })

}]);