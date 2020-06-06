import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import HomeCard from "./homeCard";

class Homepage extends Component {
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
            <HomeCard
              image="https://www.peck.it/sites/default/files/image/al_peck_1_ver.jpg"
              title="Ristoranti"
              buttonText="Visita"
              link="/ristoranti"
            />
          </MDBCol>
          <MDBCol className="col-md-6 d-flex justify-content-center">
            <HomeCard
              title="I nostri piatti"
              image="https://www.trearchi.net/wp-content/uploads/2017/06/abbinamento-vino-cibo-1024x640.jpg"
              buttonText="Visualizza"
              link="/ristoranti"
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default Homepage;
