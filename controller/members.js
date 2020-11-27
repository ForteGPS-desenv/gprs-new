const fs = require('fs')
const data = require('../data.json')
const { active, date } = require('./utils')

exports.index = function(req, res) {
    return res.render("members/index", { members: data.members })
}

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
//Edit
exports.edit = function(req, res){

    const { id } = req.params 

    const foundMember = data.members.find(function(member){
        return member.id == id
    })

    if(!foundMember) return res.send("Member not found")

    const member = {
        ...foundMember,
        active: date(foundMember.active)
    }
    return res.render('members/edit', {member})
}
//Put
exports.put = function(req, res) {
    const { id } = req.body 
    let index = 0
    
    const foundMember = data.members.find(function(member, foundIndex){
        if ( id == member.id) {
            index = foundIndex
            return true
        }
    })

    if(!foundMember) return res.send("Member not found")

    const member = {
        ...foundMember,
        ...req.body,
        active: Date.parse(req.body.active),
        id: Number(req.body.id)
    }

    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write error!!!")

        return res.redirect(`/members/${id}`)
    })
}
//Delete
exports.delete = function(req, res){
    const { id } = req.body

    const filteredMembers = data.members.filter(function(member){
        return member.id != id
    })

    data.members = filteredMembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error!")

        return res.redirect("/members")
    })
}