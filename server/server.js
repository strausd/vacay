const path = require('path');
const express = require('express');
const app = express();
const DotEnv = require('dotenv');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const router = require('./routes/router')

const api_routes = require('./routes/api');

const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

// Environment variable setup
if (process.env.NODE_ENV == 'production') {
    DotEnv.config({ path: '.env.prod' });
} else {
    DotEnv.config({ path: '.env.dev' });
    // Setup cors to allow webpack dev-server to connect
    app.use(cors({
        origin: 'http://localhost:8000'
    }));
}

// Connect to our database
const mongo_url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`
const mongo_connect = mongoose.connect(mongo_url);
mongo_connect.then(() => console.log('Connected to mongoDB successfully')).catch(e => {
    console.log('Error connecting to mongo');
    console.log(e);
});

// Body parser setup - tells it to accept JSON and url encoded values
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup express sessions
app.use(session({
    secret: 'test123',
    resave: true,
    saveUninitialized: true,
    secure: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: false,
    },
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));
app.use(cookieParser('test123'));

// Tell express where our static files are
app.use(express.static(publicPath));

// Use our API routes
router(app);

// Always send index.html regardless of the url
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});
