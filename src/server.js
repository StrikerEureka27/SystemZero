const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session'); //Para almacenar en la memoria del servidor
const MySQLStore = require('express-mysql-session');
const {database} = require('./keys.js')
const passport = require('passport');



// Initializations
const app = express();
require('./lib/passport.js')

// Global variables 


// Server Settings 
app.set('appWeb', ' Striker Development ');
/* app.set('port', 3000); */
app.set('port', process.env.PORT || 3000 );
/* Si existe un puerto en el sistema tomalo  */

// Configurar el motor de plantillas
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({ 
     defaultLayout: 'main', 
     layoutsDir: path.join(app.get('views'), 'layouts'),
     partialDir: path.join(app.get('views'), 'partials'), 
     extname: '.hbs', 
     helpers: require('./lib/helpers.js')
  }));
app.set('view engine', '.hbs');



// Middlewares 
app.use(morgan('dev'));
app.use(require('./routes/routing.js'));
app.use(express.urlencoded({extended: false})); // Aceptar solo tipos de archivos simples 
app.use(express.json());
app.use(flash());
app.use(session({
  secret: 'mysqlSession', //Nombre de la sesion
  resave: false, //No renovar la sesion  
  saveUninitialized: false, //No establecer la sesion de nuevo 
  store: new MySQLStore({
    host: 'localhost', 
    user: 'root', 
    password: 'Pablo092100$98', 
    database: 'database_links', 
  }) // Donde se almacena 
}))


app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next)=>{
  app.locals.success = req.flash('success');
  app.locals.message = req.flash('message');
  app.locals.user =  req.user; 
  //console.log(req.user)
 next();
})



//Routing
app.use(require('./routes/routing.js'));
app.use(require('./routes/authentication.js'));
app.use('/links', require('./routes/links.js'));


// Public p archivos estaticos 
app.use(express.static(path.join(__dirname, 'public')));


//Start 
app.listen(app.get('port'), ()=> console.log('Server is running on port: ' + app.get('port') ))

