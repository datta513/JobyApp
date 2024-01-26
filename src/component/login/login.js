import Cookies from 'js-cookie'
import {Component} from 'react'
import './login.css'

export default class Login extends Component {
  state = {username: '', password: '', fail: false}

  userC = event => {
    const k = event.target.value.trim(' ')
    this.setState(() => ({username: k}))
  }

  PasswordC = event => {
    const k = event.target.value.trim(' ')
    this.setState(() => ({password: k}))
  }

  onsucess = l => {
    const {history} = this.props
    const JWT = l
    Cookies.set('jwt_token', JWT, {expires: 30})
    console.log(Cookies.get('jwt_token'))
    history.replace('/')
  }

  renderfail = l => {
    this.setState(() => ({fail: l.error_msg, username: '', password: ''}))
  }

  check = async event => {
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const data = {username, password}
    const option = {
      method: 'POST',
      body: JSON.stringify(data),
    }

    const k = await fetch(url, option)
    const l = await k.json()
    console.log(k)
    console.log(l)
    if (k.ok === true) {
      this.onsucess(l.jwt_token)
    } else {
      this.renderfail(l)
    }
  }

  render() {
    const {username, password, fail} = this.state
    return (
      <div className="main">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
        <form onSubmit={this.check} className="style1">
          <label htmlFor="username" className="ele">
            USERNAME
          </label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            onChange={this.userC}
            value={username}
            className="ele"
          />

          <label htmlFor="Password" className="ele1">
            PASSWORD
          </label>

          <input
            type="password"
            placeholder="Password"
            id="Password"
            onChange={this.PasswordC}
            value={password}
            className="ele"
          />

          <button type="submit" className="ele1">
            Login
          </button>
          {fail ? <p>*{fail}</p> : ''}
        </form>
      </div>
    )
  }
}
