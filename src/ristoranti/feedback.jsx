import React from "react";
import { MDBIcon, MDBRow } from "mdbreact";
import StarRatings from "react-star-ratings";

const Feedback = ({ titolo, numeroStelle, commento, dataVisita, username }) => {
  return (
    <React.Fragment>
      <div className="added-text" style={{ textAlign: "left" }}>
        <h4>{titolo}</h4>
      </div>
      <MDBRow>
        <div className="mdb-feed">
          <div className="news">
            <div className="label">
              <MDBIcon icon="user-circle" size="2x" />
              {username}
            </div>
            <div className="added-text">
              <StarRatings
                rating={numeroStelle}
                starRatedColor="yellow"
                numberOfStars={5}
                name="rating"
                starDimension="20px"
                starSpacing="5px"
              />
            </div>
            <div className="added-text" style={{ marginTop: 10 }}>
              {commento}
              <div className="date" style={{ marginTop: 10 }}>
                <b>data visita:</b> {dataVisita}
              </div>
              <MDBIcon icon="edit" />
            </div>
          </div>
        </div>
      </MDBRow>
      <hr></hr>
    </React.Fragment>
  );
};

/*const Feedback = ({ titolo, numeroStelle, commento, dataVisita }) => {
  return (
    <React.Fragment>
      <MDBCard style={{ width: 300 }}>
        <MDBCardBody>
          <MDBCardTitle>
            {titolo}
            <p>
              <StarRatings
                rating={numeroStelle}
                starRatedColor="yellow"
                numberOfStars={5}
                name="rating"
                starDimension="20px"
                starSpacing="5px"
              />
            </p>
          </MDBCardTitle>
          <MDBCardText>{commento}</MDBCardText>
          <MDBCardText>Data della visita: {dataVisita}</MDBCardText>
          <MDBIcon icon="edit" />
        </MDBCardBody>
      </MDBCard>
    </React.Fragment>
  );
};*/

export default Feedback;
