const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
    return res.redirect('/members')
})

router.get('/members', function (req, res) {
    return res.render('members/index')
})

router.get('/chips', function (req, res) {
    return res.send("Lista de chips")
})

module.exports = router