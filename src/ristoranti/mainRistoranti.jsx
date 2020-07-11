import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import SearchRistoranti from "./searchRistoranti";
import { getRegioni, getProvince } from "../services/indirizziService";
import TableRistoranti from "./tableRistoranti";
import { getRistoranti } from "../services/ristorantiService";
import { paginate } from "../utils/paginate";

class MainRistoranti extends Component {
  state = {
    province: [],
    regioni: [],
    selectedRegione: "",
    selectedProvincia: "",
    filteredProvince: [],
    ristoranti: [],
    filterRistoranti: [],
    currentPage: 0,
    pageSize: 4,
  };

  async componentDidMount() {
    try {
      const regioni = await getRegioni();
      this.setState({ regioni });
      const province = await getProvince();
      this.setState({ province });
      const { data: ristoranti } = await getRistoranti();
      this.setState({ ristoranti, filterRistoranti: ristoranti });
    } catch (ex) {}
  }

  /**
   * Cambia il valore delle select
   */
  handleSelect = ({ target: input }) => {
    this.setState({ [input.name]: input.value }, this.filterProvince);
  };

  handleChangeRowsPerPage = (event) => {
    const pageSize = parseInt(event.target.value, 10);
    this.setState({ pageSize });
    this.setState({ currentPage: 0 });
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

  handlePageChange = (event, newPage) => {
    this.setState({ currentPage: newPage });
  };

  handleSearch = () => {
    const { ristoranti, selectedProvincia } = this.state;
    const filterRistoranti = ristoranti.filter(
      (r) => r.id_provincia === selectedProvincia
    );
    this.setState({ filterRistoranti });
  };

  render() {
    const {
      regioni,
      selectedRegione,
      selectedProvincia,
      filteredProvince,
      filterRistoranti,
      currentPage,
      pageSize,
    } = this.state;
    const paginateRistoranti = paginate(
      filterRistoranti,
      currentPage,
      pageSize
    );
    const totalItems = filterRistoranti.length;
    return (
      <MDBContainer className="container">
        <MDBRow center style={{ height: "30%" }} className="align-items-center">
          <MDBCol className="col-md-6 d-flex justify-content-center">
            <SearchRistoranti
              regioni={regioni}
              onClick={this.handleSelect}
              selectedRegione={selectedRegione}
              selectedProvincia={selectedProvincia}
              province={filteredProvince}
              onSearch={this.handleSearch}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow center style={{ height: "70%" }} className="align-items-center">
          <TableRistoranti
            rows={paginateRistoranti}
            currentPage={currentPage}
            pageSize={pageSize}
            itemsCount={totalItems}
            onPageChange={this.handlePageChange}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default MainRistoranti;
