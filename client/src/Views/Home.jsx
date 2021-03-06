import React, { Component } from "react";
import Data from "../PassData/Data";
import CityCard from "../Component/CityCard";
import { Redirect } from "react-router";
import { Button } from "react-bootstrap";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      citylist: [],
    };
  }

  handleChangeCity = (event) => {
    this.setState({ city: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const city = {
      city: this.state.city,
    };
    Data.SendCity(city.city).then((res) => {
      if (res.data === "Error") {
        this.setState({ error: "Cette ville n'existe pas." });
      } else if (res.data === "Cette ville est déjà ajoutée à votre liste.") {
        this.setState({ error: "Cette ville est déjà ajoutée à votre liste." });
      } else {
        this.setState({ error: "Ville ajoutée à la liste." });
        this.UpdateCity();
      }
    });
  };

  UpdateCity() {
    Data.GetCity().then((res) => {
      this.setState({ citylist: res });
    });
  }

  componentDidMount() {
    this.UpdateCity();
  }

  render() {
    if (!Data.GetUser()) {
      return <Redirect to="/Login" />;
    }

    return (
      //input to enter a city + add button + alert message
      <div class="container p-5">
        <form class="form-container">
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Entrer une ville..."
              onChange={this.handleChangeCity}
            ></input>
          </div>
          <Button
            variant="default"
            className="button mt-1 ml-1"
            onClick={this.handleSubmit}
          >
            Ajouter
          </Button>
        </form>
        {this.state.error && (
          <h5 class="alert alert-info" role="alert">
            {" "}
            {this.state.error}{" "}
          </h5>
        )}
        <div class="containercard p-3">
          {this.state.citylist.map((city, index) => {
            return (
              <CityCard
                key={index}
                city={city}
                CityRemoved={this.UpdateCity.bind(this)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Home;
