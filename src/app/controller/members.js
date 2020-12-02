const Member = require('../model/Member')
const { active, date } = require('./utils')


module.exports = {
    index(req, res) {
        Member.all(function(members) {
            return res.render("members/index", {members})
        })
    },
    create(req, res){
        return res.render('members/create')
    },
    post(req, res) {
        
        const keys = Object.keys(req.body)
        
        for(key of keys) {
            if (req.body[key] == ""){
                return res.send('Eiiiii! Não foi preenchido todos os campos')
            }
        }

        Member.create(req.body, function(members) {
            return res.redirect(`/members/${members.id}`)
        })

        
    },
    show(req, res) {
      
    },
    edit(req, res){
    
        return console.log("rota edit")

    },
    put(req, res) {
        const keys = Object.keys(req.body)
        for(key of keys) {
            if (req.body[key] == ""){
                return res.send('Eiiiii! Não foi preenchido todos os campos')
            }
        }
        return console.log("rota put")

    },
    delete(req, res){
        return console.log("rota delete")

    }
}

