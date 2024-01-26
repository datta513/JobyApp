import {Link} from 'react-router-dom'
import {FaRegStar, FaSuitcase} from 'react-icons/fa'
import {IoLocationOutline} from 'react-icons/io5'
import './File.css'

export const Salarydatarender = props => {
  const {data, pres, chan} = props
  const {label, salaryRangeId} = data

  const change = () => {
    const id = data.salaryRangeId
    chan(id)
  }

  return (
    <li id={salaryRangeId}>
      <input
        type="radio"
        id={label}
        value={data.salaryRangeId}
        onChange={change}
        key={label}
      />
      <label htmlFor={label}>{label}</label>
    </li>
  )
}

export const Typerender = props => {
  const {data, ch} = props
  const {employmentTypeId, label} = data
  const change = () => {
    ch(data.employmentTypeId)
  }
  return (
    <li id={employmentTypeId}>
      <input
        type="checkbox"
        id={label}
        value={data.employmentTypeId}
        onClick={change}
        key={label}
      />
      <label htmlFor={label}>{label}</label>
    </li>
  )
}

export const Rendersucess = props => {
  const {data} = props
  const {url, id, desc, loc, rating, title, type, pack} = data
  return (
    <li className="stye">
      <Link to={`/jobs/${data.id}`}>
        <div className="otu">
          <img src={url} alt="company logo" />
          <h4>{title}</h4>
          <p>
            <FaRegStar /> {rating}
          </p>
          <p>
            <IoLocationOutline />
            {loc}
          </p>
          <p>
            <IoLocationOutline />
            {type}
          </p>
          <p>{pack}</p>
        </div>
        <hr />
        <div>
          <h1>Description</h1>
          <p>{desc}</p>
        </div>
      </Link>
    </li>
  )
}
