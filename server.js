require('dotenv').config();

const { isConnectedToDb } = require('./config/dbConn');
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger, logEvents } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;
require('./models/indexModel');

//custom middleware logger
app.use(logger);

//built-in middleware for json
app.use(express.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(express.urlencoded({ extended: true }));

//cors=cross origin resource sharing
app.use(cors(corsOptions));


//serve static files
app.use(express.static(path.join(__dirname, '/public')));


//for views 
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

isConnectedToDb()

app.use('/', require('./routes/root'));
app.use('/users', require('./routes/api/users'));
app.use('/accounts', require('./routes/api/accounts'));
app.use('/transactions', require('./routes/api/transactions'));


app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.render('404');
    }
    else if (req.accepts('json')) {
        res.json({ error: "error:404 not found" });
    } else {
        res.type('txt').send('404 not found');
    }

});

app.use(errorHandler);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));






