const vitrine = document.querySelector(".vitrine");

(async () => {
  const api = await fetch("http://127.0.0.1:3000/api", {
    method: "GET",
  })
  .then((response) => response.json())
  .then(function (json) {
    
    json.forEach((item) => {
      const produto = document.createElement("div"); //cria o elemento "produto"
      produto.classList.add("produto"); //adiciona a classe "produto" ao elemento "produto" criado
  
      const img = document.createElement("img"); //cria o elemento "imagem"
      img.src = item["img"]; //adiciona a "imagem" da api ao elemento "imagem" criado
  
      const name = document.createElement("h2"); //cria o elemento "titulo"
      name.innerText = item.name; //adiciona o "titulo" da api ao elemento "titulo" criado
  
      const price = document.createElement("h3"); //cria o elemento "preço"
      price.innerText = item.price; //adiciona o "preço" da api ao elemento "preço" criado
  
      const description = document.createElement("p"); //cria o elemento "descrição"
      description.innerText = item.description; //adiciona a "descrição" da api ao elemento "descrição" criado
  
      produto.appendChild(img); //adiciona a "img" elemento ao produto
      produto.appendChild(name); //adiciona o "name" elemento ao produto
      produto.appendChild(price); //adiciona o "price" elemento ao produto
      produto.appendChild(description); //adiciona o "description" elemento ao produto
  
      //adiciona o evento de click ao produto para abrir o produto
      produto.addEventListener("click", () => {
        // window.location.href = item.src; //redireciona para o produto
        window.open(item.link, "_blank"); //abre o produto em outra aba
      });
  
      //adiciona o produto na vitrine
      vitrine.appendChild(produto);
    });

  });
})();