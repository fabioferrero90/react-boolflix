import React from 'react';
import { SwiperSlide } from 'swiper/react';
import { FaStar, FaRegStar } from "react-icons/fa";

const DetailCard = ({data, type}) => {
  const cardData = {
    cast: []
  };

  if (type === "tv") {
    cardData.title = data.name;
    cardData.img = `https://image.tmdb.org/t/p/w342/${data.poster_path}`;
    cardData.release = data.first_air_date.split("-")[0];
  } else if (type === "people") {
    cardData.role = data.known_for_department === "Acting" ? "Attore" : data.known_for_department;
    cardData.title = `${data.name} - ${cardData.role}`;
    cardData.img = `https://image.tmdb.org/t/p/w342/${data.profile_path}`;
  } else if (type === "movie") {
    cardData.title = data.title;
    cardData.img = `https://image.tmdb.org/t/p/w342/${data.poster_path}`;
    cardData.release = data.release_date.split("-")[0];
  }

  if (type === "tv" || type === "movie") {
    if (data.cast && data.cast.length > 0) {
      cardData.cast = data.cast.slice(0, 5);
    }
    cardData.stars = Math.floor(data.vote_average / 2);
    cardData.overview = data.overview ? data.overview.substring(0, 200) + "..." : "";
  }

  const getLangFlag = (lang) => {
    switch (lang) {
      case "en":
        return "https://flagsapi.com/US/flat/64.png";
      case "ja":
        return "https://flagsapi.com/JP/flat/64.png";
      default:
        return `https://flagsapi.com/${lang.toUpperCase()}/flat/64.png`;
    }
  };

  return (
    <SwiperSlide>
      <img
        className="card-img-top"
        alt={cardData.title}
        src={cardData.img}
        onError={(e) => { e.target.onerror = null; e.target.src = '/comingsoon.png'; }} 
      />
      <h1 className="swiperTitle">{cardData.title}</h1>
      {type === "people" ? (
        <div className="swiperInfo">
          <h5>Popolarità: {data.popularity}</h5>
          <div>
            <p><strong>Conosciuto per:</strong></p>
            <ul>
              {data.known_for.map((known, index) => (
                <li key={index}>{known.title || known.name}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="swiperInfo">
          <div className="stars">
            {Array.from({ length: 5 }).map((_, i) => (
              i < cardData.stars ? <FaStar key={i} /> : <FaRegStar key={i} />
            ))}
          </div>
          <div className="text-center">
            <strong>Lingua originale: </strong>
            <img className="langFlag" src={getLangFlag(data.original_language)} alt="flag" />
            <p><strong>Titolo Originale:</strong> {data.original_title || data.original_name}</p>
            <p><strong>Anno di uscita:</strong> {cardData.release}</p>
          </div>
          {cardData.overview && (
            <p><strong>Riassunto: </strong><br />{cardData.overview}</p>
          )}
          {cardData.cast.length > 0 && (
            <>
              <h3 className="text-center">Cast:</h3>
              <div className="cast flex justify-content-center">
                {cardData.cast.map((actor, index) => (
                  actor.profile_path && (
                    <img 
                      key={index}
                      className='actorImg'
                      src={`https://image.tmdb.org/t/p/w45${actor.profile_path}`}
                      alt={actor.name}
                      title={actor.name}
                    />
                  )
                ))}
              </div>
            </>
          )}
        </div>
      )} 
    </SwiperSlide>
  );
}

export default DetailCard;