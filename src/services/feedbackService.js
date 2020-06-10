import http from "../services/httpService";
import config from "../config.json";

const param = "/feedback.php";

export function createFeedback(data) {
  return http.post(config.apiEndpoint + param, data);
}

export function getFeedbackClient(id) {
  const jwt = localStorage.getItem("token");
  let header = {
    headers: { Authorization: `Bearer ${jwt}` },
  };
  return http.get(config.apiEndpoint + param + "/ristorante/" + id, header);
}

export function getAllFeedBackById(id) {
  return http.get(config.apiEndpoint + param + "/feedback/" + id);
}
