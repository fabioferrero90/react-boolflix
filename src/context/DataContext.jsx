import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const DataContext = createContext();

const DataProvider = ({children}) => {
  const defaultFormData = {
    category: 'all',
    search: ''
  };
  const [formData, setFormData] = useState(defaultFormData);

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
    axios.get(genres_api_url, { params }) 
    .then(res => {
      setGenres(res.data.genres); // Assicurati di accedere correttamente alla proprietà dei generi
    })
    .catch(err => console.error("Errore nel fetch dei generi:", err));
  }

  const fetchData = (query, genre) =>{
    const params = {
      api_key,
      language: 'it-IT',
      query,
      with_genres: genre !== 'all' ? genre : undefined,
    }
    axios.get(search_api_url, { params })
    .then(res => {
      setResults(res.data.results);
    })
    .catch(err => console.error("Errore nel fetch dei dati:", err));
  }

  const fetchMovieInfo = (movie_id) =>{
    axios.get(`${movieinfo_api_url}${movie_id}`, { params: infoparams })
    .then(res => {
      setMovieInfo(res.data);
    })
    .catch(err => console.error("Errore nel fetch delle info del film:", err));
  }

  const fetchTvInfo = (tv_id) =>{
    axios.get(`${tvinfo_api_url}${tv_id}`, { params: infoparams })
    .then(res => {
      setTvInfo(res.data);
    })
    .catch(err => console.error("Errore nel fetch delle info della serie TV:", err));
  }

  return (
    <DataContext.Provider value={{ formData, setFormData, results, fetchData, fetchMovieInfo, movieInfo, fetchTvInfo, tvInfo, fetchGenres, genres }}>
      {children}
    </DataContext.Provider>
  )
}

const useDataContext = () => useContext(DataContext);
export { DataProvider, useDataContext }
