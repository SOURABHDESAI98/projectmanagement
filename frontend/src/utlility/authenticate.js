import axios from 'axios'

export default function setAuthenticationHeader(token) {
   
    if (token) { // setting default authorization headers so you don't need to pass these each time when you make axios request
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete axios.defaults.headers.common['Authorization'] // deleting headers if any as no token found
    }
}
