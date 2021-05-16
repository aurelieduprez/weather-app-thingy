import React, { Component } from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Data from '../PassData/Data';




//this component is used to generate the main city card and used for each city chosen by the user


class CityCard extends Component{

  constructor(props) {
    super(props);
    this.state = {
        coord: [this.props.city.coord.lat, this.props.city.coord.lon]
    };
  }
 // on submit, deletes the selected city from the list dynamically
  handleSubmit = event => {

    event.preventDefault();

    const city = this.props.city.name
    Data.DeleteCity(city).then(()=>{
      this.props.CityRemoved()
    })
      
  }
 // render method of the card
  render(){
      return (   
        <div class="p-3">
          <Card >
            <Card.Body class="card-body">
              <Card.Title style={{textAlign: 'center', fontSize:30}}>{this.props.city.name}</Card.Title>
              <Row>
                <Col sm={7}> 
                {/*choose the corresponding asset depending on the weather */}
                  <Card.Img variant="top" style={{height: '100%', width: '100%' }} src={`http://openweathermap.org/img/wn/${this.props.city.weather[0].icon}@4x.png`} />
                </Col>
                <Col sm={5}>
                  <br></br>
                  {/*temperatures : main, min, max and feels-like*/}
                  <Card.Text style={{textAlign: 'center', fontSize:19}}>
                    {this.props.city.main.temp}°C
                  </Card.Text>
                  <Card.Text style={{textAlign: 'center', fontSize:14}}>
                    Min : {this.props.city.main.temp_min}°C
                  </Card.Text>
                  <Card.Text style={{textAlign: 'center', fontSize:14}}>
                    Max : {this.props.city.main.temp_max}°C
                  </Card.Text>
                  <Card.Text style={{textAlign: 'center', fontSize:14}}>
                    Ressenti : {this.props.city.main.feels_like}°C
                  </Card.Text>
                </Col>
              </Row>
              <Row>
                <Col sm={7}>
                <Card.Text style={{textAlign: 'center', fontSize:19}}>
                  {this.props.city.weather[0].description}
                </Card.Text>
                </Col>
                <Col sm={5}>
                </Col>
              </Row>
              <Row className="justify-content-md-center pt-2">
                <Button variant="default" className="button mt-1 mr-1" onClick={(e) => {
                    this.props.history.push('/Details', {
                    city: this.props.city.name,
                    coord: this.state.coord
                  })}}>+</Button> 
                <Button variant="default" className="button mt-1 ml-1" onClick={this.handleSubmit}>Supprimer</Button>  
              </Row>
            </Card.Body>
          </Card>
        </div>
      )
  }

}

export default withRouter(CityCard);