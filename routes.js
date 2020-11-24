const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
    return res.redirect('/members')
})

router.get('/members', function (req, res) {
    return res.render('members/index')
})

router.get('/members/create', function(req, res){
    return res.render('members/create')
})

router.post('/members', function(req, res) {
    return res.send("recebido")
})

router.get('/chips', function (req, res) {
    return res.send("Chip list")
})

module.exports = router