interface ResponseInstant {
  message: string;
  error: boolean;
  //   code?: number;
}
export interface ReturnResponse<T> extends ResponseInstant {
  data: T;
}

export interface ReturnListResponse<T> extends ResponseInstant {
  data: Array<T>;
}
