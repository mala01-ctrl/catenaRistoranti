import React from "react";
import {
  MDBModal,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBInput,
  MDBBtn,
} from "mdbreact";
import StarRatings from "react-star-ratings";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const ModalFeedBack = ({ open, onToggle, starsSelected, onRating }) => {
  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));
  const newDate = new Date();

  const classes = useStyles();
  return (
    <MDBModal isOpen={open}>
      <MDBCard>
        <MDBCardBody style={{ textAlign: "left" }}>
          <MDBCardTitle>Nuova recensione</MDBCardTitle>
          <div>
            <StarRatings
              rating={starsSelected}
              starRatedColor="yellow"
              changeRating={onRating}
              numberOfStars={5}
              name="rating"
              starDimension="30px"
              starSpacing="10px"
            />
          </div>
          <MDBInput type="textarea" label="Titolo" rows="1" />
          <MDBInput type="textarea" label="La tua recensione" rows="5" />
          <div>
            <TextField
              id="date"
              label="Data dell'esperienza"
              type="date"
              defaultValue={newDate}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <MDBBtn>Conferma</MDBBtn>
            <MDBBtn onClick={onToggle}>Annulla</MDBBtn>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBModal>
  );
};

export default ModalFeedBack;
