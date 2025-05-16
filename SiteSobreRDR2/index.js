const express = require('express');
const path = require('path');
const HomeController = require('./mvc/controllers/HomeController');
const ChatController = require('./mvc/controllers/ChatController');
const AuthController = require('./mvc/controllers/AuthController');


class Server {

    app
    porta = 3000

    constructor() {
        this.app = express();
        this.porta = 3000
        this.on()

        this.configurarViewEngine()
        this.configurarRotas()
    }

    configurarViewEngine()
    {
        this.app.set("view engine", "ejs")
        this.app.set("views", "mvc/views")
        this.app.use(express.urlencoded({extended: true}))
        this.app.use(express.json())
        this.app.use(express.static(path.join(__dirname, 'mvc/views/public')));
    }

    configurarRotas() {
        new HomeController(this.app)
        new AuthController(this.app)
    }

    on()
    {
        this.app.listen(this.porta)
    }
}

new Server()