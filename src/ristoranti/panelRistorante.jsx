import React from "react";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBBtn } from "mdbreact";

const PanelRistorante = ({ ristorante, onToggle, feedback, username }) => {
  console.log(feedback);
  return (
    <MDBCard>
      <MDBCardBody style={{ textAlign: "center" }}>
        <MDBCardTitle style={{ textAlign: "left" }}>
          {ristorante.nome}
        </MDBCardTitle>
        <MDBCardTitle
          tag="h6"
          sub
          className="mb-2 text-muted"
          style={{ textAlign: "left" }}
        >
          Via {ristorante.via}, {ristorante.num_civico}, {ristorante.cap},{" "}
          {ristorante.provincia}
        </MDBCardTitle>
        <MDBBtn>Visualizza menu</MDBBtn>
        {feedback === 0 && username ? (
          <MDBBtn onClick={onToggle}>Lascia un feedback</MDBBtn>
        ) : (
          <p></p>
        )}
      </MDBCardBody>
    </MDBCard>
  );
};

export default PanelRistorante;
