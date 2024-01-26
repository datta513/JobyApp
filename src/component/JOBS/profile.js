import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './File.css'

export default class Profile extends Component {
  state = {data: null}

  componentDidMount() {
    this.start()
  }

  change = pres => {
    console.log(pres)
    const {present} = this.state
    if (pres === present) {
      console.log(`entered empty`)
      this.setState(() => ({present: ''}))
    } else {
      this.setState(() => ({present: pres}))
    }
  }

  start = async () => {
    const url = 'https://apis.ccbp.in/profile'
    console.log(url)
    const m = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${m}`,
      },
      method: 'GET',
    }

    const k = await fetch(url, options)
    const m1 = await k.json()
    if (k.ok) {
      const k1 = {
        imageurl: m1.profile_details.profile_image_url,
        name: m1.profile_details.name,
        bio: m1.profile_details.short_bio,
      }
      this.setState(() => ({
        data: k1,
      }))
    } else {
      this.setState(() => ({
        data: 'retry',
      }))
    }
  }

  renderloader = () => {
    const k = 0
    return (
      <div data-testid="loader">
        <Loader type="ThreeDots" />
      </div>
    )
  }

  triggeragain = () => {
    this.setState(() => ({
      data: null,
    }))
    this.start()
  }

  renderprofile = () => {
    const {data} = this.state
    const {name, bio, imageurl} = data
    console.log(`${data.name} in  user`)
    console.log(data)
    if (data === 'retry') {
      return <button onClick={this.triggeragain}> Retry</button>
    }
    return (
      <div className="style">
        <img src={imageurl} alt="profile" height="50" width="50" />
        <h1>{name}</h1>
        <p>{bio}</p>
      </div>
    )
  }

  render() {
    const {data} = this.state
    return (
      <div>{data === null ? this.renderloader() : this.renderprofile()}</div>
    )
  }
}
