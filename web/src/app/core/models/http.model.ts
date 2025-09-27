export interface APIResponse<T = any> {
  message: string;
  data: T;
}
