import axios from "axios";
import { LOGIN_FAILURE_DATA, LOGIN_SUCCESS_DATA } from "./userActionTypes";
import setAuthenticationHeader from "../../utlility/authenticate";

export const loginUser = (form, navigate) => async (dispatch) => {
  console.log("form", form);
  try {
    let res = await axios.post('http://localhost:3000/api/projects/login', form);
    let userdata = await res.data;
    console.log(userdata)
    if (userdata.success) {

      // getting token from backend
      let token = userdata.token;
      // saving token in local storage
      localStorage.setItem('jsonwebtoken', token);
      //setting authentication header
      setAuthenticationHeader(token);

      dispatch({ type: LOGIN_SUCCESS_DATA, payload: userdata.message })
      navigate("/dashboard")
    }
    else {
      dispatch({ type: LOGIN_FAILURE_DATA, payload: userdata.message })
    }
  }
  catch (err) {
    console.log(err);
  }
}
