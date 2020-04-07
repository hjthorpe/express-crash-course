const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');


const app = express();

// when making a request this will run
// in this example when requested, log 'hello'
// const logger = (req, res, next) => {
//   console.log('hello');
//   next();
// };

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// init middleware
// app.use(logger);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Homepage Route
// only reason this is rendering and not static is 
// because it is above it in line of code
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Member App',
    members
  });
});

//*REGULAR RENDER*//
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });


//*How to load HTML files through node*//
//Not ideal because we'd have to put a route manually for every page//
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

//*Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Members API Routes
app.use('/api/members', require('./routes/api/members'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Sever started on port ${PORT}`));