import { createStore, createHook } from 'react-sweet-state';
import { USER_MODEL } from '~/models/user.model';
import {
  setSignedIn,
  setProfile,
  requestProfile,
  logout,
  setFavoriteProducts,
} from './auth.action';

export type State = {
  signedIn: boolean;
  userInfo?: USER_MODEL;
};

const initialState: State = {
  signedIn: false,
  userInfo: null,
};

export const AuthStore = createStore({
  initialState,
  actions: {
    setSignedIn,
    setProfile,
    requestProfile,
    logout,
    setFavoriteProducts,
  },
  name: 'auth',
});

const useAuth = createHook(AuthStore);
export default useAuth;
