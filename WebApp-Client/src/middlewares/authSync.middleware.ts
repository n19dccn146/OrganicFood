import React from 'react';
import { COOKIE_KEYS } from '~/constants/cookie.constants';
import { getCookie } from '~/helpers/cookie.helper';
import useAuth from '~/stores/auth';

export default function AuthSync({ children }: any) {
  const [, { requestProfile }] = useAuth();

  React.useEffect(() => {
    const token = getCookie(COOKIE_KEYS.ACCESS_TOKEN);
    if (token) {
      requestProfile();
    }
  }, []);

  return children;
}
