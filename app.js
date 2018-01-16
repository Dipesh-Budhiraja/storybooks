const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// Load Model
require('./models/User');
require('./models/Story');

// Passport Config
require('./config/passport')(passport);

// Load Routes
const auth = require('./routes/auth');
const index = require('./routes/index');
const stories = require('./routes/stories');

// Load Keys
const keys = require('./config/keys');

//handlebars helper
const {
  truncate,
  stripTags,
  formatDate,
  select,
  editIcon
} = require('./helpers/hbs');

// Map global promises
mongoose.Promise = global.Promise;
// Mongoose Connect
mongoose.connect(keys.mongoURI, {
  useMongoClient:true
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const app = express();

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    helpers: {
      truncate: truncate,
      stripTags: stripTags,
      formatDate: formatDate,
      select: select,
      editIcon: editIcon
    }
}));
app.set('view engine', 'handlebars');
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

//body parser middelware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//method override middleware
app.use(methodOverride('_method'));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//set global vars
app.use(function(req, res, next){
    res.locals.user = req.user || null;
    next();
});

//static folder
app.use(express.static(path.join(__dirname, 'public')));

// Use Routes
app.use('/auth', auth);
app.use('/', index);
app.use('/stories', stories);


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});