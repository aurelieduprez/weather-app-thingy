import React, { Component } from 'react';
import Data from '../PassData/Data';
import { Redirect } from 'react-router';
import DetailsCard from '../Component/DetailsCard';

class Details extends Component {

  constructor(props) {
    super(props);
    this.state = {
        detailsList: []
    };
  }

  componentDidMount = () => {
// decomposing the coords
    const coord = {
        lat : this.props.location.state.coord[0],
        lon : this.props.location.state.coord[1]

    };
    Data.SendDetails(coord).then((res) =>{
    this.setState({ detailsList: res.data[0].daily });
    }) 
  }
  
  render() {
    if (!Data.GetUser()) {
      return (<Redirect to="/Login" />);
    }
    return (
      <div class="p-5">
        <div style={{textAlign: 'center', fontSize:30}}>
          {this.props.location.state.city}
        </div> 
        <div class="containercard">
          {this.state.detailsList.map((data, index) => {
          return <DetailsCard key={index} data={data}/>
          })}
        </div>
      </div>
    );
  }
}

export default Details;