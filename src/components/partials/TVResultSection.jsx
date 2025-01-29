import { Swiper , SwiperSlide } from 'swiper/react'
import { FreeMode, Pagination } from 'swiper/modules';
import DetailCard from './card/DetailCard';

const TVResultSection = ({tvList}) => {

  return (
    <div className="my-4">
      <h4 className="category-title pt-4">Serie TV trovate: {tvList.length}</h4>
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
        {tvList.map(tv => (
          <SwiperSlide key={tv.id}>
            <DetailCard key={tv.id} data={tv} type="tv" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default TVResultSection