// Central place for talking to the Spring Boot backend.
// Keeping all fetch calls here (instead of scattered in components) is a common real-world pattern.

const BASE_URL = "http://localhost:8080/api";

export async function getAllTours() {
  const response = await fetch(`${BASE_URL}/tours`);
  return response.json(); // fetch gives you the raw response; .json() parses the body
}

export async function getTourById(id) {
  const response = await fetch(`${BASE_URL}/tours/${id}`);
  return response.json();
}

// Powers the homepage tag buttons (Safari/Beach/Mountain) - calls the
// backend's /api/tours/category/{category} endpoint (see TourController.java)
export async function getToursByCategory(category) {
  const response = await fetch(`${BASE_URL}/tours/category/${category}`);
  return response.json();
}

export async function createBooking(booking) {
  const response = await fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking), // JS object -> JSON string for the request body
  });
  return response.json();
}

export async function payForBooking(bookingId) {
  const response = await fetch(`${BASE_URL}/bookings/${bookingId}/pay`, {
    method: "PUT",
  });
  return response.json();
}
