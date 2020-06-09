import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import PanelRistorante from "./panelRistorante";
import { getRistoranteIndirizzoById } from "../services/ristorantiService";
import ModalFeedBack from "./modalFeedback";
import { getCurrentCustomer } from "../services/authService";
import validate from "validate.js";
import { createFeedback } from "../services/feedbackService";

class Ristorante extends Component {
  state = {
    ristorante: {},
    feedback: {
      commento: "",
      numeroStelle: 0,
      idCliente: "",
      idRistorante: "",
      dataVisita: "",
      titolo: "",
    },
    errors: {},
    open: false,
    rating: 0,
  };

  constraints = {
    numeroStelle: {
      presence: { allowEmpty: false },
    },
    titolo: {
      presence: { allowEmpty: false },
    },
    dataVisita: {
      presence: { allowEmpty: false },
    },
  };

  async componentDidMount() {
    try {
      const id = this.props.match.params.id;
      const { data: ristorante } = await getRistoranteIndirizzoById(id);
      this.setState({ ristorante });
      const { data: customer } = getCurrentCustomer();
      const { feedback } = this.state;
      feedback.idCliente = customer.id_cliente;
      feedback.idRistorante = this.props.match.params.id;
      this.setState({ feedback });
    } catch (ex) {}
  }

  handleToggle = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  handleChangeRating = (newRating) => {
    const { feedback } = this.state;
    feedback.numeroStelle = newRating;
    this.setState({ feedback });
  };

  handleChangeText = ({ target: input }) => {
    const { feedback } = this.state;
    feedback[input.name] = input.value;
    const errors = { ...this.state.errors };
    const errorMessage = this.handleError(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    this.setState({ feedback, errors });
  };

  handleError = ({ name, value }) => {
    validate.validators.presence.message = "Campo obbligatorio";
    const error = validate.single(value, this.constraints[name]);
    return error ? error[0] : null;
  };

  validate = () => {
    validate.validators.presence.message = "Campo obbligatorio";
    const error = validate(this.state.feedback, this.constraints, {
      fullMessages: false,
    });
    if (!error) {
      return;
    }
    const errors = [];
    Object.keys(error).map((item) => (errors[item] = error[item][0]));
    return errors;
  };

  doSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    if (errors) {
      this.setState({ errors });
      return;
    }
    try {
      const { data } = createFeedback(this.state.feedback);
      console.log(data);
      const { open } = this.state;
      this.setState({ open: !open });
    } catch (ex) {}
  };

  render() {
    const { ristorante, open, feedback, errors } = this.state;
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
              starsSelected={feedback.numeroStelle}
              onRating={this.handleChangeRating}
              onChangeText={this.handleChangeText}
              errors={errors}
              onSubmit={this.doSubmit}
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default Ristorante;
