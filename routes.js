const express = require('express')
const router = express.Router()
const members = require('./controller/members')

router.get('/', function (req, res) {
    return res.redirect('/members')
})

router.get('/members', function (req, res) {
    return res.render('members/index')
})

router.get('/members/create', function(req, res){
    return res.render('members/create')
})

router.get('/members/:id', members.show)

router.post('/members', members.post)

router.get('/chips', function (req, res) {
    return res.send("Chip list")
})

module.exports = router