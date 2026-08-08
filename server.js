const express = require("express");

const app = express();
const PORT = 3001;

app.use(express.json());

const pets = [];

let proximoId = 1;

app.get("/", (req, res) => {
    res.status(200).send("API da Clínica Veterinária em funcionamento.");
});

app.post("/pets", (req, res) => {
    const { nome, especie, raca, idade, tutor } = req.body;

    if (!nome || !especie || !raca || idade === undefined || !tutor) {
        return res.status(400).json({
            mensagem: "Todos os campos são obrigatórios."
        });
    }

    if (typeof idade !== "number" || idade < 0) {
        return res.status(400).json({
            mensagem: "A idade deve ser um número maior ou igual a zero."
        });
    }

    const novoPet = {
        id: proximoId++,
        nome,
        especie,
        raca,
        idade,
        tutor
    };

    pets.push(novoPet);

    res.status(201).json({
        mensagem: "Pet cadastrado com sucesso!",
        pet: novoPet
    });
});

app.get("/pets", (req, res) => {
    res.status(200).json(pets);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
