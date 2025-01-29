import { useEffect, useState } from 'react';
import { useDataContext } from '../context/DataContext';
import MovieResultSection from './partials/MovieResultSection';
import TVResultSection from './partials/TVResultSection';
import PeopleResultSection from './partials/PeopleResultSection';

const Main = () => {

  const [ filteredData, setFilteredData ] = useState({movies: [],tvs: [],peoples:[]});
  const { results } = useDataContext();

  useEffect(() => {
    if (results.length >= 1) {
      const newMovies = results.filter(result => result.media_type == 'movie');
      const newTvs = results.filter(result => result.media_type == 'tv');
      const newPeoples = results.filter(result => result.media_type == 'person' && result.profile_path !== null);
      if (newPeoples.length >= 1) {
        for (const element of newPeoples) {
          for (const known of element.known_for) {
            if (known.media_type == 'movie') {
              newMovies.push(known);
            } else {
              newTvs.push(known);
            }
          }
        }
      }
      setFilteredData({
        movies: newMovies,
        tvs: newTvs,
        peoples: newPeoples
      })
    }
  }, [results])

  return (
    <div className="resultPage mb-5 container">
      {filteredData.movies.length >= 1 && <MovieResultSection movieList={filteredData.movies} />}
      {filteredData.tvs.length >= 1 && <TVResultSection tvList={filteredData.tvs} />}
      {filteredData.peoples.length >= 1 && <PeopleResultSection peopleList={filteredData.peoples} />}
    </div>
  )
}

export default Main