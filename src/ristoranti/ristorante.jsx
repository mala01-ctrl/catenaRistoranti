import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import PanelRistorante from "./panelRistorante";
import { getRistoranteIndirizzoById } from "../services/ristorantiService";
import ModalFeedBack from "./modalFeedback";
import { getCurrentCustomer } from "../services/authService";
import validate from "validate.js";
import {
  createFeedback,
  getFeedbackClient,
  getAllFeedBackById,
} from "../services/feedbackService";
import Feedback from "./feedback";

class Ristorante extends Component {
  state = {
    ristorante: {},
    feedback: {
      id_feedback: 0,
      commento: "",
      numeroStelle: 0,
      idCliente: "",
      idRistorante: "",
      dataVisita: "",
      titolo: "",
    },
    allFeedback: [],
    filteredFeedback: [],
    errors: {},
    username: "",
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
      const { data: allFeedback } = await getAllFeedBackById(id);
      this.setState({ allFeedback, filteredFeedback: allFeedback });
      this.renderFeedback(id);
    } catch (ex) {}
  }

  renderFeedback = async (id) => {
    const { data: feedback } = await getFeedbackClient(id);
    const { data: customer } = await getCurrentCustomer();
    this.setState({ username: customer.username });
    if (feedback) this.setState({ feedback });
    if (feedback.id_feedback > 0) this.filterAllFeedback();
    else {
      const { feedback } = this.state;
      feedback.idCliente = customer.id_cliente;
      feedback.idRistorante = this.props.match.params.id;
      this.setState({ feedback, username: customer.username });
    }
  };

  filterAllFeedback = () => {
    const { allFeedback, username } = this.state;
    const filteredFeedback = allFeedback.filter((f) => f.username !== username);
    this.setState({ filteredFeedback });
  };

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

  doSubmit = async (e) => {
    e.preventDefault();
    const errors = this.validate();
    if (errors) {
      this.setState({ errors });
      return;
    }
    try {
      const { data: message } = await createFeedback(this.state.feedback);
      const { feedback } = this.state;
      feedback.id_feedback = message.id;
      const { open } = this.state;
      this.setState({ open: !open, feedback });
    } catch (ex) {}
  };

  render() {
    const {
      ristorante,
      open,
      feedback,
      errors,
      allFeedback,
      username,
      filteredFeedback,
    } = this.state;
    return (
      <MDBContainer className="container">
        <MDBRow left style={{ height: "30%" }} className="align-items-center">
          <MDBCol className="col-md-6 d-flex justify-content-center">
            <PanelRistorante
              ristorante={ristorante}
              onToggle={this.handleToggle}
              feedback={feedback.id_feedback}
            />
          </MDBCol>
          <MDBCol
            center
            style={{ height: "30%" }}
            className="align-items-center"
          >
            {feedback.id_feedback > 0 ? (
              <Feedback
                titolo={feedback.titolo}
                numeroStelle={feedback.numeroStelle}
                commento={feedback.commento}
                dataVisita={feedback.dataVisita}
                username={username}
              />
            ) : (
              <p></p>
            )}
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol
            center
            style={{ height: "30%" }}
            className="align-items-center"
          >
            {allFeedback.length > 0 ? (
              <div>
                <h3>Numero totale di feedback: ({allFeedback.length})</h3>
                {filteredFeedback.map((f) => (
                  <Feedback
                    titolo={f.titolo}
                    numeroStelle={f.numeroStelle}
                    commento={f.commento}
                    dataVisita={f.dataVisita}
                    username={f.username}
                  />
                ))}
              </div>
            ) : (
              <h3>Non ci sono ancora feedback</h3>
            )}
          </MDBCol>
        </MDBRow>
        <ModalFeedBack
          open={open}
          onToggle={this.handleToggle}
          starsSelected={feedback.numeroStelle}
          onRating={this.handleChangeRating}
          onChangeText={this.handleChangeText}
          errors={errors}
          onSubmit={this.doSubmit}
          username={username}
        />
      </MDBContainer>
    );
  }
}

export default Ristorante;
