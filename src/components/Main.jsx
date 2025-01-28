import { useEffect, useState } from 'react';
import { useDataContext } from '../context/DataContext';
import MovieResultSection from './partials/MovieResultSection';
import TVResultSection from './partials/TVResultSection';
import PeopleResultSection from './partials/PeopleResultSection';

const Main = () => {

  const [ pageData, setPageData ] = useState({movies: [],tvs: [],peoples:[]});
  const { results } = useDataContext();

  useEffect(() => {
    if (results.length >= 1) {
      const newMovies = results.filter(result => result.media_type == 'movie');
      const newTvs = results.filter(result => result.media_type == 'tv');
      const newPeoples = results.filter(result => result.media_type == 'person');
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
      setPageData({
        movies: newMovies,
        tvs: newTvs,
        peoples: newPeoples
      })
    }
  }, [results])

  return (
    <div className="container">
      {pageData.movies.length >= 1 && <MovieResultSection movieList={pageData.movies} />}
      {pageData.tvs.length >= 1 && <TVResultSection tvList={pageData.tvs} />}
      {pageData.peoples.length >= 1 && <PeopleResultSection peopleList={pageData.peoples} />}
    </div>
  )
}

export default Main