import http from "../services/httpService";
import config from "../config.json";

const param = "/registrazione.php";

export function register(data) {
  return http.post(config.apiEndpoint + param, data);
}
