export interface ApiResponse<T = any> {
  status:  boolean;
  data:    T;
  message: string;
}
