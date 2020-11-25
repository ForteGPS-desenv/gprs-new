const fs = require('fs')
const data = require('../data.json')
const { active, date } = require('./utils')

//show
exports.show =  function(req, res) {
    //req.params
    const { id } = req.params 

    const foundMember = data.members.find(function(member){
        return member.id == id
    })

    if(!foundMember) return res.send("Member not found")

    const member = {
        ...foundMember,
        active: active(foundMember.active),
        services:foundMember.services.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundMember.created_at)
    }

    return res.render("members/show", {member})
}


//Create
exports.post = function(req, res) {
    const keys = Object.keys(req.body)
    for(key of keys) {
        if (req.body[key] == ""){
            return res.send('Eiiiii! Não foi preenchido todos os campos')
        }
    }

    let { avatar_url, name, active, services } = req.body


    active = Date.parse(active)
    const created_at = Date.now()
    const id = Number(data.members.length + 1)


    data.members.push({
        id,
        avatar_url,
        active,
        name,
        created_at,
        services
    })
    
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error!!")
        
        return res.redirect("/members")
    })
}
//Update
exports.edit = function(req, res){
//req.params
const { id } = req.params 

const foundMember = data.members.find(function(member){
    return member.id == id
})

if(!foundMember) return res.send("Member not found")

    date(foundMember.active)

    return res.render('members/edit', {member: foundMember})
}
//Delete