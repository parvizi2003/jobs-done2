const Router = require("express");
const  db = require('../db/db');

const router = new Router();

router.get('/', async (req, res) => {
    if (req.session.userID) {
        let orderBycolumn = ['name', 'date', 'time'][req.session.order];
        let table = (await db.query(`
        SELECT name, date, time 
        FROM "Jobs"
        WHERE user_id = $1
        ORDER BY ${orderBycolumn}`, 
        [req.session.orderByUser])).rows;
        let show = false;
        let users;
        if (req.session.username == 'admin') {
            show = true
            users = (await db.query('SELECT id, name FROM "Users"')).rows
        }
        res.render('index', {
            title: 'jobs-Done',
            username: req.session.username,
            table: table,
            show: show,
            users: users,
            orderByUser: req.session.orderByUser,
            order: req.session.order,
        })

    } else {
        res.redirect('/login');
    }
});

router.post('/', async (req, res) => {
    await db.query(`
    INSERT INTO "Jobs" (user_id, name, date, time) 
    VALUES ($1, $2, $3, $4) RETURNING *`,
    [req.session.userID, req.body.job_name, req.body.done_date, req.body.time_to_finish])
    res.redirect('/')
})

router.get('/login', (req, res) => {
    res.render('login', {title: 'Login'})
});

router.post('/login', async (req, res) => {
    let user = (await db.query('SELECT * FROM "Users" WHERE name = $1 AND password = $2', [req.body.username, req.body.password])).rows[0];
    if (user) {
        req.session.userID = user.id;
        req.session.username = user.name;
        req.session.orderByUser = user.id;
        req.session.order = 0;
        res.redirect('/');
    } else {
        res.render('login', {show: true});   
    }
});

router.get('/registration', async (req, res) => {
    res.render('registration', {title: 'Registration'})
})

router.post('/registration', async (req, res) => {
    if (req.body.password1 == req.body.password2 && await isTaken(req.body.username) == false) {
        await db.query('INSERT INTO "Users" (name, password) VALUES ($1, $2) RETURNING *', [req.body.username, req.body.password1]);
        let userID = (await db.query('SELECT id FROM "Users" WHERE name = $1', [req.body.username])).rows[0].id;
        req.session.userID = userID;
        req.session.username = req.body.username;
        req.session.orderByUser = userID;
        req.session.order = 0;
        res.redirect('/');
        return
    } else {
        res.render('registration', {show: true})
    }
})

router.get('/logout', (req, res) => {
    req.session.userID = undefined;
    req.session.username = undefined;
    res.redirect('/')
})

router.get('/changePassword', (req, res) => {
    if (req.session.userID) {
        res.render('changePassword', {title: 'Change Password'});    
    } else {
        res.redirect('/login');
    }
})

router.post('/changePassword', async (req, res) => {
    if (req.body.password1 == req.body.password2) {
        await db.query(
            'UPDATE "Users" SET password = $1 WHERE id = $2 RETURNING *', 
            [req.body.password1, req.session.userID]
        )
            res.redirect('/');
    } else {
        res.render('changePassword', {show: true});    
    }
})

router.post('/sort', async (req, res) => {
    req.session.order = req.body.select_order;
    if (req.session.username == 'admin') {
        req.session.orderByUser = req.body.select_user;
    }
    res.redirect('/')
})

async function isTaken(username) {
    let user = await (await db.query('SELECT name FROM "Users" WHERE name = $1', [username])).rows[0]; 
    return user ? true : false
}

module.exports = router;