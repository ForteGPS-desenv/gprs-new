const Home = require('../model/Home')
const { active, date } = require('./utils')


module.exports = {
    index(req, res){
        Home.all(function(home) {
            return res.render("home/index", {home})
        })

    }
}