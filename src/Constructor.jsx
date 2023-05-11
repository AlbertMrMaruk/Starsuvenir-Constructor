import { useCallback, useState } from "react";
import Navbar from "./components/Navbar";
import { AiFillCloseCircle, AiFillDelete } from "react-icons/ai";
import CanvasComponent from "./components/CanvasComponent";
import Product from "./components/Product";
import html2canvas from "html2canvas";
import { products, fonts } from "./components/Products";
import { FaCheck } from "react-icons/fa";

export default function Constructor() {
  // Получение параметрова ссылки (Id Продукта)
  const paramsSearch = document.location.search;
  const searchParams = new URLSearchParams(paramsSearch);
  const [productId, setProductId] = useState(searchParams.get("product") || 1);
  const [activeProduct, setActiveProduct] = useState(products[+productId - 1]);
  const [activeRazmer, setActiveRazmer] = useState(
    activeProduct.razmers[0].text
  );
  const [activeBorder, setActiveBorder] = useState(true);
  const [activePrice, setActivePrice] = useState(activeProduct.prices[0]);
  const [files, setFiles] = useState([]);
  const [activeEl, setActiveEl] = useState("product");
  const [activeImg, setActiveImg] = useState(0);
  const [productsModal, setProductsModal] = useState(false);
  const [src, setSrc] = useState("");
  const [text, setText] = useState("");
  const [fontColor, setFontColor] = useState(["white", [255, 255, 255]]);
  const [fontFamily, setFontFamily] = useState("Open Sans");
  const [fontSize, setFontSize] = useState(16);
  const addSrc = useCallback((newSrc) => setSrc(newSrc), [src]);
  const addText = useCallback((newText) => setText(newText), [text]);
  const addFontFamily = useCallback(
    (newFontFamily) => setFontFamily(newFontFamily),
    [fontFamily]
  );
  const addFontColor = useCallback(
    (newFontColor) => setFontColor(newFontColor),
    [fontColor]
  );
  const addFontSize = useCallback(
    (newFontSize) => setFontSize(newFontSize),
    [fontSize]
  );
  const [color, setColor] = useState("transparent");

  const [contHeight, setContHeight] = useState(activeProduct.contHeight);
  const [modal, setModal] = useState(false);
  const [contWidth, setContWidth] = useState(activeProduct.contWidth);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    img: "",
  });

  const uploadFormData = (url) => {
    formData.img = url;
    let http = new XMLHttpRequest();
    http.open("POST", "assets/templates/react-build/static/js/mail.php", true);
    http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    console.log(
      "name=" +
        formData.name +
        "&phone=" +
        formData.phone +
        "&email=" +
        formData.email +
        "&img=" +
        formData.img
    );
    http.send(
      "name=" +
        formData.name +
        "&phone=" +
        formData.phone +
        "&email=" +
        formData.email +
        "&img=" +
        formData.img
    );
    http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
        alert(
          formData.name +
            ", Ваша заявка получена.\nНаши специалисты ответят Вам в течении часа.\n"
        );
        setFormData({ name: "", email: "", img: "", phone: "" });
        setModal(false);
      }
    };
    http.onerror = function () {
      alert("Извините, данные не были переданы");
    };
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    html2canvas(document.querySelector(".canvas-wrapp")).then((canvas) => {
      canvas.toBlob((blob) => {
        let newImg = document.createElement("img"),
          url = URL.createObjectURL(blob);

        newImg.onload = function () {
          URL.revokeObjectURL(url);
          console.log(url);
          uploadFormData(url);
        };
        newImg.src = url;
      }, "JPEG");
    });
  };
  const changeValue = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <>
      <Navbar setSrc={addSrc} setText={addText} setFiles={setFiles} />
      <main>
        <div className="container grid-main-columns">
          <aside>
            <div className="aside-wrapp">
              <div className="aside-header activePage">Файлы</div>
              <ul className="files">
                {files.map((file, index) => {
                  return (
                    <li
                      key={index}
                      className={`${activeImg === index ? "active" : ""}`}
                      onClick={(e) => {
                        if (
                          !e.target.classList.contains("icons") &&
                          !e.target.closest(".icons")
                        ) {
                          addSrc(file.src);
                        }
                        setActiveImg(index);
                      }}
                    >
                      <img src={file.src} crossOrigin="anonymous" alt="" />
                      Объект №{index + 1}
                      <div
                        className="icons"
                        onClick={() => {
                          setFiles((prev) => {
                            let filesCop = prev.slice();
                            filesCop.splice(index, 1);
                            return filesCop;
                          });
                          addSrc("");
                        }}
                      >
                        <AiFillDelete size={"1.3em"} color="#cc3300" />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
          <div
            className="main-wrapp"
            style={{
              background: `no-repeat center/cover url(${activeProduct.img})`,
              width: activeProduct.width,
              paddingLeft: "0.25rem",
              height: activeProduct.height,
            }}
          >
            <div
              className="canvas-wrapp"
              style={{
                margin: activeProduct.margin,
                backgroundColor:
                  color == "transparent" ? color : `rgb(${color.join(",")})`,
                border: activeBorder ? "2px dotted #c2c2c2" : "none",
                width: +contWidth,
                height: +contHeight,
              }}
            >
              <CanvasComponent
                src={src}
                text={text}
                fontColor={fontColor}
                fontSize={fontSize}
                fontFamily={fontFamily}
              />
            </div>
          </div>

          <aside>
            <div className="aside-wrapp">
              <div className="pagination">
                <div
                  onClick={() => setActiveEl("product")}
                  className={activeEl === "product" ? "activePage" : ""}
                >
                  Продукт
                </div>
                <div
                  onClick={() => {
                    setActiveEl("object");
                  }}
                  className={activeEl === "object" ? "activePage" : ""}
                >
                  Текст
                </div>
              </div>
              {activeEl === "product" && (
                <Product
                  color={color}
                  setActiveBorder={setActiveBorder}
                  setColor={setColor}
                  setContHeight={setContHeight}
                  setContWidth={setContWidth}
                  activeProduct={activeProduct}
                  setProductsModal={setProductsModal}
                  setModal={setModal}
                  setActiveRazmer={setActiveRazmer}
                  activeRazmer={activeRazmer}
                  activePrice={activePrice}
                  setActivePrice={setActivePrice}
                />
              )}
              {activeEl === "object" && (
                <div className="aside-content">
                  <h4 className="object__aside-content__text">
                    Введите ваш текст:
                  </h4>
                  <textarea
                    type="text"
                    name="text"
                    value={text}
                    id="text"
                    placeholder="Напишите текст"
                    className="object__aside-content__textarea"
                    onChange={(e) => addText(e.target.value)}
                  />

                  <h4 className="object__aside-content__text">Цвет текста:</h4>
                  <div className="sizes-container">
                    <div>
                      <button
                        className={`sizes-button `}
                        style={{
                          backgroundColor: "rgb(255,255,255)",
                          color: "#223873",
                          padding: "0.4rem 0.5rem",
                        }}
                        onClick={() => addFontColor(["white", [255, 255, 255]])}
                      >
                        <FaCheck
                          size={"1.1em"}
                          style={{
                            opacity: fontColor[0] === "white" ? "1" : "0",
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
                        onClick={() => addFontColor(["black", [0, 0, 0]])}
                      >
                        <FaCheck
                          size={"1.1em"}
                          style={{
                            opacity: fontColor[0] === "black" ? "1" : "0",
                          }}
                        />
                      </button>
                    </div>
                    <div>
                      <button
                        className={`sizes-button`}
                        style={{
                          backgroundColor: "rgb(255,0,0)",
                          color: "white",
                          padding: "0.4rem 0.5rem",
                        }}
                        onClick={() => addFontColor(["red", [255, 0, 0]])}
                      >
                        <FaCheck
                          size={"1.1em"}
                          style={{
                            opacity: fontColor[0] === "red" ? "1" : "0",
                          }}
                        />
                      </button>
                    </div>
                    <div>
                      <button
                        className={`sizes-button`}
                        style={{
                          backgroundColor: "rgb(0,0,255)",
                          color: "white",
                          padding: "0.4rem 0.5rem",
                        }}
                        onClick={() => addFontColor(["blue", [0, 0, 255]])}
                      >
                        <FaCheck
                          size={"1.1em"}
                          style={{
                            opacity: fontColor[0] === "blue" ? "1" : "0",
                          }}
                        />
                      </button>
                    </div>
                    <div>
                      <button
                        className={`sizes-button`}
                        style={{
                          backgroundColor: "rgb(255,255,0)",
                          color: "black",
                          padding: "0.4rem 0.5rem",
                        }}
                        onClick={() => addFontColor(["yellow", [0, 0, 255]])}
                      >
                        <FaCheck
                          size={"1.1em"}
                          style={{
                            opacity: fontColor[0] === "yellow" ? "1" : "0",
                          }}
                        />
                      </button>
                    </div>
                  </div>

                  <h4 className="object__aside-content__text">
                    Размер текста:
                    <input
                      type="number"
                      name="size"
                      className="object__aside-content__input"
                      id="size"
                      value={fontSize}
                      placeholder="25"
                      onChange={(e) => addFontSize(e.target.value)}
                    />
                    px
                  </h4>
                  <h4 className="object__aside-content__text">
                    Выберите шрифт:
                    <select
                      name="fontFamily"
                      className="object__aside-content__select"
                      onChange={(e) => addFontFamily(e.target.value)}
                      value={fontFamily}
                    >
                      {fonts.map((el, index) => (
                        <option
                          key={index}
                          value={el}
                          id={"object__aside-content__font" + index}
                          style={{ fontFamily: el }}
                        >
                          {el}
                        </option>
                      ))}
                    </select>
                  </h4>
                </div>
              )}
            </div>
          </aside>
        </div>
        <div className={`modal ${modal ? "" : "hidden"}`}>
          <div className="modal-wrapper">
            <h3>Оставить заявку</h3>
            <AiFillCloseCircle
              className="close-btn"
              onClick={() => setModal(false)}
              color="#e3c115"
              size={"2.5em"}
            />
            <form onSubmit={onSubmit}>
              <input
                type="text"
                id="name"
                name="name"
                onChange={changeValue}
                value={formData.name}
                className="input-form"
                placeholder="Ваше имя"
              />
              <input
                type="text"
                className="input-form"
                onChange={changeValue}
                value={formData.phone}
                name="phone"
                id="phone"
                placeholder="Телефон"
              />
              <input
                type="text"
                className="input-form"
                onChange={changeValue}
                value={formData.email}
                name="email"
                id="email"
                placeholder="Email"
              />
              <input type="submit" className="input-btn" />
            </form>
          </div>
        </div>
        <div className={`modal ${productsModal ? "" : "hidden"} `}>
          <div className="modal-wrapper modalProducts">
            <h3>Выбрать продукт</h3>
            <AiFillCloseCircle
              className="close-btn"
              onClick={() => setProductsModal(false)}
              color="#e3c115"
              size={"2.5em"}
            />
            <div className="products">
              {products.map((el, index) => (
                <div
                  className="product"
                  key={index}
                  onClick={() => {
                    setProductId(index);
                    setActiveRazmer(el.razmers[0].text);
                    setContWidth(el.contWidth);
                    setContHeight(el.contHeight);
                    setActivePrice(el.prices[0]);
                    setActiveProduct(el);
                    setProductsModal(false);
                  }}
                >
                  {el.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
