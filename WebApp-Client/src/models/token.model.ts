export interface TOKEN_MODEL {
  token: string;
  expires: string;
}

export interface ACCESS_REFRESH_TOKEN {
  access: TOKEN_MODEL;
  refresh: TOKEN_MODEL;
}
