# Simple User Registration App

A user registration web application built with **Express.js** following the **MVC pattern**. Users can fill out a registration form (including a profile picture upload) and view a profile summary upon successful submission.

## Features

- Registration form styled with **Tailwind CSS**
- File upload handling via the **multiparty** library
- Server-side validation (required fields, image type check)
- Profile page displaying submitted details and uploaded picture
- MVC architecture (Models → Controllers → Routes → Views)

## Tech Stack

| Layer      | Technology                  |
| ---------- | --------------------------- |
| Runtime    | Node.js                     |
| Framework  | Express.js                  |
| Templating | express-handlebars (`.hbs`) |
| Styling    | Tailwind CSS (CDN)          |
| Uploads    | multiparty + native `fs`    |

## Project Structure

```
homework-7-form-submission/
├── controllers/
│   └── registerController.js   # Form display & submission logic
├── routes/
│   └── registerRoutes.js       # GET /register & POST /register
├── views/
│   ├── layouts/
│   │   └── main.hbs            # Base HTML layout
│   ├── register.hbs            # Registration form view
│   └── profile.hbs             # Profile success view
├── public/
│   └── uploads/                # Uploaded profile pictures
├── app.js                      # Application entry point
├── package.json
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd homework-7-form-submission

# Install dependencies
npm install
```

### Running the App

```bash
npm start
```

The server starts at **http://localhost:3000**. Open that URL in your browser to access the registration form.

## Routes

| Method | Path        | Description                            |
| ------ | ----------- | -------------------------------------- |
| GET    | `/register` | Renders the registration form          |
| POST   | `/register` | Processes form data & renders profile  |
| GET    | `/`         | Redirects to `/register`               |

## How It Works

1. **GET `/register`** — The server renders `register.hbs`, a Tailwind-styled form with fields for Full Name, Email, Course Track, and Profile Picture.
2. **POST `/register`** — The `multiparty` library parses the `multipart/form-data` request. The controller:
   - Validates that a file was uploaded.
   - Checks that the file is an allowed image type (`.jpg`, `.jpeg`, `.png`).
   - Moves the file from its temp location to `./public/uploads/` using the native `fs` module.
   - Renders `profile.hbs` with the user's details and uploaded image.
3. **Profile page** — Displays a welcome message, registration summary, and the uploaded profile picture.
