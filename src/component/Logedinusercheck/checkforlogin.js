import Cookie from 'js-cookie'
import {Route, Redirect} from 'react-router-dom'

const RouteChecklogedin = props => {
  const k = Cookie.get('jwt_token')
  if (k !== undefined) {
    return <Redirect to="/" />
  }
  return <Route {...props} />
}

export default RouteChecklogedin
