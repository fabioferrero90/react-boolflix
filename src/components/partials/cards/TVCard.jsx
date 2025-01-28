const TVCard = ({tv}) => {
  
  const cardStyle = {
    width: '18rem',
  }

  return (
    <div className="tvcard card col-4" style={cardStyle}>
      <img 
      className="card-img-top"
      alt={tv.name} 
      src={`https://image.tmdb.org/t/p/w342/${tv.poster_path}`} 
      onError={(e) => { e.target.onerror = null; e.target.src = '/comingsoon.png'; }} 
      />
      <div className="card-body">
        <p className="card-text">
          {tv.name}
        </p>
      </div>
    </div>
  )
}

export default TVCard