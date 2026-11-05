# React API calls

A treia lecție React, după `react-acomodare` și `user-management-local`: componenta vorbește cu un backend real. 8 demo-uri × 5 exerciții, în același meniu ca la acomodare. După ea vine `user-management-api` (același UI ca `user-management-local`, cu datele din API).

| Demo | Backend | Noțiunea |
|---|---|---|
| 1 | users-api | `fetch` + `await` + `response.json()` la click |
| 2 | users-api | `useEffect(..., [])`: încarci la pornire |
| 3 | users-api | `response.ok`, `try / catch / finally`, mesajul de eroare al serverului |
| 4 | users-api | parametri în URL (`?age=30`, `&`) |
| 5 | users-api | `POST` cu `body: JSON.stringify(...)`: 201 / 400 / 409 |
| 6 | users-api | `PATCH` și `DELETE`, lista actualizată cu `map` / `filter` |
| 7 | job-queue-api | răspuns care vine mai târziu: `POST` → id → `GET` până e gata |
| 8 | shop-api, school-api | login → token în stare → header `Authorization: Bearer` |

## Pornire

Backend-urile (imagini de pe Docker Hub, nu ai nevoie de cod Java sau C#):

```bash
cd backend
docker compose up -d
```

Aplicația:

```bash
npm install
npm run dev
```

Deschizi `http://localhost:5173`. Vite trimite mai departe cererile: `/users-api/...` → 8111, `/jobs-api/...` → 8107, `/shop-api/...` → 8104, `/school-api/...` → 8105, deci în cod scrii doar `fetch("/users-api/api/users")`.

| Backend | Swagger | Login |
|---|---|---|
| users-api | `http://localhost:8111/swagger-ui.html` | — |
| job-queue-api | `http://localhost:8107/swagger` | — |
| shop-api | `http://localhost:8104/swagger-ui.html` | `admin@shop.com` / `admin1234` |
| school-api | `http://localhost:8105/swagger-ui.html` | `admin@online-school.ro` / `password` |

Oprire: `docker compose down` (datele rămân); `docker compose down -v` le șterge.

- `starter/` — demo-urile scrise, exercițiile goale, `backend/docker-compose.yaml`.
- `final/` — exercițiile rezolvate.
