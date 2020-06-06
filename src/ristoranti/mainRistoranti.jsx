import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import SearchRistoranti from "./searchRistoranti";

class MainRistoranti extends Component {
  state = {};
  render() {
    return (
      <MDBContainer className="container">
        <MDBRow
          center
          style={{ height: "100%" }}
          className="align-items-center"
        >
          <MDBCol className="col-md-6 d-flex justify-content-center">
            <SearchRistoranti />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default MainRistoranti;
