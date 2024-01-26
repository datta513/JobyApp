import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './Header.css'

const Header = props => {
  const {history} = props
  const clearuser = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="head">
      <li>
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
      </li>
      <ul className="ulst">
        <li className="Li">
          <Link to="/">Home</Link>
        </li>
        <li className="Li">
          <Link to="/jobs">Jobs</Link>
        </li>
      </ul>
      <button type="button" onClick={clearuser} className="buttonstyle">
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
