

// Load environment variables from .env file
require('dotenv').config();

// Import Express framework
const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');

// Create Express application
const app = express();

/* =========================
   VIEW ENGINE CONFIG
   ========================= */

// Set EJS as the template (view) engine
// This allows us to use res.render('pageName')
app.set('view engine', 'ejs');

// By default, Express looks for views in a folder named "views"
// app.set('views', path.join(__dirname, 'views')); // optional


/* =========================
   STATIC FILES
   ========================= */

// Serve static files such as CSS, JS, images from the "public" folder
// Example: /css/style.css → public/css/style.css
app.use(express.static('public'));


/* =========================
   HELPER FUNCTION
   ========================= */

// Reusable helper to render pages
// Example: servePage('about') → renders about.ejs
const servePage = (page) => (req, res) => res.render(page);



/* =========================
   ROUTES
   ========================= */

// Home page
app.get('/', servePage('index'));

// Other pages
app.get('/about', servePage('about'));
app.get('/education', servePage('education'));
app.get('/skills', servePage('skills'));
app.get('/projects', servePage('projects'));
app.get('/certifications', servePage('certifications'));
app.get('/contact', servePage('contact'));

// Example extra route (same as /about)
app.get('/user', (req, res) => {
    res.render('about');
});


/* =========================
   ERROR HANDLING
   ========================= */

// 500 Error Handler
// This runs when an error is thrown inside routes
// MUST have (err, req, res, next)
app.use((err, req, res, next) => {
    console.error(err.stack); // Log error for debugging
    res.status(500).render('500'); // Render 500.ejs
});

// 404 Error Handler
// This runs when no route matches the request
// MUST be the LAST middleware
app.use((req, res) => {
    res.status(404).render('404'); // Render 404.ejs
});


/* =========================
   SERVER START
   ========================= */

// Use PORT from environment or default to 3000
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



