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

class Navbar extends Component {
  state = {};

  render() {
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
              <MDBNavItem>
                <MDBBtn
                  color="transparent"
                  className="navbar-button"
                  style={{ color: "white" }}
                >
                  <MDBIcon className="mr-2" icon="sign-in-alt" fixed />
                  Login
                </MDBBtn>
              </MDBNavItem>
              <MDBNavItem>
                <MDBBtn
                  color="transparent"
                  className="navbar-button"
                  style={{ color: "white" }}
                >
                  <MDBIcon className="mr-2" icon="user-plus" fixed />
                  Registrati
                </MDBBtn>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      </header>
    );
  }
}

export default Navbar;
