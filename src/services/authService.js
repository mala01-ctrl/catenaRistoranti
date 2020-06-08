/*import http from "../services/httpService";
import config from "../config.json";

const param = "/login.php";*/

import JwtDecode from "jwt-decode";

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
