const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog');

const app = express();

//Listining port setup
const PORT = process.env.PORT || 3000;

//Setting up middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
app.use(morgan('dev'));


//Getting routers
const userRoutes = require('./api/routes/user.route');


app.use('/user', userRoutes);

//Handling 404 error
app.use((req, res, next) => {
    const err = new Error('Not found!');
    err.status = 404;
    next(err);
})

//Handling errors
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: err,
        message: 'Something went wrong!'
    })
})

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
})