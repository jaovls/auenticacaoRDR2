const connection = require("../models/BancoModel")
 
class AuthModel
{
    usuario
    senha
 
    constructor(usuario, senha)
    {
        this.usuario = usuario
        this.senha = senha
    }
 
    async login()
    {
 
        const sql = "SELECT * FROM kdg_usuarios WHERE usuario = ?"
        const [rows] = await connection.execute(sql, [this.usuario])
 
 
        // Mensagens de erro
        const invalido = "Preencha os campos corretamente"
        const senhaInvalida = "Senha invalida"
        const usuarioInvalido = "Usuário invalido"
 
        // Verificando se o campo está preenchido
        if(this.usuario === '' || this.senha === '')
            {
                return {
                    invalido: invalido,
                    senhaInvalida: "",
                    usuarioInvalido: ""
                };
            }
        //Fim da verificação
 
        // Verifcando se o usuário existe
        if(rows.length === 0)
        {
            return {
            invalido: "",
            senhaInvalida: "",
            usuarioInvalido: usuarioInvalido
            }
        }
 
        // Comparação da senha fornecida com a senha armazenada no banco de dados
        if (this.senha !== rows[0].senha)
        {
            return {
                invalido: "",
                senhaInvalida: senhaInvalida,
                usuarioInvalido: ""
            }
        }
 
        // Login bem-sucedido
        return {
            sucesso: true,
            usuario: rows[0]
        }
 
    }
}
 
module.exports = AuthModel