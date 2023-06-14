import "./listItem.scss";
import {MdPlayArrow} from 'react-icons/md'
import {BiDislike , BiLike} from 'react-icons/bi'
import {IoAddSharp} from 'react-icons/io5'
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ListItem({ index , item}) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/movies/find/" + item, {
          headers: {
            token:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODg0MzhiZjE0NTA0ZjkwMmE5ZjY5NiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4NjY2MDQyNCwiZXhwIjoxNjg3MDkyNDI0fQ.kjZVKMPNzoEjTMv_kbXrNwasDhTSXCEivXPhBHG1TaI"
            // "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);
  
  return (
    <Link to={{ pathname: "/watch", movie: movie }}>

    <div
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      >
      <img
        src={movie?.imgSm}
        alt=""
        />
      {isHovered && (
        <>
          <video src={movie?.trailer} autoPlay={true} loop />
          <div className="itemInfo">
            <div className="icons">
              <MdPlayArrow className="icon" />
              <IoAddSharp className="icon" />
              <BiLike className="icon" />
              <BiDislike className="icon" />
            </div>
            <div className="itemInfoTop">
              <span>{movie?.duration}</span>
              <span className="limit">+{movie?.limit}</span>
              <span>{movie?.year}</span>
            </div>
            <div className="desc">{movie?.desc}</div>
              <div className="genre">{movie?.genre}</div>
          </div>
        </>
      )}
    </div>
      </Link>
  );
}