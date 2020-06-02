import express from 'express';

const app = express();

app.get("/", (req, res) => {
    console.log('home');

    res.json([
        "Andrew Márcio",
        "Matheus do Vale",
        "Mateus Vidal",
        "Youhana Carvalho"
    ]);
});

app.listen(3333);