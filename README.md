# Nisarg Premi- Full Stack Project

Your original `tour.html` design, rebuilt as a real Java Spring Boot + React app.

## Project structure
```
nisarg-premi/
├── backend/   (Java Spring Boot - REST API + database)
└── frontend/  (React - your UI)
```

## How to run

### 1. Backend (needs Java 17+ and Maven installed)
```
cd backend
mvn spring-boot:run
```
- API runs at `http://localhost:8080`
- Try it in a browser: `http://localhost:8080/api/tours`
- See the database directly: `http://localhost:8080/h2-console`
  (JDBC URL: `jdbc:h2:mem:naturedrive`, username: `sa`, no password)

### 2. Frontend (needs Node.js installed)
```
cd frontend
npm install
npm start
```
- Opens at `http://localhost:3000`
- Drop your logo file in `frontend/public/Naturedrive.png` (Home.js expects it there)

Run backend AND frontend at the same time, in two terminals.

## What each file does (read top to bottom, this IS your Java/Spring/React lesson)

**Backend — read in this order:**
1. `model/Tour.java` — a plain Java class → becomes a database table via `@Entity`
2. `repository/TourRepository.java` — one line of interface = full database CRUD, for free
3. `controller/TourController.java` — turns HTTP requests into method calls (the actual REST API)
4. `config/DataSeeder.java` — pre-fills 4 demo tours so the app has data on startup
5. `NisargPremiApplication.java` — the one line that boots the whole server

**Frontend — read in this order:**
1. `src/index.js` — where React attaches to the HTML page
2. `src/components/Home.js` — your original tour.html, now a component
3. `src/api.js` — every call to the backend, in one place
4. `src/components/TourList.js` — first real data-fetching component (`useEffect` + `useState`)
5. `src/components/TourDetail.js` — fetching one item using a URL parameter
6. `src/components/BookingForm.js` — controlled form + POST request (booking + payment)
7. `src/App.js` — wires all pages together with routing

## Interview cheat sheet — be ready to say these out loud

**"Walk me through your project"**
> "Nisarg Premi is a full-stack tour booking app. React frontend calls a Spring Boot REST API,
> which persists Tours and Bookings through Spring Data JPA into a database. Users can browse
> tours, view details, and book — which creates a booking record and confirms it on payment."

**Java/Spring concepts to name-drop, and know what they mean:**
- **`@Entity`** — marks a Java class as a database table
- **`@RestController`** — marks a class whose methods return JSON, not HTML pages
- **`@Autowired` / constructor injection** — Spring creates and hands you objects (like the repository) instead of you writing `new X()` — this is **Dependency Injection**
- **`JpaRepository`** — an interface that gives you `save()`, `findAll()`, `findById()` with zero SQL written
- **`@RequestBody`** — converts incoming JSON into a Java object automatically
- **`@PathVariable`** — pulls a value out of the URL (e.g. `/tours/3` → `id = 3`)

**React concepts to name-drop:**
- **Component** — a reusable piece of UI, just a JS function returning JSX
- **`useState`** — stores data that re-renders the UI when it changes
- **`useEffect`** — runs side effects (like an API call) after render, controlled by its dependency array
- **Props** — how data passes from a parent component down to a child
- **`fetch`** — how the browser calls your backend's REST API over HTTP

**If asked "what would you add with more time":**
> Authentication (Spring Security + JWT), role-based access (Customer/Guide/Admin — matches
> your original diagram), an Admin dashboard for managing tours, and a real database
> (PostgreSQL) instead of in-memory H2.
