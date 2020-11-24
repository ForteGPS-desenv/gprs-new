const fs = require('fs')
const data = require('../data.json')

//Create
exports.post = function(req, res) {
    const keys = Object.keys(req.body)
    for(key of keys) {
        if (req.body[key] == ""){
            return res.send('Eiiiii! Não foi preenchido todos os campos')
        }
    }
    req.body.active = Date.parse(req.body.active)
    req.body.created_at = Date.now()

    data.members.push(req.body)
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error!!")
        
        return res.redirect("/members")
    })
}
//Update

//Delete