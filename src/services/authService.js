import http from "../services/httpService";
import config from "../config.json";
import JwtDecode from "jwt-decode";

const param = "/login.php";

export function login(data) {
  return http.post(config.apiEndpoint + param, data);
}

export function loginWithJwt(jwt) {
  localStorage.setItem("token", jwt);
}

export function getCurrentCustomer(decode = true) {
  try {
    const jwt = localStorage.getItem("token");

    return decode ? JwtDecode(jwt) : jwt;
  } catch (ex) {
    return null;
  }
}

export function logout() {
  localStorage.removeItem("token");
}
