export interface IResLogin {
  user: {
    role: string;
    enable: boolean;
  };
  tokens: {
    access: {
      token: string;
    };
  };
  status: any;
}
