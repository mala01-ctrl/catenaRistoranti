import React from "react";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBBtn } from "mdbreact";
import TextField from "@material-ui/core/TextField";

const SearchRistoranti = () => {
  return (
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle>Cerca un ristorante nella tua città</MDBCardTitle>
        <TextField
          id="standard-select-currency-native"
          select
          label="Regione"
          helperText="Seleziona la tua regione"
          style={{ marginRight: 30 }}
        ></TextField>
        <TextField
          id="standard-select-currency-native"
          select
          label="Provincia"
          helperText="Seleziona la tua provincia"
          style={{ marginRight: 30 }}
        ></TextField>
        <MDBBtn color="primary">Cerca</MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
};

export default SearchRistoranti;
