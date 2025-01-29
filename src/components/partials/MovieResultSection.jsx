import { Swiper , SwiperSlide } from 'swiper/react'
import { FreeMode, Pagination } from 'swiper/modules';
import DetailCard from './card/DetailCard';
const MovieResultSection = ({movieList}) => {
  return (
    <div className="result-slider my-4">
      <h4 className="category-title pt-4">Film trovati: {movieList.length}</h4>
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
        {movieList.map(movie => (
          <SwiperSlide key={movie.id}>
            <DetailCard data={movie} type="movie" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default MovieResultSection