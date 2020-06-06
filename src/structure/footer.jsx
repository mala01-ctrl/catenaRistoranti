import React from "react";
import { MDBFooter, MDBContainer } from "mdbreact";

const Footer = () => {
  return (
    <MDBFooter color="elegant-color-dark" className="font-small pt-4 mt-4">
      {" "}
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          Developed by:{" "}
          <a href="https://github.com/mala01-ctrl">L. Malavolti</a>, &copy;{" "}
          {new Date().getFullYear()} Copyright:{" "}
          <a href="https://www.mdbootstrap.com"> MDBootstrap.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default Footer;
