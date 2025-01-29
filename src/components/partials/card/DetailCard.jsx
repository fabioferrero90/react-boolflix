import { Swiper, SwiperSlide } from 'swiper/react'
import { FaStar } from "react-icons/fa";

const DetailCard = ({data, type}) => {
  const cardData = {}

  if (type == "tv") {
    cardData.title = data.name;
    cardData.img = `https://image.tmdb.org/t/p/w342/${data.poster_path}`;
  } else if (type == "people") {
    cardData.role = data.known_for_department == "Acting" ? "Attore" : data.known_for_department;
    cardData.title = `${data.name} - ${cardData.role}`;
    cardData.img = `https://image.tmdb.org/t/p/w342/${data.profile_path}`;
  } else if (type == "movie") {
    cardData.title = data.title;
    cardData.img = `https://image.tmdb.org/t/p/w342/${data.poster_path}`;
  }

  if (type == "tv" || type == "movie") {
    cardData.stars = Math.floor(data.vote_average / 2);
    if (type == "tv") {
      cardData.release = data.first_air_date.split("-")[0];
    } else {
      cardData.release = data.release_date.split("-")[0];
    }
  }

  const getLangFlag = (lang) => {
    if (lang == "en") {
        return "https://flagsapi.com/US/flat/64.png";
    } else {
        return `https://flagsapi.com/${lang.toUpperCase()}/flat/64.png`;
    }
}


  return (
    <SwiperSlide>
      <img
        className="card-img-top"
        alt={cardData.title}
        src={cardData.img}
        onError={(e) => { e.target.onerror = null; e.target.src = '/comingsoon.png'; }} 
      />
      <h1 className="swiperTitle">{cardData.title}</h1>
      {type == "people" ? (
        <p className="swiperInfo">
          <h5>Popolarità: {data.popularity}</h5>
          <div>
            <p><strong>Conosciuto per:</strong></p>
            <ul>
              {data.known_for.map((known, index) => (
              <li key={index}>{known.title || known.name}</li>
            ))}
            </ul>
          </div>
        </p>
      ) : (
        <p className="swiperInfo">
          <div className="stars">
          {Array.from({ length: cardData.stars }).map((_, i) => (
              <FaStar key={i} />
          ))}
          </div>
          <p className="text-center">
            <strong>Lingua originale: </strong>
            <img className="langFlag" src={getLangFlag(data.original_language)}/>
            <p><strong>Titolo Originale:</strong> {data.original_title || data.original_name}</p>
            <p><strong>Anno di uscita:</strong> {cardData.release}</p>

          </p>
          <p><strong>Riassunto: </strong><br/>{data.overview}</p>
          
        </p>
      )} 
    </SwiperSlide>
  )
}

export default DetailCard