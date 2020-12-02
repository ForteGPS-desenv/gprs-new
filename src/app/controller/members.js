const { active, date } = require('./utils')

module.exports = {
    index(req, res) {
        return res.render("members/index")
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
        
        let { avatar_url, name, active, services } = req.body
        return console.log("rota post")
    },
    show(req, res) {
       return console.log("rota show")
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

