const path = require('path');
const express = require('express');
const app = express();
const DotEnv = require('dotenv');
const cors = require('cors');

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

const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const router = require('./routes/router')

const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;


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
    secret: process.env.SECRET,
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
app.use(cookieParser(process.env.SECRET));

// Tell express where our static files are
app.use(express.static(publicPath));

// Use our router
router(app);

// Always send index.html regardless of the url
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

const handleError = (err, req, res, next) => {
    const output = {
        error: {
            name: err.name,
            message: err.message,
            text: err.toString()
        }
    };
    const statusCode = err.status || 500;
    return res.status(statusCode).send(output);
};

app.use(handleError);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});
