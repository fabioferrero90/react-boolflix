import React from 'react'

const MovieCard = ({movie}) => {

  const cardStyle = {
    width: '18rem',
  }

  return (
    <div className="moviecard card col-4" style={cardStyle}>
      <img
      className="card-img-top"
      alt={movie.title}
      src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
      onError={(e) => { e.target.onerror = null; e.target.src = '/comingsoon.png'; }} 
      />
      <div className="card-body">
        <p className="card-text">{movie.title}</p>
      </div>
    </div>
  )
}

export default MovieCard