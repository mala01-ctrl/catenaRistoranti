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
import { TextField } from "@material-ui/core";
import validate from "validate.js";
import { login, loginWithJwt } from "../services/authService";

class LoginCustomer extends Component {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };

  constraints = {
    username: {
      presence: { allowEmpty: false },
    },
    password: {
      presence: { allowEmpty: false },
    },
  };

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
    const error = validate.single(value, this.constraints[name]);
    return error ? error[0] : null;
  };

  validate = () => {
    validate.validators.presence.message = "Campo obbligatorio";
    const error = validate(this.state.data, this.constraints, {
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
      const { data } = this.state;
      const { data: jwt } = await login(data);
      if (typeof jwt === "string") {
        loginWithJwt(jwt);
        window.location = "/";
      }
    } catch (ex) {}
  };

  render() {
    const { data, errors } = this.state;
    return (
      <MDBContainer className="container">
        <MDBRow
          center
          style={{ height: "100%" }}
          className="align-items-center"
        >
          <MDBCol className="col-md-6 d-flex justify-content-center">
            <MDBCard style={{ width: "70%", marginBottom: 10 }}>
              <MDBCardBody>
                <MDBCardTitle>
                  <MDBIcon icon="user-circle" size="2x" />
                  <p>Login</p>
                </MDBCardTitle>
                <form onSubmit={this.doSubmit}>
                  <div className="d-flex flex-column">
                    <TextField
                      label="Username"
                      name="username"
                      value={data.username}
                      variant="outlined"
                      onChange={this.handleChange}
                      error={errors["username"] ? true : false}
                      helperText={errors["username"]}
                    />
                    <TextField
                      label="Password"
                      name="password"
                      value={data.password}
                      type="password"
                      variant="outlined"
                      onChange={this.handleChange}
                      error={errors["password"] ? true : false}
                      helperText={errors["password"]}
                      style={{ marginTop: 20 }}
                    />
                  </div>
                  <MDBBtn
                    className="rounded-pill"
                    color="red darken-2"
                    type="submit"
                    style={{ marginTop: 20 }}
                  >
                    Login
                  </MDBBtn>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default LoginCustomer;
