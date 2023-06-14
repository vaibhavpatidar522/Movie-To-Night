import { MdArrowBack } from "react-icons/md";
import "./watch.scss";
import { Link , useLocation } from "react-router-dom";

export default function Watch() {
   const location = useLocation();
  const movie = location.movie;
  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <MdArrowBack />
          Home
        </div>
      </Link>
      <video className="video" autoPlay progress controls src={movie.video} />
    </div>
  );
}