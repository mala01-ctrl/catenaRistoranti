import http from "../services/httpService";
import config from "../config.json";

const param = "/indirizzo.php";

export async function getRegioni() {
  const { data } = await http.get(config.apiEndpoint + param + "/regione");
  const regioni = data.map((r) => {
    return { value: r.nome, key: r.id_regione };
  });
  return regioni;
}

export async function getProvince() {
  const { data } = await http.get(config.apiEndpoint + param + "/provincia");
  const province = data.map((p) => {
    return { value: p.nome, key: p.id_provincia, idRegione: p.idRegione };
  });
  return province;
}

export async function getComuni() {
  const { data } = await http.get(config.apiEndpoint + param + "/comune");
  const comuni = data.map((c) => {
    return { value: c.nome, key: c.id_comune, idProvincia: c.idProvincia };
  });
  return comuni;
}
