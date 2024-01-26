import {Component} from 'react'
import {FaSearch} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header/Header'

import Profile from './profile'
import {Salarydatarender, Typerender, Rendersucess} from './datarender'

import './File.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

export default class Jobs extends Component {
  state = {Empty: [], data: null, present: '', sem: '', search: ''}

  chanlis = event => {
    const e = event.target.value.trim(' ')
    console.log(event.target.value)
    this.setState(() => ({search: e}))
  }

  renderstate = () => {
    const {data, search} = this.state

    if (data !== 'fail') {
      if (data.length !== 0) {
        return (
          <ul>
            {data.map(each => (
              <Rendersucess data={each} key={each.id} value="hello" />
            ))}
          </ul>
        )
      }
      return (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />
          <h1>No Jobs Found</h1>
          <p>We could not find any jobs. Try other filters</p>
        </div>
      )
    }
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button type="button" onClick={this.jobtrigger}>
          Retry
        </button>
      </div>
    )
  }

  lisu = id => {
    const {Empty} = this.state
    let m = null
    console.log(id)
    if (Empty.includes(id)) {
      m = Empty.filter(each => each !== id)
    } else {
      console.log('new item entered')
      m = [...Empty, id]
    }
    this.setState(
      () => ({
        Empty: m,
      }),
      this.jobtrigger,
    )
  }

  jobtrigger = async () => {
    const datac = each => {
      const k = {
        id: each.id,
        url: each.company_logo_url,
        type: each.employment_type,
        desc: each.job_description,
        loc: each.location,
        pack: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }
      return k
    }
    console.log('triggered')
    const {Empty, present, search} = this.state
    const m = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${m}`,
      },
      method: 'GET',
    }
    const url = `https://apis.ccbp.in/jobs?employment_type=${Empty.join()}&minimum_package=${present}&search=${search}`
    const fet = await fetch(url, options)
    const res = await fet.json()
    console.log(url, fet)
    if (fet.status === 200) {
      const k = res.jobs.map(each => datac(each))
      this.setState(() => ({data: k}))
    } else {
      this.setState(() => ({data: 'fail'}))
    }
  }

  change = pres => {
    const {present} = this.state
    if (pres === present) {
      console.log(`entered empty`)
      this.setState(() => ({present: ''}), this.jobtrigger)
    } else {
      this.setState(() => ({present: pres}), this.jobtrigger)
    }
  }

  render() {
    const {present, sem, data, search} = this.state
    const jobtrigger1 = () => {
      this.jobtrigger()
      return <Loader type="ThreeDots" />
    }
    return (
      <>
        <Header />
        <div className="main1">
          <div className="primary">
            <Profile />
            <hr />
            <h1>Type of Employment</h1>
            <ul>
              {employmentTypesList.map(each => (
                <Typerender
                  data={each}
                  key={each.employmentTypeId}
                  ch={this.lisu}
                />
              ))}
            </ul>
            <hr />
            <h1>Salary Range</h1>
            <ul>
              {salaryRangesList.map(each => (
                <Salarydatarender
                  data={each}
                  key={each.salaryRangeId}
                  chan={this.change}
                  pres={present}
                />
              ))}
            </ul>
          </div>
          <div className="secondry">
            <div>
              <input type="search" value={search} onChange={this.chanlis} />
              <button
                type="button"
                aria-label="Search"
                data-testid="searchButton"
                onClick={this.jobtrigger}
              >
                <FaSearch />
              </button>
            </div>
            <div className="data">
              {data === null ? jobtrigger1() : this.renderstate()}
            </div>
          </div>
        </div>
      </>
    )
  }
}
