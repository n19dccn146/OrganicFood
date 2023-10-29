import { COOKIE_KEYS } from '~/constants/cookie.constants';

export const setCookie = (cName: COOKIE_KEYS, cValue: any, exDays = 30) => {
  const d = new Date();
  d.setTime(d.getTime() + exDays * 24 * 60 * 60 * 1000);
  const expires = 'expires=' + d.toUTCString();
  document.cookie = cName + '=' + cValue + ';' + expires + ';path=/';
};

export function deleteCookie(name: COOKIE_KEYS) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export function getCookie(cName: COOKIE_KEYS) {
  const name = cName + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}
