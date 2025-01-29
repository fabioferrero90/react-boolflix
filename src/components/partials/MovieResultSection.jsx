import MovieCard from './cards/MovieCard'


const MovieResultSection = ({movieList}) => {
  return (
    <div className="my-4">
      <h1>Film trovati: {movieList.length}</h1>
      <div className="row">
        {movieList.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {/* <button type="button" class="btn btn-danger my-3">Mostra altro</button> */}
    </div>
  )
}

export default MovieResultSection