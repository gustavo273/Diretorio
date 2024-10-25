import express from "express";
import contatos from "../backend/data/contatos.mjs"



const app = express();

//middlewares
app.use(express.json());

//GET: /
app.get("/", (req, res) => {
    res.send("Olá mundo!");
});


/**
 * GET /contatos - obtem a lista de contatos
 * GET /contatos/:id - obtem 1 contato (rota dinâmica)
 * POST:/contatos - Cria um novo contato
 * PUT /contatos/:id - edita um contato
 * DELETE/contatos/:id - deleta um contato
 */


// Listar contatos
app.get('/contatos', (req, res) => {
    res.status(200).json({
        error: false,
        contatos
    })
})


// Buscar contato por ID
app.get('/contatos/:id', (req, res) => {
    const id = req.params.id;
    const sit = req.query.sit;

    console.log(id, sit);
    const contato = contatos.find((contato) => contato.id == id);
    if (!contato) {
        return res.status(404).json({
            mensagem: "contato não encontrado"
        });
    }
    return res.json({
        id: id,
        nome: contato.nome
    });

});


app.post('/contatos', (req, res) => {
    const { nome, genero, telefone, email } = req.body;

    if (!nome || !genero || !telefone || email)

        return res.status(404).json({
            error: true,
            message: "mensagem inválida!"
        });


    if (contatos.find((contato) => contato.email === email))
        return res.status(404).json({
            error: true,
            message: "email já cadastrado!"

        });

    id = (contatos.length == 0)
        ? 1
        : contatos[contatos.length - 1].id + 1;
    const contato = { id: uuid(), nome, genero, telefone, email };
    res.status(201).json({
        error: false,
        contato

    });

})

//Editar um contato







app.listen(3000, '127.0.0.1', () => {
    console.log("servidor iniciado na porta 3000!")
}); 