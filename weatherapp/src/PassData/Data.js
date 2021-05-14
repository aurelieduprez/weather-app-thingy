import axios from 'axios';

class Data {
    
    SendRegister = (name,email,password) => {
        return axios.post(`http://localhost:3001/api/user/Register`, { name,email,password })
        .then(res => {
          return res
        })
        .catch((error) => {
          return(error.response);
        })
    }

    SendLogin = (email,password) => {
      return axios.post(`http://localhost:3001/api/user/Login`, { email,password })
      .then((res)  => {
        
          localStorage.setItem('token', res.data)
          return res.data
        })
        .catch((error) => {
          return(error.response);
        })
        }

    GettheUser = () => {
      return localStorage.getItem("token");
    }

    signout = () => {
      localStorage.removeItem("token");
    }

    SendCity = (city) => {
      return axios.post(`http://localhost:3001/api/weather/home`, {city}, {
        headers: {
          'auth-token': localStorage.getItem('token')
        }})
      .then((res)  => {
          return res
        })
        .catch((error) => {
          return(error.response);
        })
    }

    GetCity = async () => {
      return axios.get(`http://localhost:3001/api/weather/city`,{
        headers: {
          'auth-token': localStorage.getItem('token')
        }})
        .then((res)  => {
          return res.data
        })
        .catch((error) => {
          return(error.response);
        })
    }

    DeleteCity = async (city) => {
      return axios.post(`http://localhost:3001/api/weather/delete`,{city},{
        headers: {
          'auth-token': localStorage.getItem('token')
        }})
        .then((res)  => {
          return res
        })
        .catch((error) => {
          return(error.response);
        })
    }
    
    SendDetails = (coord) => {
      return axios.post(`http://localhost:3001/api/weather/details`, {coord}, {
        headers: {
          'auth-token': localStorage.getItem('token')
        }})
      .then((res)  => {
          return res
        })
        .catch((error) => {
          return(error.response);
        })
    } 
}

export default new Data();
  