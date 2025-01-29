import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const DataContext = createContext();

const DataProvider = ({children}) => {

  const api_key = import.meta.env.VITE_TMDB_API_KEY;
  const [results, setResults] = useState([]);
  const [movieInfo, setMovieInfo] = useState([]);
  const [tvInfo, setTvInfo] = useState([]);
  const [genres, setGenres] = useState([]);
  const search_api_url = 'https://api.themoviedb.org/3/search/multi';
  const movieinfo_api_url = 'https://api.themoviedb.org/3/movie/';
  const tvinfo_api_url = 'https://api.themoviedb.org/3/tv/';
  const genres_api_url = 'https://api.themoviedb.org/3/genre/movie/list';

  const infoparams = {
    api_key,
    language: 'it-IT',
  }

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = () => {
    const params = {
      api_key,
      language: 'it'
    }
    axios.get(genres_api_url, {params}) 
    .then(res => {
      setGenres(res.data);
    })
  }

  const fetchData = (query) =>{
    const params = {
      api_key,
      language: 'it-IT',
      query,
    }
    axios.get(search_api_url, {params})
    .then(res => {
      setResults(res.data.results);
    })
  }

  const fetchMovieInfo = (movie_id) =>{
    
    axios.get(`${movieinfo_api_url}${movie_id}`, {infoparams})
    .then(res => {
      setMovieInfo(res.data);
    })
  }

  const fetchTvInfo = (tv_id) =>{
    axios.get(`${tvinfo_api_url}${tv_id}`, {infoparams})
    .then(res => {
      setTvInfo(res.data);
    })
  }

  return (
    <DataContext.Provider value={{ results, fetchData, fetchMovieInfo, movieInfo, fetchTvInfo, tvInfo, fetchGenres, genres }}>
      {children}
    </DataContext.Provider>
  )
}

const useDataContext = () => useContext(DataContext);
export { DataProvider, useDataContext }