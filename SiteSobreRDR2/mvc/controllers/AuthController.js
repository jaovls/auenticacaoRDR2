const AuthModel = require("../models/AuthModel")
 
class AuthController
{
 
    constructor(app)
    {
        app.get("/auth", (req, res) =>
        {
            res.render("Auth/login", {
                invalido: "",
                senhaInvalida: "",
                usuarioInvalido: ""
            })
        })
        app.post("/auth", async (req, res) =>
        {
 
            const usuario = req.body.usuario
            const senha = req.body.senha
 
            const auth = new AuthModel(usuario, senha)
 
            const resultado = await auth.login()
 
            if(resultado.sucesso)
            {
                res.render("Home/index", { usuario: resultado.usuario })
            }
            else
            {
                // Renderiza novamente o login com os erros recebidos
                res.render("Auth/login", {
                    invalido: resultado.invalido || "",
                    senhaInvalida: resultado.senhaInvalida || "",
                    usuarioInvalido: resultado.usuarioInvalido || ""
                })
            }
        })
    }
}
 
module.exports = AuthController