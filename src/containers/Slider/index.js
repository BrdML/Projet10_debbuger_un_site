import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
  // erreur : setTimeout & byDateDesc.length undefined
  const nextCard = () => {
    setIndex((prevIndex) =>
    prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
    );
    };
    useEffect(() => {
    const timerId = setTimeout(() => nextCard(), 5000);
    const handleKeyDown = (event) => {
    if (event.keyCode === 32) {clearTimeout(timerId);
    }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => clearTimeout(timerId);
    }, [index, byDateDesc]);
  // Erreur : map key unique
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (   
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
        ))}
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {/* Erreur : key et checked */}
              {byDateDesc?.map((dot, radioIdx) => (
                <input
                  key={`${dot.title}`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  readOnly
                />
              ))}
            </div>
          </div>
    </div>
  );
};

export default Slider;
