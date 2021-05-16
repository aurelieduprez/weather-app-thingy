import axios from "axios";

class Data {
  //axios route for register
  Register = (name, email, password) => {
    return axios
      .post(`http://localhost:3001/api/user/Register`, {
        name,
        email,
        password,
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error.response;
      });
  };

  //axios route for login
  Login = (email, password) => {
    return axios
      .post(`http://localhost:3001/api/user/Login`, { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data);
        return res.data;
      })
      .catch((error) => {
        return error.response;
      });
  };

  //get the current user if authentificated thanks to the token
  GetUser = () => {
    return localStorage.getItem("token");
  };

  //signout
  signout = () => {
    localStorage.removeItem("token");
  };

  //add a city
  SendCity = (city) => {
    return axios
      .post(
        `http://localhost:3001/api/weather/home`,
        { city },
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error.response;
      });
  };

  //get all cities
  GetCity = async () => {
    return axios
      .get(`http://localhost:3001/api/weather/city`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return error.response;
      });
  };

  //delete a city
  DeleteCity = async (city) => {
    return axios
      .post(
        `http://localhost:3001/api/weather/delete`,
        { city },
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error.response;
      });
  };

  //get details from the coords of the city
  SendDetails = (coord) => {
    return axios
      .post(
        `http://localhost:3001/api/weather/details`,
        { coord },
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error.response;
      });
  };
}

export default new Data();
