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

const ModalFeedBack = ({
  open,
  onToggle,
  starsSelected,
  onRating,
  onChangeText,
  errors,
  onSubmit,
}) => {
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
            {errors["numeroStelle"] ? (
              <p style={{ color: "red" }}>{errors["numeroStelle"]}</p>
            ) : (
              <p></p>
            )}
          </div>
          <MDBInput
            type="textarea"
            label="Titolo"
            rows="1"
            name="titolo"
            onChange={onChangeText}
          />
          {errors["titolo"] ? (
            <p style={{ color: "red" }}>{errors["titolo"]}</p>
          ) : (
            <p></p>
          )}
          <MDBInput
            type="textarea"
            label="La tua recensione"
            rows="5"
            name="commento"
            onChange={onChangeText}
          />
          <div>
            <TextField
              label="Data dell'esperienza"
              type="date"
              name="dataVisita"
              defaultValue={newDate}
              error={errors["dataVisita"]}
              onChange={onChangeText}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <MDBBtn onClick={onSubmit}>Conferma</MDBBtn>
            <MDBBtn onClick={onToggle}>Annulla</MDBBtn>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBModal>
  );
};

export default ModalFeedBack;
