


import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';

const Player = () => {
  const navigate = useNavigate();
  const { id } = useParams();
 

  const [apiData, setApiData] = useState({});

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZmE1MTMwYTNkYmFhMjQ2YjFmMGEwMmI3ZjA1MTViNyIsIm5iZiI6MTc1NjY3NTk3NS44MjQsInN1YiI6IjY4YjRiZjg3MjVlMTAzYjg5ZjM5N2U4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vrjhSvmtn9TmmSIcxNCBR_z4ZkNC-Ja0JsGafMGx4cI',
    },
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then((res) => res.json())
      .then((res) => {
        console.log("Video API Response:", res); // ✅ Debug log
        const video = res.results?.find(
          (v) => v.site === 'YouTube' && v.type === 'Trailer'
        );
        setApiData(video || {});
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt="Back"
        className="back-button"
        onClick={() => navigate(-1)}
      />

      {apiData?.key ? (
        <iframe
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title={apiData.name || 'Trailer'}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <p>No trailer available</p>
      )}

      <div className="player-info">
        <p>{apiData.published_at?.slice(0, 10) || 'Unknown date'}</p>
        <p>{apiData.name || 'No title'}</p>
        <p>{apiData.type || 'No type'}</p>
      </div>
    </div>
  );
};

export default Player;
