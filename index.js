if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

// Routes
const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');

// Set Template Engine, Views, layout.
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set('layout', 'layouts/layout');

app.use(expressLayouts);
app.use(express.static('pubic'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

// Database
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

// Routes
app.use('/', indexRouter);
app.use('/authors', authorRouter);

app.listen(
    process.env.PORT || 3000,
    console.log(`Server is running on: ${process.env.PORT || 3000}`
    ));