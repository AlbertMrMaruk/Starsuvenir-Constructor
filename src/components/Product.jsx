import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaCheck, FaPen, FaRubleSign } from "react-icons/fa";

function Product({
  color,
  setColor,
  setContHeight,
  setContWidth,
  setModal,
  activeRazmer,
  setActiveRazmer,
  setProductsModal,
  activeProduct,
  setActivePrice,
  activePrice,
}) {
  const changeRazmer = (str, width, height, index) => {
    setActiveRazmer(str);
    setContWidth(width);
    setContHeight(height);
    setActivePrice(activeProduct.prices[index]);
  };
  return (
    <>
      <div className="aside-content">
        <h4>
          {activeProduct.name}
          <FaPen
            size={".75em"}
            style={{ marginLeft: ".97rem", cursor: "pointer" }}
            onClick={() => setProductsModal(true)}
          />
        </h4>

        <a href={activeProduct.url}>Информация о товаре</a>

        <div className="charact-wrapp">
          <span className="charact-text-primary">Размеры принта: </span>
          <div className="sizes-container">
            {activeProduct.razmers.map((el, index) => (
              <div key={index}>
                <button
                  className={`sizes-button ${
                    activeRazmer === el.text ? "sizes-button-active" : ""
                  }`}
                  onClick={() =>
                    changeRazmer(el.text, el.width, el.height, index)
                  }
                >
                  {el.text}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="charact-wrapp">
          <span className="charact-text-primary">Цвет: </span>
          <div className="sizes-container">
            <div>
              <button
                className={`sizes-button `}
                style={{
                  backgroundColor: "green",
                  color: "#223873",
                  padding: "0.4rem 0.5rem",
                }}
                onClick={() => setColor("transparent")}
              >
                <FaCheck
                  size={"1.1em"}
                  style={{
                    opacity: color === "transparent" ? "1" : "0",
                  }}
                />
              </button>
            </div>
            <div>
              <button
                className={`sizes-button `}
                style={{
                  backgroundColor: "rgb(255,255,255)",
                  color: "#223873",
                  padding: "0.4rem 0.5rem",
                }}
                onClick={() => setColor([255, 255, 255])}
              >
                <FaCheck
                  size={"1.1em"}
                  style={{
                    opacity:
                      color[0] === 255 && color[1] === 255 && color[2] === 255
                        ? "1"
                        : "0",
                  }}
                />
              </button>
            </div>

            <div>
              <button
                className={`sizes-button`}
                style={{
                  backgroundColor: "rgb(0,0,0)",
                  color: "white",
                  padding: "0.4rem 0.5rem",
                }}
                onClick={() => setColor([0, 0, 0])}
              >
                <FaCheck
                  size={"1.1em"}
                  style={{
                    opacity:
                      color[0] === 0 && color[1] === 0 && color[2] === 0
                        ? "1"
                        : "0",
                  }}
                />
              </button>
            </div>
          </div>
          <div className="color-gener">
            <input
              type="text"
              id="box"
              value={
                color === "transparent" ? color : `rgb(${color.join(",")})`
              }
              onChange={(e) =>
                setColor(
                  e.target.value.split("rgb(")[1].slice(0, -1).split(",")
                )
              }
            />
            <p className="color-gener-text">Красный:</p>
            <input
              type="range"
              id="red"
              value={color[0]}
              onChange={(e) => {
                setColor([e.target.value, color[1], color[2]]);
              }}
              min="0"
              max="255"
            />
            <p className="color-gener-text">Зеленый:</p>
            <input
              type="range"
              id="green"
              value={color[1]}
              onChange={(e) => {
                setColor([color[0], e.target.value, color[2]]);
              }}
              min="0"
              max="255"
            />
            <p className="color-gener-text">Синий:</p>
            <input
              type="range"
              id="blue"
              value={color[2]}
              onChange={(e) => {
                setColor([color[0], color[1], e.target.value]);
              }}
              min="0"
              max="255"
            />
          </div>
        </div>
        <div className="product-main-info">
          <p className="product-price-info">
            {activePrice}
            <FaRubleSign size={".8em"} />
          </p>
          <div
            className="product-price-button btn btn-orange"
            onClick={() => setModal(true)}
          >
            <AiOutlineShoppingCart size={"1.5em"} /> Оформить заказ
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
