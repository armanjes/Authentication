export default class ApiResponse {
  constructor(data = null, message = "", ok = true) {
    this.ok = ok;
    this.message = message;
    this.data = data;
  }
}
