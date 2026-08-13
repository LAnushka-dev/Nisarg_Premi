import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createBooking, payForBooking } from "../api";

// This matches your diagram's "make payment & confirm booking" step.
function BookingForm() {
  const { id } = useParams(); // tour id from the URL
  const navigate = useNavigate();

  // A single state object holding all form fields - common pattern for forms in React
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    numberOfPeople: 1,
  });
  const [confirmed, setConfirmed] = useState(false);

  // One shared handler for every input: uses the input's "name" attribute
  // to know which field in the state object to update.
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault(); // stops the browser's default full-page-reload form submit

    // Step 1: create the booking (status = PENDING) - hits POST /api/bookings
    const booking = await createBooking({
      tourId: id,
      customerName: form.customerName,
      customerEmail: form.customerEmail,
      numberOfPeople: Number(form.numberOfPeople),
      totalPrice: 0, // in a real app you'd calculate this from the tour price * people
    });

    // Step 2: pay - hits PUT /api/bookings/{id}/pay, matches your diagram's payment step
    await payForBooking(booking.id);

    setConfirmed(true);
  }

  if (confirmed) {
    return (
      <div className="booking-page">
        <h2>Booking Confirmed! 🎉</h2>
        <p>Thanks, {form.customerName}. A confirmation has been sent to {form.customerEmail}.</p>
        <button className="read-more" onClick={() => navigate("/tours")}>
          Back to Tours
        </button>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <h2>Book Your Tour</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="customerName"
          placeholder="Full Name"
          value={form.customerName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="customerEmail"
          placeholder="Email"
          value={form.customerEmail}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="numberOfPeople"
          min="1"
          value={form.numberOfPeople}
          onChange={handleChange}
          required
        />
        <button type="submit">Make Payment & Confirm Booking</button>
      </form>
    </div>
  );
}

export default BookingForm;
