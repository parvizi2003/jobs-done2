const express = require('express')
const exphbs = require('express-handlebars')
const expressSession = require('express-session')
const router = require('./server/routes/routes.js')
const path = require('path')


const PORT = process.env.PORT || 8080;
const secret = 'qwerty';
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});
const app = express();

app.use(express.static(path.resolve('server', 'public')));
app.use(expressSession({
    secret: secret,
    resave: false,
    saveUninitialized: true
}))
app.use(express.urlencoded({ extended: false }));
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(router)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
