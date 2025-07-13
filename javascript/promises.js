function renderToScreen(obj){
    const products = obj.data.data;
    products.forEach(product => {
        const li = document.createElement("li");
        li.innerText = product.title 
        items.appendChild(li);
    });

}

fetch("https://api.freeapi.app/api/v1/public/randomproducts")
    .then((response)=>{
        response.json()
        .then(renderToScreen) 

    })
    .catch(()=>{
        console.log("Error converting JSON")
    })
    .finally(()=>{console.log("swaha")

    }) 
