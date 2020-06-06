import React from "react";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBBtn,
} from "mdbreact";
import { NavLink } from "react-router-dom";

const HomeCard = ({ image, title, buttonText, link }) => {
  return (
    <MDBCard style={{ width: "22rem" }}>
      <MDBCardImage
        className="img-fluid"
        src={image}
        waves
        style={{ width: 352, height: 200 }}
      />
      <MDBCardBody>
        <MDBCardTitle>{title}</MDBCardTitle>
        <NavLink to={link}>
          <MDBBtn style={{ borderRadius: 12 }} color="danger">
            {buttonText}
          </MDBBtn>
        </NavLink>
      </MDBCardBody>
    </MDBCard>
  );
};

export default HomeCard;
