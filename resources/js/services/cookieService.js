// cookieService.js
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null; // Retornar null si no existe la cookie
};

export default getCookie;
