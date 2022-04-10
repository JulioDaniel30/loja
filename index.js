const express = require("express");
const app = express();

const connect = require("./db").connect;

const port = 3000;

const path = require("path");

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

const options = {
  root: path.join(__dirname),
};

app.get("/produtos", (req, res) => {
  res.sendFile(`./public/produtos/produto${req.query.id}.html`, options);
}); /* app.get('/produtos') */


app.get("/cadastrar", (req, res) => {
  res.sendFile(`./public/cadastro/cadastro.html`, options);
})

const json = [];

for (let i = 0; i < 8; i++) {
  json[i] = {
    id: i + 1,
    name: `Produto ${i + 1}`,
    price: `R$ 1.000,00`,
    link: `http://localhost:3000/produtos?id=${i+1}`,
    img: `https://picsum.photos/id/237/300/200`,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  };
}

app.get("/api", (req, res) => {
  
  console.log(json);
  res.json(json);
}); /* app.get("/api") */



app.post("/cadastrar", (req, res) => {
  if (req.body.name && req.body.price && req.body.image && req.body.description) {
    
    json.push({
      id: json[json.length - 1].id + 1,
      name: req.body.name,
      price: req.body.price,
      link: `http://localhost:3000/produtos?id=${json[json.length - 1].id + 1}`,
      img: req.body.image,
      description: req.body.description,
    });
    res.status(200).redirect("/cadastrar");
    res.status(200).send("Produto cadastrado com sucesso!");
    res.sendStatus(200);
  } else {
    // res.sendStatus(400);
    res.status(400).redirect("/cadastrar");
    res.send("Preencha todos os campos!");
    console.log("Preencha todos os campos!");
  }
  // res.redirect("/");
})


app.listen(port, () => console.log(`app listening on port ${port}!`));
