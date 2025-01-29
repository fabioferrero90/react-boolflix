import { useState, useEffect } from 'react';
import { Swiper , SwiperSlide } from 'swiper/react'
import { FreeMode, Pagination } from 'swiper/modules';
import DetailCard from './partials/card/DetailCard';
import axios from 'axios';
const HomePage = () => {
  const discover_movie_api_url = "https://api.themoviedb.org/3/discover/movie"
  const discover_tv_api_url = "https://api.themoviedb.org/3/tv/top_rated"
  const [discovermovieList, setDiscovermovieList] = useState([]);
  const [discovertvList, setDiscovertvList] = useState([]);
  const api_key = import.meta.env.VITE_TMDB_API_KEY;

  const fetchTrending = (query) =>{
    const params = {
      api_key,
      language: 'it-IT',
    }
    axios.get(discover_movie_api_url, { params })
    .then(res => {
      setDiscovermovieList(res.data.results);
    })
    .catch(err => console.error("Errore nel fetch dei dati:", err));
    axios.get(discover_tv_api_url, { params })
    .then(res => {
      setDiscovertvList(res.data.results);
    })
    .catch(err => console.error("Errore nel fetch dei dati:", err));
  }

  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <>
    <div className="result-slider my-4">
      <h4 className="category-title pt-4">Quale film guardare oggi?</h4>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="boolflixSwiper"
      >
        {discovermovieList.map(movie => (
          <SwiperSlide key={movie.id}>
            <DetailCard data={movie} type="movie" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    <div className="result-slider my-4">
      <h4 className="category-title pt-4">O preferisci una serie tv?</h4>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="boolflixSwiper"
      >
        {discovertvList.map(tv => (
          <SwiperSlide key={tv.id}>
            <DetailCard data={tv} type="tv" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </>
  )
}

export default HomePage