import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header/Header'
import {First, Second, Third, Fourth} from '../ECAH/each'

export default class ProductId extends Component {
  state = {details: '', skills: '', similar: '', comp: ''}

  componentDidMount() {
    this.check()
  }

  renderSucess = () => {
    const {details, skills, similar, comp} = this.state
    const l = 0
    return (
      <div>
        <Header />
        <First data={details[0]} />
        <h1>Skills</h1>
        <ul>
          {skills[0].map(each => (
            <Second data={each} key={each.name} />
          ))}
        </ul>
        <h1>Life at Company</h1>
        <Third data={comp[0]} />
        <h1>Similar Jobs</h1>
        <ul>
          {similar[0].map(each => (
            <Fourth data={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  check = async () => {
    const filter = each => {
      console.log(each.Keys)
    }
    const lifes = each => {
      console.log(each)
      const life = {
        desc: each.description,
        descimg: each.image_url,
      }
      return life
    }
    const jondeta = each => {
      console.log(each)
      const data = {
        id: each.id,
        title: each.title,
        compurl: each.company_logo_url,
        compweb: each.company_website_url,
        rating: each.rating,
        pkg: each.package_per_annum,
        jobdesc: each.job_description,
        location: each.location,
      }
      return data
    }

    const skillse = each => {
      const s = {
        url: each.image_url,
        name: each.name,
      }
      return s
    }

    const sim = each => {
      console.log(each)
      const sim1 = {
        compurl: each.company_logo_url,
        type: each.employment_type,
        id: each.id,
        JD: each.job_description,
        loc: each.location,
        rating: each.rating,
        title: each.title,
      }
      return sim1
    }

    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const m = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${m}`,
      },
      method: 'GET',
    }
    const j = await fetch(url, options)
    const k = await j.json()
    console.log(k)
    const jobdetails = Array(k.job_details)
    const life = Array(k.job_details.life_at_company)
    const skill = Array(k.job_details.skills)
    const similarjog = Array(k.similar_jobs)
    const data = jobdetails.map(each => jondeta(each))
    const lifest = life.map(each => lifes(each))
    const skilset = skill.map(each => {
      const m1 = each.map(each1 => skillse(each1))
      return [...m1]
    })
    const silm = similarjog.map(each => {
      const m1 = each.map(each1 => sim(each1))
      return [...m1]
    })
    this.setState(() => ({
      details: data,
      skills: skilset,
      similar: silm,
      comp: lifest,
    }))
  }

  render() {
    const {details, skills, similar, comp} = this.state
    console.log(details, skills, comp, similar)
    return (
      <div>
        {details !== '' && skills !== '' && comp !== '' && similar !== '' ? (
          this.renderSucess()
        ) : (
          <Loader type="ThreeDots" />
        )}
      </div>
    )
  }
}
