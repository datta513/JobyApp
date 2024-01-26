import {IoStarSharp} from 'react-icons/io5'
import {FaSuitcase} from 'react-icons/fa'

export const First = props => {
  const {data} = props
  return (
    <div>
      <img
        src={data.compurl}
        height="20"
        width="20"
        alt="job details company logo"
      />
      <p>{data.title}</p>
      <p>
        <IoStarSharp />
        {data.rating}
      </p>
      <p>{data.pkg}</p>
      <hr />
      <h1>Description</h1>
      <a href={data.compweb}>Visit </a>
      <p>{data.jobdesc}</p>
    </div>
  )
}

export const Second = props => {
  const {data} = props
  return (
    <li>
      <img src={data.url} alt={data.name} />
      <p>{data.name}</p>
    </li>
  )
}

export const Third = props => {
  const {data} = props
  return (
    <div>
      <p>{data.desc}</p>
      <img src={data.descimg} alt="life at company" />
    </div>
  )
}

export const Fourth = props => {
  const {data} = props
  return (
    <div>
      <li>
        <img src={data.compurl} alt="similar job company logo" />
        <p>{data.title}</p>
        <p>
          <IoStarSharp />
          {data.rating}
        </p>
        <h1>Description</h1>
        <p>{data.JD}</p>
        <p>{data.loc}</p>
        <p>
          <FaSuitcase />
          {data.type}
        </p>
      </li>
    </div>
  )
}
