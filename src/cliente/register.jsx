import React, { Component } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBIcon,
  MDBBtn,
} from "mdbreact";
import StepperForm from "./stepperForm";
import RegisterDataCustomer from "./registerDataCustomer";
import validate from "validate.js";
import {
  getRegioni,
  getProvince,
  getComuni,
} from "../services/indirizziService";
import RegisterIndirizziCustomer from "./registerIndirizziCustomer";
import { register } from "../services/registerCustomer";
import { loginWithJwt } from "../services/authService";

class Register extends Component {
  state = {
    activeStep: 0,
    data: {
      nome: "",
      cognome: "",
      email: "",
      cellulare: "",
      id_comune: "",
      username: "",
      password: "",
      via: "",
      cap: "",
      num_civico: "",
    },
    select: {
      id_regione: "",
      id_provincia: "",
    },
    regioni: [],
    province: [],
    filteredComuni: [],
    filteredProvince: [],
    comuni: [],
    errors: {},
  };

  constraints = {
    nome: {
      presence: { allowEmpty: false },
    },
    cognome: {
      presence: { allowEmpty: false },
    },
    cellulare: {
      presence: { allowEmpty: false },
      numericality: {
        onlyInteger: true,
        notValid: "Cellulare è un campo numerico",
      },
      length: { is: 10, message: "Cellulare deve avere almeno 10 numeri" },
    },
    username: {
      presence: { allowEmpty: false },
    },
    email: {
      presence: { allowEmpty: false },
      email: {
        message: "Formato non valido",
      },
    },
    password: {
      presence: { allowEmpty: false },
    },
  };

  indirizziConstraints = {
    id_regione: {
      presence: { allowEmpty: false },
    },
    id_provincia: {
      presence: { allowEmpty: false },
    },
    id_comune: {
      presence: { allowEmpty: false },
    },
    via: {
      presence: { allowEmpty: false },
    },
    num_civico: {
      presence: { allowEmpty: false },
    },
    cap: {
      presence: { allowEmpty: false },
    },
  };

  async componentDidMount() {
    try {
      const regioni = await getRegioni();
      console.log(regioni);
      const province = await getProvince();
      const comuni = await getComuni();
      this.setState({ regioni, province, comuni });
    } catch (ex) {}
  }

  handleChange = ({ target: input }) => {
    const { data } = this.state;
    data[input.name] = input.value;
    const errors = { ...this.state.errors };
    const errorMessage = this.handleError(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    this.setState({ data, errors });
  };

  handleError = ({ name, value }) => {
    validate.validators.presence.message = "Campo obbligatorio";
    let error;
    if (this.state.activeStep === 0)
      error = validate.single(value, this.constraints[name]);
    else error = validate.single(value, this.indirizziConstraints[name]);
    return error ? error[0] : null;
  };

  validate = () => {
    validate.validators.presence.message = "Campo obbligatorio";
    let error;
    if (this.state.activeStep === 0) {
      error = validate(this.state.data, this.constraints, {
        fullMessages: false,
      });
    } else {
      error = validate(this.createValueToControl(), this.indirizziConstraints, {
        fullMessages: false,
      });
    }
    if (!error) {
      return;
    }
    const errors = [];
    Object.keys(error).map((item) => (errors[item] = error[item][0]));
    return errors;
  };

  handleStep = () => {
    const errors = this.validate();
    if (errors) {
      this.setState({ errors });
      return;
    }
    this.setState({ activeStep: 1 });
  };

  handleSelect = (e) => {
    const { target: input } = e;
    const { data } = this.state;
    if (input.name !== "id_comune") {
      const select = { ...this.state.select };
      select[input.name] = input.value;
      const errors = { ...this.state.errors };
      const errorMessage = this.handleError(input);
      if (errorMessage) errors[input.name] = errorMessage;
      else delete errors[input.name];
      this.setState({ select, errors }, () => {
        if (input.name === "id_regione") {
          this.filterProvince();
          data["id_comune"] = "";
          this.setState({ filteredComuni: [], data });
        } else {
          this.filterComuni();
          data["id_comune"] = "";
          this.setState({ data });
        }
      });
    } else {
      this.handleChange(e);
    }
  };

  filterProvince = () => {
    const { province } = this.state;
    const select = { ...this.state.select };
    select.id_provincia = "";
    if (select.id_regione) {
      const filteredProvince = province.filter(
        (p) => p.idRegione === select.id_regione
      );
      this.setState({ filteredProvince, select });
    }
  };

  filterComuni = () => {
    const { comuni } = this.state;
    const { id_provincia } = this.state.select;
    if (id_provincia) {
      const filteredComuni = comuni.filter(
        (c) => c.idProvincia === id_provincia
      );
      this.setState({ filteredComuni });
    }
  };

  createValueToControl = () => {
    const { data, select } = this.state;
    return {
      id_regione: select.id_regione,
      id_provincia: select.id_provincia,
      id_comune: data.id_comune,
      via: data.via,
      cap: data.cap,
      num_civico: data.num_civico,
    };
  };

  handleBack = () => {
    this.setState({ activeStep: 0 });
  };

  doSubmit = async (e) => {
    e.preventDefault();
    const errors = this.validate();
    if (errors) {
      this.setState({ errors });
      return;
    }
    try {
      const { data } = this.state;
      const { data: jwt } = await register(data);
      if (typeof jwt === "string") {
        loginWithJwt(jwt);
        window.location = "/home";
      } else return;
    } catch (ex) {}
  };

  render() {
    const {
      activeStep,
      data,
      errors,
      select,
      regioni,
      filteredProvince,
      filteredComuni,
    } = this.state;
    return (
      <MDBContainer className="container">
        <MDBRow
          center
          style={{ height: "100%" }}
          className="align-items-center"
        >
          <MDBCol className="col-md-8 d-flex justify-content-center">
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>
                  <MDBIcon icon="user-circle" size="2x" />
                  <p>Registrazione</p>
                </MDBCardTitle>
                <StepperForm step={activeStep} />
                <form onSubmit={this.doSubmit}>
                  {activeStep === 0 ? (
                    <RegisterDataCustomer
                      data={data}
                      onChange={this.handleChange}
                      onStep={this.handleStep}
                      errors={errors}
                    />
                  ) : (
                    <div>
                      <RegisterIndirizziCustomer
                        select={select}
                        data={data}
                        regioni={regioni}
                        province={filteredProvince}
                        comuni={filteredComuni}
                        errors={errors}
                        onClick={this.handleSelect}
                        onChange={this.handleChange}
                      />
                      <MDBBtn
                        className="rounded-pill"
                        color="yellow darken-2"
                        type="submit"
                        onClick={this.handleBack}
                      >
                        Annulla
                      </MDBBtn>
                      <MDBBtn
                        className="rounded-pill"
                        color="red darken-2"
                        type="submit"
                      >
                        Invia
                      </MDBBtn>
                    </div>
                  )}
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default Register;
