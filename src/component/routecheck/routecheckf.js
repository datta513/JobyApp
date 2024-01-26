import {Redirect, Route} from 'react-router-dom'
import Cookies from 'js-cookie'

const Routecheck = props => {
  const k = Cookies.get('jwt_token')
  if (k === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default Routecheck
