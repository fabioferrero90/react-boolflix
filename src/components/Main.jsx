import { useEffect, useState } from 'react';
import { useDataContext } from '../context/DataContext';
import axios from 'axios';
import MovieResultSection from './partials/MovieResultSection';
import TVResultSection from './partials/TVResultSection';
import PeopleResultSection from './partials/PeopleResultSection';

const Main = () => {
  const [filteredData, setFilteredData] = useState({ movies: [], tvs: [], peoples: [] });
  const { results } = useDataContext();
  const api_key = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      if (results.length >= 1) {
        const newMovies = results.filter(result => result.media_type === 'movie');
        const newTvs = results.filter(result => result.media_type === 'tv');
        const newPeoples = results.filter(result => result.media_type === 'person' && result.profile_path !== null);

        if (newPeoples.length >= 1) {
          newPeoples.forEach(element => {
            element.known_for.forEach(known => {
              if (known.media_type === 'movie') {
                newMovies.push(known);
              } else {
                newTvs.push(known);
              }
            });
          });
        }

        if (newMovies.length >= 1) {
          const moviePromises = newMovies.map(movie => {
            const params = { api_key };
            return axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/credits`, { params })
              .then(res => {
                const updatedMovie = { ...movie, cast: res.data.cast };
                return updatedMovie;
              });
          });

          const updatedMovies = await Promise.all(moviePromises);
          setFilteredData({
            movies: updatedMovies,
            tvs: newTvs,
            peoples: newPeoples,
          });
        }
      }
    };

    fetchData();
  }, [results, api_key]);

  return (
    <div className="resultPage mb-5 container">
      {filteredData.movies.length >= 1 && <MovieResultSection movieList={filteredData.movies} />}
      {filteredData.tvs.length >= 1 && <TVResultSection tvList={filteredData.tvs} />}
      {filteredData.peoples.length >= 1 && <PeopleResultSection peopleList={filteredData.peoples} />}
    </div>
  );
};

export default Main;
