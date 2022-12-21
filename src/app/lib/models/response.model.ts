export default interface Response<T> {
  data?: unknown | T;
  token?: string;
}
