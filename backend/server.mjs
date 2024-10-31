import express from "express";
import contatos from "../backend/data/contatos.mjs"



const app = express();

//middlewares
app.use(express.json());



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

//Criar um novo contato
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
app.put('/contatos/:id', (req, res) => {
    
    const id = req.params.id;
    const contato = contatos.find((contato) => contato.id == id);
    
    if(!contato) 
        return res.status(404).json({
        error: true,
        message: "Contato não encontrado!"
    });
    
    // const contato = req.body;
    const { nome, genero, telefone, email } = req.body;

    // Exceções primeiro:
    if(email) {
        if(contatos.find((contato) => contato.email === email))
            return res.status(400).json({
                error: true,
                message: "Email já cadastrado!"
            })
        contato.email = email;
    }
    if(nome) contato.nome = nome;
    if(genero) contato.genero = genero;
    if(telefone) contato.telefone = telefone;

    return res.status(200).json({
        error: false,
        message: "Contato atualizado com sucesso!"
    });
    
});

//Deletando um contato
app.delete('/contatos/:id', (req, res) => {
    
    const id = req.params.id;
    const index = contatos.findIndex((contato) => contato.id == id);
    
    if(index == -1) 
        return res.status(404).json({
            error: true,
            message: "Contato não encontrado!"
        });
    
    contatos.splice(index, 1); // remove o contato encontrado
    return res.status(200).json({
        error: false,
        message: "Contato deletado com sucesso!"
    });
    
});



app.listen(3000, '127.0.0.1', () => {
    console.log("servidor iniciado na porta 3000!")
}); 