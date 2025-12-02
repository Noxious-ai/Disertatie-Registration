# Serviciu RESTful - Înregistrare la Disertație 🎓

Acest repository conține un **backend Node.js + Express** cu date **în memorie**, care expune un API RESTful pentru:

- Studenți
- Profesori
- Sesiuni de înregistrare
- Cereri preliminare (PreliminaryApplication)

Nu este nevoie de bază de date instalată (PostgreSQL etc.) pentru a rula acest serviciu.

---

## 🛠 1. Cerințe

- Node.js (v18+ recomandat)
- npm

---

## 📂 2. Structura proiectului

```bash
backend/
  app.js
  server.js
  package.json
  models/
    user.js
    Student.js
    Profesor.js
    RegistrationSession.js
    PreliminaryApplication.js
  controllers/
    health.controller.js
    students.controller.js
    professors.controller.js
    sessions.controller.js
    preliminary.controller.js
  routes/
    health.routes.js
    students.routes.js
    professors.routes.js
    sessions.routes.js
    preliminary.routes.js
  services/
    memdb.js
```

---

## 🚀 3. Instalare și rulare

```bash
cd backend
npm install
npm start
```

Serverul va porni implicit pe:

```
http://localhost:3000
```

Poți verifica rapid cu:

```bash
GET http://localhost:3000/api/health
```

Răspuns așteptat:

```json
{ "status": "ok", "message": "Disertatie Registration REST API is running" }
```

---

## 📡 4. Endpoint-uri principale

### 4.1. Studenți

- `GET /api/students` – listează toți studenții
- `GET /api/students/:id` – student după ID
- `POST /api/students` – crează student

Body exemplu:

```json
{
  "name": "Ion Popescu",
  "email": "ion.popescu@example.com"
}
```

### 4.2. Profesori

- `GET /api/professors`
- `GET /api/professors/:id`
- `POST /api/professors`

```json
{
  "name": "Prof. Maria Ionescu",
  "email": "maria.ionescu@example.com"
}
```

### 4.3. Sesiuni de înregistrare

- `GET /api/sessions`
- `GET /api/sessions/:id`
- `POST /api/sessions`

Body exemplu:

```json
{
  "professorId": 1,
  "startDate": "2025-01-01",
  "endDate": "2025-02-01",
  "maxApprovedStudents": 5
}
```

> Sesiunile nu se pot suprapune pentru același profesor, logica este implementată în `sessions.controller.js`.

### 4.4. Cereri preliminare (Preliminary Applications)

- `GET /api/preliminary-applications`
- `GET /api/preliminary-applications/:id`
- `POST /api/preliminary-applications`
- `PUT /api/preliminary-applications/:id/approve`
- `PUT /api/preliminary-applications/:id/reject`
- `DELETE /api/preliminary-applications/:id`

Body exemplu pentru creare:

```json
{
  "studentId": 1,
  "professorId": 1,
  "sessionId": 1
}
```

Body pentru respingere:

```json
{
  "reason": "Nu există locuri disponibile."
}
```

> Validări implementate:
> - studentId, professorId, sessionId trebuie să existe
> - nu se depășește `maxApprovedStudents` pentru sesiune
> - cererile aprobate/respinse folosesc metodele clasei `PreliminaryApplication`

---

## ⚠️ 5. Limitări (versiunea simplificată)

- Toate datele sunt ținute în memorie (se pierd la restart).
- Nu există autentificare (JWT) în această variantă.
- Nu există integrare cu PostgreSQL / Sequelize.

Această versiune este suficientă pentru cerința:

> **„Serviciu RESTful funcțional în repository + instrucțiuni de rulare - 06.12.2025”**

---

## ✅ 6. Cum poți extinde mai târziu

- Înlocuiești `services/memdb.js` cu un layer spre PostgreSQL (Sequelize).
- Adaugi autentificare JWT pe rute.
- Adaugi un frontend React care să consume aceste endpoint-uri.

