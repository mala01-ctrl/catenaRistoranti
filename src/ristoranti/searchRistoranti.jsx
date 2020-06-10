import React from "react";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBBtn } from "mdbreact";
import TextField from "@material-ui/core/TextField";
import { MenuItem } from "@material-ui/core";

const SearchRistoranti = ({
  regioni,
  province,
  onClick,
  selectedRegione,
  selectedProvincia,
  onSearch,
}) => {
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
          onClick={onClick}
          value={selectedRegione}
          name="selectedRegione"
        >
          {regioni.map((option) => (
            <MenuItem key={option.key} value={option.key}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="standard-select-currency-native"
          select
          label="Provincia"
          helperText="Seleziona la tua provincia"
          style={{ marginRight: 30 }}
          onClick={onClick}
          value={selectedProvincia}
          name="selectedProvincia"
          disabled={province.length > 0 ? false : true}
        >
          {province.map((option) => (
            <MenuItem key={option.key} value={option.key}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
        <MDBBtn
          color="primary"
          onClick={onSearch}
          disabled={selectedProvincia ? false : true}
        >
          Cerca
        </MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
};

export default SearchRistoranti;
