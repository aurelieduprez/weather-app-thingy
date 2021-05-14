import React, { Component } from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Data from '../PassData/Data';

class CityCard extends Component{

  constructor(props) {
    super(props);
    this.state = {
        coord: [this.props.city.coord.lat, this.props.city.coord.lon]
    };
  }

  handleSubmit = event => {

    event.preventDefault();

    const city = this.props.city.name
    Data.DeleteCity(city).then(()=>{
      this.props.CityRemoved()
    })
      
  }

  render(){
      return (   
        <div class="p-3">
          <Card style={{ width: '18rem', backgroundColor: '#1C2942', color: 'white'}}>
            <Card.Body>
              <Card.Title style={{textAlign: 'center', fontSize:30}}>{this.props.city.name}</Card.Title>
              <Row>
                <Col sm={7}> 
                  <Card.Img variant="top" style={{height: '100%', width: '100%' }} src={`http://openweathermap.org/img/wn/${this.props.city.weather[0].icon}@4x.png`} />
                </Col>
                <Col sm={5}>
                  <br></br>
                  <Card.Text style={{textAlign: 'center', fontSize:19}}>
                    {this.props.city.main.temp}°
                  </Card.Text>
                  <Card.Text style={{textAlign: 'center', fontSize:14}}>
                    Min : {this.props.city.main.temp_min}°
                  </Card.Text>
                  <Card.Text style={{textAlign: 'center', fontSize:14}}>
                    Max : {this.props.city.main.temp_max}°
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
                  })}}>More Details</Button> 
                <Button variant="default" className="button mt-1 ml-1" onClick={this.handleSubmit}>Delete</Button>  
              </Row>
            </Card.Body>
          </Card>
        </div>
      )
  }

}

export default withRouter(CityCard);