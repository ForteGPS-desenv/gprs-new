const express = require('express')
const router = express.Router()
const members = require('./app/controller/members')
const chips = require('./app/controller/chips')
const home = require('./app/controller/home')


router.get('/', home.index)
router.get('/apresetation',(req, res) => {
    return res.render('Pagina ainda não criada!')})

router.get('/members', members.index)
router.get('/members/create',members.create)
router.get('/members/:id', members.show)
router.get('/members/:id/edit', members.edit)
router.post('/members', members.post)
router.put('/members', members.put)
router.delete('/members', members.delete)


router.get('/chips', chips.index)
router.get('/chips/create', chips.create)
router.get('/chips/:id', chips.show)
router.get('/chips/:id/edit', chips.edit)
router.post('/chips', chips.post)
router.put('/chips', chips.put)
router.delete('/chips', chips.delete)

module.exports = router