# Airbnb Clone

A full-stack Airbnb-inspired web application where users can explore listings, create their own listings, upload images, leave reviews, and manage their properties.

## Features

### Authentication & Authorization

* User registration and login
* Secure password hashing with Passport.js
* Session-based authentication
* Authorization for listing and review ownership

### Listings

* Create new listings
* Edit existing listings
* Delete listings
* View detailed listing information
* Upload listing images
* Automatic location geocoding using OpenStreetMap

### Reviews

* Add reviews to listings
* Star rating system
* Delete own reviews
* View reviews from other users

### Maps Integration

* Interactive maps powered by Leaflet.js
* Automatic location detection using OpenStreetMap Nominatim API
* Satellite and street map views
* Location markers

### Image Management

* Cloudinary image storage
* Multer file uploads
* Secure image handling

### Responsive Design

* Mobile-friendly UI
* Responsive navigation
* Optimized forms and listing pages

---

## Tech Stack

### Frontend

* HTML
* CSS
* Bootstrap 5
* EJS Templates
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* Passport.js
* Passport Local Strategy
* Express Session

### File Uploads

* Multer
* Cloudinary

### Maps & Geocoding

* Leaflet.js
* OpenStreetMap
* Nominatim API

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd airbnb-clone
```

### Install Dependencies

```bash
npm install
```

### Start Application

```bash
npm start
```

or

```bash
node app.js
```

---

## Project Structure

```text
Airbnb-Clone/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── views/
│   ├── listings/
│   ├── includes/
│
├── public/
│   ├── css/
│   ├── js/
│
├── utils/
├── cloudConfig.js
├── app.js
├── package.json
└── README.md
```

---

## Main Functionalities

### Listing Management

Users can:

* Create listings
* Upload listing images
* Edit listing information
* Delete owned listings
* View all available listings

### Review System

Users can:

* Rate listings
* Leave comments
* Delete their own reviews

### Ownership Protection

Only listing owners can:

* Edit listings
* Delete listings

Only review authors can:

* Delete reviews

---

## Future Improvements

* Search and filtering
* Wishlist functionality
* Booking system
* Payment integration
* User profiles
* Real-time notifications
* Image galleries
* Admin dashboard

---

## Author

**Tushar**

Built as a full-stack web development project using the MERN ecosystem concepts and modern web technologies.
