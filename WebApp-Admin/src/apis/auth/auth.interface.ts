export interface IReqLogin {
  username: string;
  password: Number;
}

export interface IReqRefreshToken {
  token: string;
}
export interface IReqRegiser {
  email: string;
  phone: string;
  password: string;
  name: String;
  role: string;
  isEmailVerified: boolean;
  favorite: Record<string, string>;
  chats: string[];
  rate_waits: string[];
  bills: string[];
  warning: string[];
  cart: string[];
  notifications: string[];
  gender?: string;
  birth?: string;
}
