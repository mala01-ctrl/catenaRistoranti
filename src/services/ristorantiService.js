import http from "../services/httpService";
import config from "../config.json";

const param = "/ristoranti.php";

export function getRistoranti() {
  return http.get(config.apiEndpoint + param + "/ristoranti");
}

export function getRistoranteIndirizzoById(id) {
  return http.get(config.apiEndpoint + param + "/ristoranti/" + id);
}
