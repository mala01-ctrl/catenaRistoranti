import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import SearchRistoranti from "./searchRistoranti";
import { getRegioni, getProvince } from "../services/indirizziService";

class MainRistoranti extends Component {
  state = {
    province: [],
    regioni: [],
    selectedRegione: "",
    selectedProvincia: "",
    filteredProvince: [],
  };

  async componentDidMount() {
    try {
      const regioni = await getRegioni();
      this.setState({ regioni });
      const province = await getProvince();
      this.setState({ province });
    } catch (ex) {}
  }

  /**
   * Cambia il valore delle select
   */
  handleSelect = ({ target: input }) => {
    this.setState({ [input.name]: input.value }, this.filterProvince);
  };

  /**
   * Filtra le province in base alla regione selezionata
   */
  filterProvince = () => {
    const { province, selectedRegione } = this.state;
    let filteredProvince = province.filter(
      (p) => p.idRegione === selectedRegione
    );
    this.setState({ filteredProvince });
  };

  render() {
    const {
      regioni,
      selectedRegione,
      selectedProvincia,
      filteredProvince,
    } = this.state;
    return (
      <MDBContainer className="container">
        <MDBRow
          center
          style={{ height: "100%" }}
          className="align-items-center"
        >
          <MDBCol className="col-md-6 d-flex justify-content-center">
            <SearchRistoranti
              regioni={regioni}
              onClick={this.handleSelect}
              selectedRegione={selectedRegione}
              selectedProvincia={selectedProvincia}
              province={filteredProvince}
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default MainRistoranti;
