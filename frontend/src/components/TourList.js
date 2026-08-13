import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAllTours, getToursByCategory } from "../api";

function TourList() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // useSearchParams reads the ?category=Beach part of the URL.
  // Clicking "Beach" on the homepage navigates to /tours?category=Beach,
  // and THIS is where that value actually gets used.
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category"); // null if no ?category= in the URL

  // Re-runs whenever the category changes (e.g. user clicks a different tag)
  useEffect(() => {
    setLoading(true);
    setError(null);

    const request = category ? getToursByCategory(category) : getAllTours();

    request
      .then((data) => {
        if (Array.isArray(data)) {
          setTours(data);
        } else {
          setError("Backend did not return a tour list. Is it running on port 8080?");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch tours:", err);
        setError("Could not reach the backend at localhost:8080. Is it running?");
        setLoading(false);
      });
  }, [category]);

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "40px" }}>Loading tours...</p>;
  }

  if (error) {
    return <p style={{ textAlign: "center", marginTop: "40px", color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "30px", color: "rgb(35, 82, 120)" }}>
        {category ? `${category} Tours` : "Explore Tours"}
      </h2>

      {category && (
        <button className="clear-filter" onClick={() => navigate("/tours")}>
          Clear filter — show all tours
        </button>
      )}

      {tours.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          No tours found in this category yet.
        </p>
      ) : (
        <div className="tour-grid">
          {tours.map((tour) => (
            <div className="tour-card" key={tour.id}>
              <img src={tour.imageUrl} alt={tour.name} />
              <div className="tour-card-body">
                <h3>{tour.name}</h3>
                <p>{tour.location} • {tour.category}</p>
                <p>₹{tour.price}</p>
                <button onClick={() => navigate(`/tours/${tour.id}`)}>View Details</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TourList;
