import React from 'react'

const PeopleCard = ({people}) => {

  const cardStyle = {
    width: '18rem',
  }

  return (
    <div className="peoplecard card col-4" style={cardStyle}>
      <img
      className="card-img-top"
      src={`https://image.tmdb.org/t/p/w342${people.profile_path}`}
      alt={people.name}
      onError={(e) => { e.target.onerror = null; e.target.src = '/comingsoon.png'; }}/>
      <div className="card-body">
        <p className="card-text">{people.name}</p>
      </div>
    </div>
  )
}

export default PeopleCard