const express = require('express')
const router = express.Router()
const members = require('./controller/members')

router.get('/', function (req, res) {
    return res.redirect('/members')
})


router.get('/members', members.index)
router.get('/members/create', function(req, res){
    return res.render('members/create')
})
router.get('/members/:id', members.show)
router.get('/members/:id/edit', members.edit)
router.post('/members', members.post)
router.put('/members', members.put)
router.delete('/members', members.delete)

router.get('/chips', function (req, res) {
    return res.send("Chip list")
})

module.exports = router