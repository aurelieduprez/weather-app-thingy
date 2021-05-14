import React, { Component } from 'react';
import Data from '../PassData/Data';
import CityCard from "../Component/CityCard"
import { Redirect } from 'react-router';
import { Button } from 'react-bootstrap';


class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
        city:'',
        citylist: [],
    };
  }

  handleChangeCity = event => {

    this.setState({ city: event.target.value });
  }

  handleSubmit = event => {

      event.preventDefault();

      const city = {
          city: this.state.city,

      };
      Data.SendCity(city.city).then((res)=>{
        if(res.data == "Error"){
          this.setState({error: "City doesn't exist"})
        }
        else if(res.data == "City already exists"){
          this.setState({error: "City already exists"})
        }
        else{
          this.setState({error: "City add"})
          this.UpdateCity()      
        }
    })
      
  }

  UpdateCity(){
    Data.GetCity().then((res)=>{
      this.setState({ citylist: res });
    })
  }

  componentDidMount(){
    this.UpdateCity()
  }
  
  render() {
    if (!Data.GettheUser()) {
      return (<Redirect to="/Login" />);
    }

    return (

        <div class="container p-5">
          <form class="form-container" >
            <div class="form-group">
                <label >City</label>
                <input type="text" class="form-control"  placeholder="Enter Name"  onChange={this.handleChangeCity}></input>
            </div>
            <Button variant="default" className="button mt-1 ml-1" onClick={this.handleSubmit}>Add</Button>  
          </form>
          { this.state.error &&<h5 class= "alert alert-info" role="alert"> { this.state.error } </h5> }
          <div class="containercard p-3">
          {this.state.citylist.map((city, index) => {
            return <CityCard key={index} city={city} CityRemoved={this.UpdateCity.bind(this)} />
          })} 
          </div>
        </div>
    );
  }
}

export default Home;