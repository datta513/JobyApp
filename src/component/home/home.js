import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header/Header'
import './style.css'

export default class Home extends Component {
  render() {
    const route = () => {
      const {history} = this.props
      history.push('/jobs')
    }
    return (
      <div>
        <Header />
        <div className="image">
          <h1>Find The Job That Fits Your Life</h1>
          <p>Millions of people are searching for jobs</p>
          <Link to="/jobs">
            <button className="buttonstyle">Find Jobs</button>
          </Link>
        </div>
      </div>
    )
  }
}
