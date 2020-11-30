const fs = require('fs')
const data = require('../data.json')
const { active, date } = require('./utils')

exports.index = function(req, res) {
    return res.render("chips/index", { chips: data.chips })
}
//show
exports.show =  function(req, res) {
    //req.params
    const { id } = req.params 

    const foundChip = data.chips.find(function(chip){
        return chip.id == id
    })

    if(!foundChip) return res.send("chip not found")

    const chip = {
        ...foundChip,
        active: active(foundChip.active),
        services:foundChip.services.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundChip.created_at)
    }

    return res.render("chips/show", {chip})
}
//create get
exports.create = function(req, res){
    return res.render('chips/create')
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
    const id = Number(data.chips.length + 1)


    data.chips.push({
        id,
        avatar_url,
        active,
        name,
        created_at,
        services
    })
    
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error!!")
        
        return res.redirect("/chips")
    })
}
//Edit
exports.edit = function(req, res){

    const { id } = req.params 

    const foundChip = data.chips.find(function(chip){
        return chip.id == id
    })

    if(!foundChip) return res.send("chip not found")

    const chip = {
        ...foundChip,
        active: date(foundChip.active)
    }
    return res.render('chips/edit', {chip})
}
//Put
exports.put = function(req, res) {
    const { id } = req.body 
    let index = 0
    
    const foundChip = data.chips.find(function(chip, foundIndex){
        if ( id == chip.id) {
            index = foundIndex
            return true
        }
    })

    if(!foundChip) return res.send("chip not found")

    const chip = {
        ...foundChip,
        ...req.body,
        active: Date.parse(req.body.active),
        id: Number(req.body.id)
    }

    data.chips[index] = chip

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write error!!!")

        return res.redirect(`/chips/${id}`)
    })
}
//Delete
exports.delete = function(req, res){
    const { id } = req.body

    const filteredChips = data.chips.filter(function(chip){
        return chip.id != id
    })

    data.chips = filteredChips

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error!")

        return res.redirect("/chips")
    })
}