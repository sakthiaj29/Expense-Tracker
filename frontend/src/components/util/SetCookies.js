// util/SetCookies.js
const SetCookies = (id, name) => {
  const date = new Date();
  date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days
  document.cookie = `cookieId=${id || ''}; expires=${date.toUTCString()}; path=/`;
  document.cookie = `cookieName=${name || ''}; expires=${date.toUTCString()}; path=/`;
};

export default SetCookies;
