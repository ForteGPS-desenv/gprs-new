const express = require('express')
const nunjucks = require('nunjucks')
const router = require("./routes")
const methodOverride = require('method-override')

const server = express()

server.use(express.urlencoded({extended: true}))
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(router)

server.set("view engine", "njk")

nunjucks.configure("src/app/view", { 
    express: server,
    autoescape: false,
    noCache: true
})


server.listen( process.env.PORT || 8080, function (){
    console.log('Hello my lord, server is running')
})