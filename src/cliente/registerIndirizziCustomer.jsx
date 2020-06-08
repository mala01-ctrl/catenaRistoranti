import React from "react";
import { TextField, MenuItem } from "@material-ui/core";

const RegisterIndirizziCustomer = ({
  onClick,
  select,
  data,
  regioni,
  province,
  comuni,
  errors,
  onChange,
}) => {
  return (
    <div className="d-flex flex-column">
      <TextField
        select
        label="Regioni"
        onClick={onClick}
        helperText="Seleziona una regione"
        value={select.id_regione}
        name="id_regione"
        error={errors["id_regione"] ? true : false}
      >
        {regioni.map((option) => (
          <MenuItem key={option.key} value={option.key}>
            {option.value}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Province"
        onClick={onClick}
        helperText="Seleziona una provincia"
        value={select.id_provincia}
        name="id_provincia"
        disabled={select.id_regione ? false : true}
        error={errors["id_provincia"] ? true : false}
      >
        {province.map((option) => (
          <MenuItem key={option.key} value={option.key}>
            {option.value}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Comuni"
        onClick={onClick}
        helperText="Seleziona un comune"
        value={data.id_comune}
        name="id_comune"
        disabled={select.id_provincia ? false : true}
        error={errors["id_comune"] ? true : false}
      >
        {comuni.map((option) => (
          <MenuItem key={option.key} value={option.key}>
            {option.value}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        name="via"
        label="Via"
        onChange={onChange}
        value={data.via}
        helperText={errors["via"]}
        error={errors["via"] ? true : false}
      />
      <TextField
        name="num_civico"
        label="Numero civico"
        type="number"
        onChange={onChange}
        value={data.num_civico}
        helperText={errors["num_civico"]}
        error={errors["num_civico"] ? true : false}
      />
      <TextField
        name="cap"
        label="Cap"
        type="number"
        onChange={onChange}
        value={data.cap}
        helperText={errors["cap"]}
        error={errors["cap"] ? true : false}
      />
    </div>
  );
};

export default RegisterIndirizziCustomer;
