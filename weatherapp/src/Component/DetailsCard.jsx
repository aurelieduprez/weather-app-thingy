import React, { Component } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

class DetailsCard extends Component{

  render(){
      const milliseconds = this.props.data.dt * 1000;
      let dateobject = new Date(milliseconds);
      let date = dateobject.toLocaleDateString("en-GB",{weekday: "long",month :"long",year :"numeric" ,day : "numeric"})
      const rainProba = this.props.data.pop * 100;
      return (   
        <div class="p-3">
          <Card style={{ width: '18rem', backgroundColor: '#1C2942', color: 'white'}}>
            <Card.Body>
              <Card.Title style={{textAlign: 'center', fontSize:30}}>{date}</Card.Title>
              <Row>
                <Col sm={7}> 
                  <Card.Img variant="top" style={{height: '100%', width: '100%' }} src={`http://openweathermap.org/img/wn/${this.props.data.weather[0].icon}@4x.png`} />
                </Col>
                <Col sm={5}>
                  <br></br>
                  <Card.Text style={{textAlign: 'center', fontSize:19}}>
                    {this.props.data.temp.day}°
                  </Card.Text>
                  <Card.Text style={{textAlign: 'center', fontSize:14}}>
                    Min : {this.props.data.temp.min}°
                  </Card.Text>
                  <Card.Text style={{textAlign: 'center', fontSize:14}}>
                    Max : {this.props.data.temp.max}°
                  </Card.Text>
                </Col>
              </Row>
              <Row>
                <Col sm={7}>
                <Card.Text style={{textAlign: 'center', fontSize:19}}>
                  {this.props.data.weather[0].description}
                </Card.Text>
                </Col>
                <Col sm={5}>
                </Col>
              </Row>
              <Row className="pt-2">
                <Col sm={6}>
                  <Card.Text style={{textAlign: 'center', fontSize:14}}>
                    Humidity : {this.props.data.humidity} %
                  </Card.Text>
                  <Card.Text style={{textAlign: 'center', fontSize:14}}>
                    Night : {this.props.data.temp.night}°
                  </Card.Text>
                </Col>
                <Col sm={6}>
                  <Card.Text style={{textAlign: 'center', fontSize:14}}>
                    Wind : {this.props.data.wind_speed} km/h
                  </Card.Text>
                  <Card.Text style={{textAlign: 'center', fontSize:14}}>
                    Rain : {rainProba} %
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
    )
  }

}

export default DetailsCard;