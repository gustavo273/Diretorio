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

app.get('/contatos/:id', (req, res ) => {
    const id = req.params.id;
    const sit = req.query.sit;

    console.log (id, sit);
    const contato = contatos.find((contato) => contato.id == id);
    if (!contato) {
        return res .status(404). json ({
            mensagem: "contato não encontrado"
        });
    }
    return res.json({
        id: id,
        nome: contato.nome
    });
    
    });


    app.post

    app.listen(3001, '127.0.0.1', () => {
    console.log("servidor iniciado na porta 3001!")
}); 