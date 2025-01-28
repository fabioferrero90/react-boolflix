import MovieCard from './cards/MovieCard'


const MovieResultSection = ({movieList}) => {
  return (
    <div className="my-4">
      <h1>Movie Results</h1>
      <div className="row">
        {movieList.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default MovieResultSection