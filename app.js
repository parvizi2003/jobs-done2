import express from 'express';
import exphbs from 'express-handlebars';
import expressSession from 'express-session';
import router from './routes.js';
import path from 'path'

const PORT = process.env.PORT || 8080;
const secret = 'qwerty';
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});
const app = express();

app.use(express.static(path.resolve(path.resolve(), 'public')));
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
