const Member = require('../model/Member')
const { active, date, formatPrice } = require('./utils')


module.exports = {
    index(req, res){
        const { filter } = req.query

        if ( filter ) {
            Member.findBy(filter, function(members){
                return res.render("members/index", { members, filter })
            })
        } else {
            Member.all(function(members) {

                return res.render("members/index", {members})
            })
        }
    },
    create(req, res){
        return res.render('members/create')
    },
    post(req, res){
        
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
    show(req, res){
        Member.find(req.params.id, function(member) {
            if(!member) return res.send("Ei, membro not found OK?")
        
            member.vencimento = date(member.vencimento).day
            member.created_at = date(member.created_at).format
        
            return res.render("members/show", { member })
        })
    },
    edit(req, res){

        Member.find(req.params.id, function(member) {
            if(!member) return res.send("Ei, membro not found OK?")
            
            member.vencimento = date(member.vencimento).iso
            
            return res.render("members/edit", { member })
        })

    },
    put(req, res){
        const keys = Object.keys(req.body)
        for(key of keys) {
            if (req.body[key] == ""){
                return res.send('Eiiiii! Não foi preenchido todos os campos')
            }
        }

        Member.update(req.body, function() {
            return res.redirect(`/members/${req.body.id}`)
        })
    },
    delete(req, res){
        Member.delete(req.body.id, function() {
            return res.redirect(`/members`)
        })

    }
}

