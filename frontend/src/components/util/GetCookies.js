// util/GetCookies.js
const GetCookies = (key) => {
    const cookieArray = document.cookie.split(';');
    const cookieName = `${key}=`;
    for (let cookie of cookieArray) {
      cookie = cookie.trim();
      if (cookie.startsWith(cookieName)) {
        return cookie.substring(cookieName.length);
      }
    }
    return '';
  };
  
  export default GetCookies;
  