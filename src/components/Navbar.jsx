import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
function Navbar({ setSrc, setFiles }) {
  const [showUpload, setShowUpload] = useState(false);
  return (
    <header className="navbar">
      <div className="container">
        <nav className="grid-columns">
          <div className="img-wrapp">
            <a href="https://starsuvenir.ru">
              <img
                src="https://starsuvenir.ru/wa-data/public/shop/products/14/webp/data/public/site/themes/ahead/assets/img/logo.webp?v1608668271?v1.3.2.4"
                alt="Логотип StarSuvenir"
              />
            </a>
            <div className="img-text">
              <h2>Производство сувениров</h2> <span>и бизнес-продукции</span>
            </div>
          </div>

          <ul className="phone-wrapp">
            <li>
              <FaPhoneAlt
                className="icon-prev"
                color="#e3c115"
                size={"1.4em"}
              />
              <a href="tel:+74950325757">+7 495 032-57-57</a>
            </li>
            <li>
              <FaEnvelope
                className="icon-prev"
                color="#e3c115"
                size={"1.4em"}
              />
              <a href="mailto:info@starsuvenir.ru">info@starsuvenir.ru</a>
            </li>
          </ul>
        </nav>
        <button
          className="addElementButton"
          onClick={() => setShowUpload(!showUpload)}
        >
          <AiOutlinePlus />
        </button>
        <div className={`fileUpload ${!showUpload ? "hidden" : ""}`}>
          Изображение
          <input
            type="file"
            onChange={(e) => {
              let fr = new FileReader();
              fr.onload = function (e) {
                setSrc(e.target.result);
                setFiles((pre) => [...pre, { src: e.target.result }]);
              };
              fr.readAsDataURL(e.target.files[0]);
            }}
            id="file"
          />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
