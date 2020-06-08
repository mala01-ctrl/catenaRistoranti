import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import PanelRistorante from "./panelRistorante";
import { getRistoranteIndirizzoById } from "../services/ristorantiService";
import ModalFeedBack from "./modalFeedback";

class Ristorante extends Component {
  state = {
    ristorante: {},
    open: false,
    starsSelected: 0,
    rating: 0,
  };

  async componentDidMount() {
    try {
      const id = this.props.match.params.id;
      const { data: ristorante } = await getRistoranteIndirizzoById(id);
      this.setState({ ristorante });
    } catch (ex) {}
  }

  handleToggle = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  handleChangeRating = (newRating) => {
    this.setState({
      starsSelected: newRating,
    });
  };

  render() {
    const { ristorante, open, starsSelected } = this.state;
    return (
      <MDBContainer className="container">
        <MDBRow left style={{ height: "30%" }} className="align-items-center">
          <MDBCol className="col-md-6 d-flex justify-content-center">
            <PanelRistorante
              ristorante={ristorante}
              onToggle={this.handleToggle}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol className="col-md-6 d-flex justify-content-center">
            <ModalFeedBack
              open={open}
              onToggle={this.handleToggle}
              starsSelected={starsSelected}
              onRating={this.handleChangeRating}
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default Ristorante;
