import { Swiper , SwiperSlide } from 'swiper/react'
import { FreeMode, Pagination } from 'swiper/modules';
import DetailCard from './card/DetailCard';

const PeopleResultSection = ({peopleList}) => {
  return (
    <div className="my-4">
      <h4 className="category-title pt-4">Persone trovate: {peopleList.length} </h4>
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
        {peopleList.map((people, index )=> (
          <SwiperSlide key={people.id}>
            <DetailCard data={people} type="people" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default PeopleResultSection