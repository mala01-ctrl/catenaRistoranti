import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBBtn,
  MDBIcon,
} from "mdbreact";
import { NavLink } from "react-router-dom";
import { getCurrentCustomer, logout } from "../services/authService";

class Navbar extends Component {
  state = {
    customer: {},
  };

  componentDidMount() {
    try {
      const { data: customer } = getCurrentCustomer();
      if (customer) this.setState({ customer });
    } catch (ex) {}
  }

  handleLogout = () => {
    logout();
    window.location = "/";
  };

  render() {
    const { customer } = this.state;
    return (
      <header>
        <MDBNavbar color="elegant-color-dark" dark expand="md">
          <MDBNavbarBrand>
            <strong className="white-text">Ristoranti</strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav right>
              <MDBNavItem active>
                <NavLink to="/">
                  <MDBBtn
                    color="transparent"
                    className="navbar-button"
                    style={{ color: "white" }}
                  >
                    <MDBIcon className="mr-2" icon="home" fixed />
                    Home
                  </MDBBtn>
                </NavLink>
              </MDBNavItem>
              {!customer.username && (
                <React.Fragment>
                  <MDBNavItem>
                    <NavLink to="/login">
                      <MDBBtn
                        color="transparent"
                        className="navbar-button"
                        style={{ color: "white" }}
                      >
                        <MDBIcon className="mr-2" icon="sign-in-alt" fixed />
                        Login
                      </MDBBtn>
                    </NavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <NavLink to="/registrazione">
                      <MDBBtn
                        color="transparent"
                        className="navbar-button"
                        style={{ color: "white" }}
                      >
                        <MDBIcon className="mr-2" icon="user-plus" fixed />
                        Registrati
                      </MDBBtn>
                    </NavLink>
                  </MDBNavItem>
                </React.Fragment>
              )}
              {customer.username && (
                <React.Fragment>
                  <MDBNavItem>
                    <MDBBtn
                      color="transparent"
                      className="navbar-button"
                      style={{ color: "white" }}
                      onClick={this.handleLogout}
                    >
                      <MDBIcon className="mr-2" icon="sign-out-alt" fixed />
                      Logout
                    </MDBBtn>
                  </MDBNavItem>
                  <MDBNavItem>
                    <NavLink to="/registrazione">
                      <MDBBtn
                        color="transparent"
                        className="navbar-button"
                        style={{ color: "white" }}
                      >
                        <MDBIcon className="mr-2" icon="user-alt" fixed />
                        {customer.username}
                      </MDBBtn>
                    </NavLink>
                  </MDBNavItem>
                </React.Fragment>
              )}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      </header>
    );
  }
}

export default Navbar;
