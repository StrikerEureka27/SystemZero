const express = require('express');
const router = express.Router();

const db = require('../database.js');
const { route } = require('./routing.js');

router.get('/add', (req, res)=>{
    res.render('links/add');
})

router.post('/add', async (req, res)=> {
    const {title, url, description } = req.body;
    const newLink = {
        title: title, 
        url: url, 
        description: description
    }
    await db.query('INSERT INTO links set ?', [newLink]);
    req.flash('success', 'Link added succesfully')
    res.redirect('/links');
})

router.get('/delete/:id', async (req, res)=>{
    const { id } = req.params;
    await db.query('DELETE FROM links WHERE id=?', [id]);
    req.flash('success', 'Link deleted succesfully')
    res.redirect('/links');
})

router.get('/', async (req, res)=> {
    const links = await db.query('SELECT * FROM links');
    res.render('links/list',{links: links})
})

router.get('/edit/:id', async (req, res)=> {
    const {id} = req.params;
    const dataLink = await db.query('SELECT * FROM links WHERE id=?', [id]);
    console.log(dataLink[0]);
    res.render('links/edit', {dataLink : dataLink[0]});
})

router.post('/edit/:id', async (req, res)=> {
    const {id} =  req.params;
    const {title, description, url } = req.body;
    const newLink = {
        title: title, 
        url: url, 
        description: description
    }
    await db.query('UPDATE links SET ? WHERE id= ?', [newLink, id]);
    req.flash('success', 'Link edited succesfully')
    res.redirect('/links');
})


module.exports = router;