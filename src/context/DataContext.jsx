import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const DataContext = createContext();

const DataProvider = ({children}) => {

  const api_key = import.meta.env.VITE_TMDB_API_KEY;
  const base_api_url = 'https://api.themoviedb.org/3/search/multi';
  const defaultparams = '&include_adult=false&language=it-IT';
  const [results, setResults] = useState([]);
  const movieinfo_api_url = 'https://api.themoviedb.org/3/movie/';
  const [movieInfo, setMovieInfo] = useState([]);
  const tvinfo_api_url = 'https://api.themoviedb.org/3/tv/';
  const [tvInfo, setTvInfo] = useState([]);
  const genres_api_url = 'https://api.themoviedb.org/3/genre/movie/list';
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = () => {
    axios.get(`${genres_api_url}?api_key=${api_key}&language=it`) 
    .then(res => {
      setGenres(res.data);
    })
  }

  const fetchData = (query) =>{
    const endpoint = `${base_api_url}?api_key=${api_key}${defaultparams}&query=${query}`
    axios.get(endpoint)
    .then(res => {
      setResults(res.data.results);
    })
  }

  const fetchMovieInfo = (movie_id) =>{
    axios.get(`${movieinfo_api_url}${movie_id}?api_key=${api_key}&language=it-IT}`)
    .then(res => {
      setMovieInfo(res.data);
    })
  }

  const fetchTvInfo = (tv_id) =>{
    axios.get(`${tvinfo_api_url}${tv_id}?api_key=${api_key}&language=it-IT}`)
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