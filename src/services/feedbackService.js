import http from "../services/httpService";
import config from "../config.json";

const param = "/feedback.php";

export function createFeedback(data) {
  return http.post(config.apiEndpoint + param, data);
}
