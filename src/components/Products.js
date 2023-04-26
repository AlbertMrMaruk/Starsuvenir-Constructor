import futb2 from "../assets/futb2.png";
import futb from "../assets/futb.png";
import hoodie from "../assets/hoodie.png";
import krusk from "../assets/krusk.png";
import beysb from "../assets/beysb.png";

const products = [
  {
    id: 1,
    url: "https://starsuvenir.ru/promo-odezhda/futbolki-dlya-promo/",
    name: "Футболки хлопок на заказ",
    img: futb2,
    width: "96%",
    height: "80%",
    margin: "10rem auto 0",
    contWidth: "300",
    contHeight: "310",
    razmers: [
      { text: "300x310мм", width: 300, height: 310 },
      { text: "300x200мм", width: 300, height: 200 },
      { text: "200x300мм", width: 200, height: 300 },
      { text: "150x200мм", width: 150, height: 200 },
    ],
    prices: [1350, 1300, 1250, 1200],
  },
  {
    id: 2,
    url: "https://starsuvenir.ru/promo-odezhda/futbolki-dlya-promo/",
    name: "Футболки полиэстер на заказ ",
    img: futb,
    //"https://starsuvenir.ru/wa-data/public/site/themes/ahead/assets/img/futb.714567385e70d9b055d5.png"
    width: "86%",
    height: "80%",
    margin: "10rem auto 0",
    contWidth: "300",
    contHeight: "310",
    razmers: [
      { text: "300x310мм", width: 300, height: 310 },
      { text: "300x200мм", width: 300, height: 200 },
      { text: "200x300мм", width: 200, height: 300 },
      { text: "150x200мм", width: 150, height: 200 },
    ],
    prices: [1200, 1150, 1100, 1000],
  },
  {
    id: 3,
    url: "https://starsuvenir.ru/magnity-standartnoy-formy.php",
    name: "Бейсболки на заказ",
    img: beysb,
    //"https://starsuvenir.ru/wa-data/public/site/themes/ahead/assets/img/beysb.679c8bbb0978d05920a9.png"
    width: "50%",
    height: "40%",
    margin: "6.5rem auto 0",
    contWidth: "220",
    contHeight: "80",
    razmers: [
      { text: "120х50мм", width: 220, height: 80 },
      { text: "70х50мм", width: 120, height: 70 },
    ],
    prices: [530, 500],
  },
  {
    id: 4,
    url: "https://starsuvenir.ru/magnity-standartnoy-formy.php",
    name: "Кружки на заказ",
    img: krusk,
    // "https://starsuvenir.ru/wa-data/public/site/themes/ahead/assets/img/krusk.70920290a1ee21840c53.png"
    width: "65%",
    height: "60%",
    margin: "6.5rem 5rem 0 1.25rem",
    contWidth: "260",
    contHeight: "260",
    razmers: [{ text: "60х60мм", width: 260, height: 260 }],
    prices: [650],
  },
  // {
  //   id: 5,
  //   url: "https://starsuvenir.ru/magnity-standartnoy-formy.php",
  //   name: "Сумка-шоппер на заказ",
  //   img: "https://starsuvenir.ru/wa-data/public/site/themes/ahead/assets/img/sumka.e02ba74150d4fdc6fca5.png",
  //   width: "85%",
  //   height: "80%",
  //   margin: "18rem auto 0",
  //   contWidth: "300",
  //   contHeight: "310",
  //   razmers: [
  //     { text: "300x310мм", width: 300, height: 310 },
  //     { text: "300x200мм", width: 300, height: 200 },
  //     { text: "200x300мм", width: 200, height: 300 },
  //     { text: "150x200мм", width: 150, height: 200 },
  //   ],
  //   prices: [2.1, 2.63, 3.97, 3.5, 5.17],
  // },
  {
    id: 6,
    url: "https://starsuvenir.ru/magnity-standartnoy-formy.php",
    name: "Толстовка полиэстер на заказ",
    img: hoodie,
    //"https://starsuvenir.ru/wa-data/public/site/themes/ahead/assets/img/hoodie.0fb6d3c530dd17e4f95e.png"
    width: "80%",
    height: "85%",
    margin: "10rem auto 0 auto",
    contWidth: "250",
    contHeight: "310",
    razmers: [
      { text: "300x310мм", width: 250, height: 310 },
      { text: "300x200мм", width: 250, height: 200 },
      { text: "200x300мм", width: 200, height: 300 },
      { text: "150x200мм", width: 150, height: 200 },
    ],
    prices: [2050, 2000, 1950, 1850],
  },
];
export default products;
