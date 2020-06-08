import React from "react";
import { TextField } from "@material-ui/core";
import { MDBBtn } from "mdbreact";

const RegisterDataCustomer = ({ data, onChange, errors, onStep }) => {
  return (
    <div className="d-flex flex-column">
      <TextField
        name="nome"
        label="Nome"
        fullWidth
        onChange={onChange}
        required={true}
        helperText={errors["nome"]}
        error={errors["nome"] ? true : false}
        value={data.nome}
      />
      <TextField
        name="cognome"
        label="Cognome"
        fullWidth
        onChange={onChange}
        required={true}
        helperText={errors["cognome"]}
        error={errors["cognome"] ? true : false}
        value={data.cognome}
      />
      <TextField
        name="username"
        label="Username"
        fullWidth
        onChange={onChange}
        required={true}
        helperText={errors["username"]}
        error={errors["username"] ? true : false}
        value={data.username}
      />
      <TextField
        name="email"
        label="Email"
        fullWidth
        onChange={onChange}
        required={true}
        helperText={errors["email"]}
        error={errors["email"] ? true : false}
        value={data.email}
      />
      <TextField
        name="cellulare"
        label="Cellulare"
        fullWidth
        onChange={onChange}
        required={true}
        helperText={errors["cellulare"]}
        error={errors["cellulare"] ? true : false}
        value={data.cellulare}
      />
      <TextField
        name="password"
        label="Password"
        fullWidth
        type="password"
        onChange={onChange}
        required={true}
        helperText={errors["password"]}
        error={errors["password"] ? true : false}
        value={data.password}
      />
      <MDBBtn
        className="rounded-pill"
        color="red darken-2"
        type="button"
        onClick={onStep}
      >
        Avanti
      </MDBBtn>
    </div>
  );
};

export default RegisterDataCustomer;
