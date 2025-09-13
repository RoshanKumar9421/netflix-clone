

import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data';
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZmE1MTMwYTNkYmFhMjQ2YjFmMGEwMmI3ZjA1MTViNyIsIm5iZiI6MTc1NjY3NTk3NS44MjQsInN1YiI6IjY4YjRiZjg3MjVlMTAzYjg5ZjM5N2U4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vrjhSvmtn9TmmSIcxNCBR_z4ZkNC-Ja0JsGafMGx4cI',
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollBy({
      left: event.deltaY,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const currentRef = cardsRef.current;

    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : 'now_playing'
      }?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results || []))
      .catch((err) => console.error(err));

    if (currentRef) {
      currentRef.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wheel', handleWheel);
      }
    };
  }, [category]);

  return (
    <div className="title-cards">
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link  to={`/player/${card.id}`} className="card" key={index}>
            <img
              src={
                card.backdrop_path
                  ? 'https://image.tmdb.org/t/p/w500' + card.backdrop_path
                  : '/fallback-image.jpg'
              }
              alt={card.original_title || card.name || 'Movie'}
            />
            <p>{card.original_title || card.name || 'Untitled'}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;


