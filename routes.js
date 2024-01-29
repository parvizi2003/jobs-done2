import { Router } from "express";
import  db from './db.js';

const router = new Router();

router.get('/', async (req, res) => {
    if (req.session.userID) {
        if(req.session.username == 'admin') {
            let table = (await db.query(`
            SELECT user_name, job_name, done_date, time_to_finish 
            FROM jobs
            JOIN users USING (user_id)
            WHERE user_name = $1
            ORDER BY ${req.session.order}
            `, [req.session.orderByUser])).rows;
            let users = (await db.query('SELECT user_name FROM users')).rows
            res.render('index', {
                title: 'Jobs-Done',
                username: req.session.username,
                table: table,
                show: true,
                users: users
            })
            return
        } 
        console.log(req.session.order)
        let table = (await db.query(`SELECT job_name, done_date, time_to_finish 
            FROM jobs WHERE user_id = $1 
            ORDER BY ${req.session.order}`, [req.session.userID])).rows;
        res.render('index', {
            title: 'Jobs-Done',
            username: req.session.username,
            table: table
        })
    } else {
        res.redirect('/login');
    }
});

router.post('/', async (req, res) => {
    await db.query(`
    INSERT INTO jobs (user_id, job_name, done_date, time_to_finish) 
    VALUES ($1, $2, $3, $4) RETURNING *`,
    [req.session.userID, req.body.job_name, req.body.done_date, req.body.time_to_finish])
    res.redirect('/')
})

router.get('/login', (req, res) => {
    res.render('login', {title: 'Login'})
});

router.post('/login', async (req, res) => {
    let user = (await db.query('SELECT * FROM users WHERE user_name = $1 AND user_password = $2', [req.body.username, req.body.password])).rows[0];
    if (user) {
        req.session.userID = user.user_id;
        req.session.username = user.user_name;
        req.session.orderByUser = user.user_name;
        req.session.order = 'job_name';
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
        await db.query('INSERT INTO users (user_name, user_password) VALUES ($1, $2) RETURNING *', [req.body.username, req.body.password1]);
        let userID = (await db.query('SELECT user_id FROM users WHERE user_name = $1', [req.body.username])).rows[0].user_id;
        req.session.userID = userID;
        req.session.username = req.body.username;
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
            'UPDATE users SET user_password = $1 WHERE user_id = $2 RETURNING *', 
            [req.body.password1, req.session.userID]
        )
            res.redirect('/');
    } else {
        res.render('changePassword', {show: true});    
    }
})

router.get('/order-by/:order', (req, res) => {
    req.session.order = req.params.order;
    res.redirect('/')
})

router.get('/user/:user', (req, res) => {
    req.session.orderByUser = req.params.user;
    res.redirect('/')
})

async function isTaken(username) {
    let user = await (await db.query('SELECT user_name FROM users WHERE user_name = $1', [username])).rows[0]; 
    return user ? true : false
}
export default router;
