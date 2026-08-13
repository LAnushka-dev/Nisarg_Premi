import React from "react";
import { useNavigate } from "react-router-dom";

// Now using YOUR real photos from /public/images instead of stock images.
// Any file placed in the "public" folder can be referenced with a path
// starting at "/" - React doesn't process these, the browser just serves them directly.
function Home() {
  const navigate = useNavigate();

  function handleReadMore() {
    navigate("/tours");
  }

  // Clicking a tag now ACTUALLY filters - it navigates to /tours?category=Beach
  // TourList.js reads that ?category=... value and calls the backend's
  // /api/tours/category/{category} endpoint instead of fetching everything.
  function handleTagClick(category) {
    navigate(`/tours?category=${category}`);
  }

  return (
    <div className="container">
      <div className="slideshow">
        <img src="/images/homepage1.jpg" alt="Nature scene 1" />
        <img src="/images/homepage2.jpg" alt="Nature scene 2" />
        <img src="/images/homepage3.jpg" alt="Nature scene 3" />
        <img src="/images/homepage4.png" alt="Nature scene 4" />
        <img src="/images/homepage5.png" alt="Nature scene 5" />
        <img src="/images/homepage6.jpg" alt="Nature scene 6" />
        <img src="/images/homepage32.png" alt="Nature scene 7" />
        <img className="logo" src="/Naturedrive.png" alt="Nisarg Premi logo" />
      </div>

      <div className="content">
        <div className="tags">
          <button onClick={() => handleTagClick("Safari")}>Safari</button>
          <button onClick={() => handleTagClick("Beach")}>Beach</button>
          <button onClick={() => handleTagClick("Mountain")}>Mountain</button>
        </div>

        <h2>Nisarg Premi - Your gateway to Scenic journeys!</h2>
        <p>
          Welcome to Nature Drive, where every journey takes you closer to the heart of nature.
          Whether it's the tranquil embrace of a hidden lake, the breathtaking peaks of mighty
          mountains, or the untamed wilderness calling for adventure — your perfect escape awaits!
          Discover hidden gems and stunning landscapes, embrace sustainable tourism and
          nature-friendly routes and plan your trips with our handpicked travel insights.
          Let the world inspire you. Let nature be your guide. Start your adventure today!
        </p>
      </div>

      <div style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>
        <button className="read-more" onClick={handleReadMore}>
          Read More
        </button>
      </div>
    </div>
  );
}

export default Home;
