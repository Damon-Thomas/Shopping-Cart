import { Link } from "react-router-dom";
import shopImage from "./assets/heidi-fin-2TLREZi7BUg-unsplashcompressed.jpg"
import "./homePage.css"

const Homepage = () => {
  return (
    <div className="mainHome">
      <h1 className="pageTitle">Home</h1>
      <div className="homeContent">
        <div className="imageContainer">
          <img className="shopImage" src={shopImage} alt="" />
          <p className="imgCredit">Photo by <a href="https://unsplash.com/@framesbyfin?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Heidi Fin</a> on <a href="https://unsplash.com/photos/person-walking-inside-building-near-glass-2TLREZi7BUg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
          </p>
        </div>
        <div className="homeTextContainer">
          <h2 className="homeSubtitle">Shop Online Today</h2>
          <p className="homeBody">Come see the variety of products wer have on offer. Visit out shop page and choose from over 3 categories of items and more than 19 total items! Our checkout function is not working right now, but it should be up and running Q3 of 2179. Shop is a working demo and does not accept any form of currency. I hope you enjoy the random products. </p>
        </div>
      </div>

    </div>
  );
};

export default Homepage;