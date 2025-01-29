import { useEffect, useState } from 'react';
import { useDataContext } from '../context/DataContext';
import axios from 'axios';
import MovieResultSection from './partials/MovieResultSection';
import TVResultSection from './partials/TVResultSection';
import PeopleResultSection from './partials/PeopleResultSection';
import HomePage from './HomePage';
const Main = () => {
  const [filteredData, setFilteredData] = useState({ movies: [], tvs: [], peoples: [] });
  const { homePage, formData, results } = useDataContext();
  const api_key = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      if (results.length >= 1) {
        const newMovies = (formData.category == 'all') ? results.filter(result => result.media_type === 'movie') : results.filter(result => result.media_type === 'movie' && result.genre_ids.includes(parseInt(formData.category)));
        const newTvs = (formData.category == 'all') ? results.filter(result => result.media_type === 'tv') : results.filter(result => result.media_type === 'tv' && result.genre_ids.includes(parseInt(formData.category)));
        const newPeoples = (formData.category == 'all') ? results.filter(result => result.media_type === 'person' && result.profile_path !== null) : [];

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

        const moviePromises = newMovies.map(movie => {
          const params = { api_key };
          return axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/credits`, { params })
            .then(res => {
              const updatedMovie = { ...movie, cast: res.data.cast };
              return updatedMovie;
            });
        });

        const tvPromises = newTvs.map(tv => {
          const params = { api_key };
          return axios.get(`https://api.themoviedb.org/3/tv/${tv.id}/credits`, { params })
            .then(res => {
              const updatedTv = { ...tv, cast: res.data.cast };
              return updatedTv;
            });
        });

        const updatedMovies = await Promise.all(moviePromises);
        const updatedTvs = await Promise.all(tvPromises);

        setFilteredData({
          movies: updatedMovies,
          tvs: updatedTvs,
          peoples: newPeoples,
        });
      }
    };

    fetchData();
  }, [results, api_key]);

  return (
    <div className="resultPage mb-5 container">
      {homePage ? (
        <HomePage />
      ) : (
        <>
          {filteredData.movies.length >= 1 && <MovieResultSection movieList={filteredData.movies} />}
          {filteredData.tvs.length >= 1 && <TVResultSection tvList={filteredData.tvs} />}
          {filteredData.peoples.length >= 1 && <PeopleResultSection peopleList={filteredData.peoples} />}
        </>
      )}
    </div>
  );
};

export default Main;
