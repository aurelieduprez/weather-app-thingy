import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from "../Views/Home";
import Login from "../Views/Login";
import Register from "../Views/Register";
import React, {Component} from "react";
import Data from '../PassData/Data';
import Details from "../Views/Details";

class Header extends Component{

    renderAuthButtons = () => {
      if (!Data.GettheUser()) {
          return (
              <div>
                <nav className="navbar navbar-expand-lg headercolor">
                  <a href="/"><Link to={'/'} className="navbar-brand headercolor"> SupWeather</Link></a>
                  <ul class="nav ml-auto">
                    <li><Link to={'/Login'} className="nav-link headercolor">Se connecter</Link></li>
                    <li><Link to={'/Register'} className="nav-link headercolor">S'inscrire</Link></li>
                  </ul>
                </nav>
                <a href= "https://github.com/aurelieduprez" class="footer">@aurelieduprez</a>
              </div>
              
          )
      }
    }
    renderAuthenticatedButtons = () => {
      if (Data.GettheUser()) {
          return (
          <div>
            <nav className="navbar navbar-expand-lg headercolor">
              <a href="/"><Link to={'/'} className="navbar-brand headercolor"> SupWeather </Link></a>
              <ul class="nav ml-auto">
                <li type="submit" class="headercolor" onClick={() =>{this.logout()}}>Se déconnecter </li>
              </ul>
            </nav>
            <a href= "https://github.com/aurelieduprez" class="footer">@aurelieduprez</a>
          </div>
          )
      }
    }

    logout = () => {
      Data.signout()
      window.location.reload()
    }

  render(){
    return (   
      <Router>
        <div>
          {this.renderAuthenticatedButtons()}
          {this.renderAuthButtons()}  
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/Login' component={Login} />
              <Route path='/Register' component={Register} />
              <Route path='/Details' component={Details} />
          </Switch>
        </div>
      </Router>
    )
  }

}

export default Header;