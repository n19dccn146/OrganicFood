interface ResponseInstant {
  msg: string;
  statusCode: number;
  error: boolean;
  failure: Array<any>;
}

export interface ReturnReponse<T> extends ResponseInstant {
  [x: string]: any;
  is_percent: any;
  is_ship: any;
  enable(enable: any): unknown;
  data: T;
}

export interface ReturnListReponse<T> extends ResponseInstant {
  data: Array<T>;
}

export interface ReturnDataReponse<T> {
  res: object;
  statusCode: number;
  message: string;
  data: T;
}
