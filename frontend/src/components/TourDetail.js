import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTourById } from "../api";

// useParams() reads dynamic values out of the URL.
// Route was defined as path="/tours/:id" -> useParams() gives us { id: "3" } etc.
function TourDetail() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const navigate = useNavigate();

  // Runs whenever "id" changes (e.g. user navigates from one tour detail straight to another)
  useEffect(() => {
    getTourById(id).then(setTour);
  }, [id]);

  if (!tour) return <p style={{ textAlign: "center", marginTop: "40px" }}>Loading...</p>;

  return (
    <div className="detail-page">
      <img src={tour.imageUrl} alt={tour.name} style={{ width: "100%", borderRadius: "12px" }} />
      <h2>{tour.name}</h2>
      <p>{tour.location} • {tour.category}</p>
      <p>{tour.description}</p>
      <h3>₹{tour.price} per person</h3>
      <button className="read-more" onClick={() => navigate(`/book/${tour.id}`)}>
        Book This Tour
      </button>
    </div>
  );
}

export default TourDetail;
