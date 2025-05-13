/* OPDRACHT 1 - Producten filteren en sorteren

Doel: Werk met arrays, functies, en control structures.

Vereisten:
    - Schrijf een functie filterByCategory(products, category) die alleen producten van een bepaalde categorie retourneert
    - Schrijf een functie sortByPrice(products, ascending = true) die producten sorteert op prijs (oplopend of aflopend)
    - Schrijf een functie findInStockProducts(products) die alleen producten retourneert die op voorraad zijn (stock > 0)
    - Schrijf een functie calculateTotalValue(products) die de totale waarde berekent (prijs × voorraad) van alle producten
    - Bonus: Maak een functie die op naam zoekt (case-insensitive, partial match)

Voorbeeld:
    console.log(filterByCategory(products, "Electronics")); // Toont alleen elektronica
    console.log(sortByPrice(products, false)); // Toont producten van duur naar goedkoop
    console.log(findInStockProducts(products)); // Toont alleen producten met stock > 0
    console.log(calculateTotalValue(products)); // Toont totale waarde
*/

/* OPDRACHT 2 - LocalStorage Shopping Cart

Doel: Gebruik localStorage om data persistent te maken.

Vereisten:
    - Maak een functie addToCart(productId, quantity) die een product aan de winkelwagen toevoegt
    - Sla de winkelwagen op in localStorage als JSON
    - Maak een functie getCart() die de winkelwagen uit localStorage haalt en parsed
    - Maak een functie removeFromCart(productId) die een product uit de winkelwagen verwijdert
    - Bonus: Maak een functie updateQuantity(productId, newQuantity) die de hoeveelheid aanpast
*/

const products = [
    { id: 1, name: "Laptop", price: 899, category: "Electronics", stock: 10 },
    { id: 2, name: "Headphones", price: 149, category: "Electronics", stock: 25 },
    { id: 3, name: "Running Shoes", price: 89, category: "Sports", stock: 5 },
    { id: 4, name: "Backpack", price: 59, category: "Fashion", stock: 15 },
    { id: 5, name: "Coffee Maker", price: 119, category: "Home", stock: 2 },
    { id: 6, name: "Yoga Mat", price: 29, category: "Sports", stock: 18 },
    { id: 7, name: "External SSD", price: 149, category: "Electronics", stock: 8 },
    { id: 8, name: "Desk Lamp", price: 39, category: "Home", stock: 0 }
];
let cart = [];

if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
} else {
    cart = [
        {id: 1, amount: 0},
        {id: 2, amount: 0},
        {id: 3, amount: 0},
        {id: 4, amount: 0},
        {id: 5, amount: 0},
        {id: 6, amount: 0},
        {id: 7, amount: 0},
        {id: 8, amount: 0},
    ]
}

let totalPrice = 0;

if(JSON.parse(localStorage.getItem("cart"))){
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    console.log("hell yeah jigsaw!");
    console.log("Opgeslagen winkelwagen data:");
    for(const cartItem of savedCart){
        console.log(`ID: ${cartItem.id} (${products[cartItem.id - 1].name}) -> ${cartItem.amount} units`);

        if(parseInt(cartItem.amount) > 0){
            const productCont = document.createElement("div");
            const productName = document.createElement("p");

            const addToCart = document.createElement("button");
            addToCart.innerHTML = "Voeg toe";

            productCont.setAttribute("inCart", true);
            productCont.setAttribute("itemID", cartItem.id);

            let productCat = (products[cartItem.id - 1].category).split("");
            productCat = (productCat[0]).toLowerCase();

            productCont.setAttribute("cat", productCat);

            productCont.appendChild(productName);
            productCont.appendChild(addToCart);

            productCont.classList.add("product");

            productName.innerHTML = products[cartItem.id - 1].name + " - $" + products[cartItem.id - 1].price;

            document.querySelectorAll(".product-list")[0].appendChild(productCont);

            addToCartFunc(productCont, "saved");

            const itemAmount = productCont.querySelector("input");
            console.log(itemAmount);
            itemAmount.value = cartItem.amount;

            totalPrice += products[cartItem.id - 1].price * cartItem.amount;

            document.getElementById("cart-total").innerHTML = totalPrice;
        }
    }
}

products.forEach(product => {
    const productCont = document.createElement("div");
    const productName = document.createElement("p");

    const addToCart = document.createElement("button");
    addToCart.innerHTML = "Voeg toe";

    productCont.setAttribute("inCart", false);
    productCont.setAttribute("itemID", product['id']);

    let productCat = (product.category).split("");
    productCat = (productCat[0]).toLowerCase();

    productCont.setAttribute("cat", productCat);


    addToCart.addEventListener("click", function(){
        const itemStatus = this.parentNode.getAttribute("inCart");
        console.log(itemStatus);
        const thisItem = this.parentNode;

        if(itemStatus == "false"){
            this.parentNode.remove();
            addToCartFunc(thisItem);
        }else if(itemStatus == "true"){
            console.log("nuh uh");
        }
    });

    productCont.appendChild(productName);
    productCont.appendChild(addToCart);

    productCont.classList.add("product");

    productName.innerHTML = product.name + " - €" + product.price + "<span class='stockCount'> [" + product.stock + "]</span>";

    document.querySelectorAll(".product-list")[0].appendChild(productCont);
});

function addToCartFunc(item, type){
    const thisID = item.getAttribute("itemID");
    thisObject = products.find(({id}) => id == thisID);
    if(type != "saved"){
        cart[item.getAttribute("itemID") - 1].amount += 1;
    }
    console.log(cart);

    if(type != "saved"){
        totalPrice += thisObject.price;
    }

    document.getElementById("cart-total").innerHTML = totalPrice;

    // console.log(thisID);
    // console.log(thisObject);
    // console.log(thisObject.price);

    item.setAttribute("inCart", true);
    console.log(item);
    document.getElementById("cart-items").appendChild(item);

    // verneder knopje
    item.querySelector("button").innerHTML = "-1";
    
    const minusButton = document.createElement("button");
    item.appendChild(minusButton);

    minusButton.innerHTML = "+1";
    minusButton.classList.add("minusButton");

    const buttonContainer = document.createElement( "div");

    item.querySelectorAll("button").forEach(button => {
        const thisButton = button;
        button.remove();
        buttonContainer.appendChild(thisButton);
    });

    item.appendChild(buttonContainer);

    const itemCount = document.createElement("input");
    itemCount.setAttribute("type", "number");
    itemCount.classList.add("countProduct");

    itemCount.setAttribute("value", 1);

    item.appendChild(itemCount);

    const buttons = item.querySelectorAll("button");
    buttons[0].addEventListener("click", function(){
    const input = this.closest(".product").querySelector("input");
    if (!input) {
            console.error("Input not found");
            return;
        }

        let inputVal = parseInt(input.value) || 0;
        
        if(checkAmount(inputVal, 'min', item.getAttribute("itemID"))){
            input.value = inputVal - 1;
            cart[item.getAttribute("itemID") - 1].amount -= 1;
            console.log(cart);
        }else{
            location.reload();
        }
    });
    buttons[1].addEventListener("click", function(){
    const input = this.closest(".product").querySelector("input");
    if (!input) {
            console.error("Input not found");
            return;
        }

        let inputVal = parseInt(input.value) || 0;
        if(checkAmount(inputVal, 'plus', item.getAttribute("itemID"))){
            input.value = inputVal + 1;
            cart[item.getAttribute("itemID") - 1].amount += 1;
            console.log(cart);
            
        }else{
            console.log("getal te hoog")
        }
    });
}
//deze code is echt een zooitje, maar het werkt!!!
function checkAmount(amount, type, ID){
    console.log(ID);
    //krijgt het object waar de id de Id van het item is (wat een ingewikkelde zin)
    const objectToSearch = products.find(({id}) => id == ID);
    console.log(objectToSearch);
    if(amount < 1 && type == 'min'){
        return false;
    }else if(amount >= objectToSearch.stock && type == 'plus'){
        return false;
    }else{
        if(type == 'min'){
            if(totalPrice >= objectToSearch.price){
                totalPrice -= objectToSearch.price;
            }
        }else if(type == 'plus'){
            totalPrice += objectToSearch.price;
        }
        document.getElementById("cart-total").innerHTML = totalPrice;
        return true;
    }

}

let filtersActive = false;

document.getElementById("catSelect").addEventListener("change", filterByCategory)

document.getElementById("clearFilters").addEventListener("click", function(){
    if(filtersActive == true){
        location.reload();
    }
})

function filterByCategory(){
    const cat = document.getElementById("catSelect").value;
    console.log(cat);

    const list = document.querySelectorAll(".product-list")[0];
    const listArr = Array.from(list.children);
    console.log(listArr);
    
    if(cat == "alle"){
        location.reload();
    }
    for(const item of listArr){
        console.log(item.getAttribute("cat"));
        if(item.getAttribute("cat") !== (cat.split('')[0]).toLowerCase()){
            item.style.display = "none";
            filtersActive = true;
        }
    }
    
}

document.getElementById("sortSelect").addEventListener('change', sortByPrice);
let isSorted = false;

function sortByPrice(){
    var sort = document.getElementById("sortSelect").value;
    console.log(sort);

    //zet de opties om zodat het veeeel makkelijker is om mee te programmeren ((:
    switch((sort).toLowerCase()){
        case 'niet sorteren':
            sort = "n/a";
            break;
        case 'prijs (hoog - laag)':
            sort = "h-l";
            break;
        case 'prijs (laag - hoog)':
            sort = "l-h";
            break;
        case 'a - z':
            sort = "a-z";
            break;
        case 'z - a':
            sort = "z-a";
            break;
        default:
            sort = undefined;
            break;
    }

    console.log(sort);

    //sorteers
    //verlos me uit mijn lijden. 
    //ik heb geen idee wat dit allemaal doet, dit is niet normaal
    //ik vergeet gewoon wat is schrijf....
    const list = document.querySelectorAll(".product-list")[0];
    const listArr = Array.from(list.children);
    const sortList = [];

    const priceData = []
    switch (sort) {
        case 'h-l':
        for (const item of listArr) {
        const ID = item.getAttribute("itemID");
        if (!ID) continue;

        const objectToSearch = products.find(({ id }) => id == ID);
        if (!objectToSearch) continue;
            console.log(objectToSearch);

            const thisItem = item;
            const itemData = {
                item: thisItem,
                id: objectToSearch.id,
                price: objectToSearch.price
            };

            sortList.push(itemData);
        }

        sortList.sort((a, b) => b.price - a.price);

        console.log(sortList);

        list.innerHTML = "";
        for(const item of sortList){
            document.querySelectorAll(".product-list")[0].appendChild(item.item);
        }
        isSorted = true;
        break;
    case 'l-h':
        for (const item of listArr) {
        const ID = item.getAttribute("itemID");
        if (!ID) continue;

        const objectToSearch = products.find(({ id }) => id == ID);
        if (!objectToSearch) continue; 
            console.log(objectToSearch);

            const thisItem = item;
            const itemData = {
                item: thisItem,
                id: objectToSearch.id,
                price: objectToSearch.price
            };

            sortList.push(itemData);
        }

        sortList.sort((a, b) => a.price - b.price);

        console.log(sortList);

        list.innerHTML = "";
        for(const item of sortList){
            document.querySelectorAll(".product-list")[0].appendChild(item.item);
        }
        isSorted = true;
        break;
    case 'a-z':

        for (const item of listArr) {
        const ID = item.getAttribute("itemID");
        if (!ID) continue;

        const objectToSearch = products.find(({ id }) => id == ID);
        if (!objectToSearch) continue; 
            console.log(objectToSearch);

            const thisItem = item;
            const itemData = {
                item: thisItem,
                id: objectToSearch.id,
                firstLetter: ((objectToSearch.name).split(''))[0].toLowerCase()
            };

            sortList.push(itemData);
        }

        sortList.sort((a, b) => a.firstLetter.localeCompare(b.firstLetter));

        console.log(sortList);

        list.innerHTML = "";
        for(const item of sortList){
            document.querySelectorAll(".product-list")[0].appendChild(item.item);
        }
        isSorted = true;
    break;
    case 'z-a':

        for (const item of listArr) {
        const ID = item.getAttribute("itemID");
        if (!ID) continue;

        const objectToSearch = products.find(({ id }) => id == ID);
        if (!objectToSearch) continue;
            console.log(objectToSearch);

            const thisItem = item;
            const itemData = {
                item: thisItem,
                id: objectToSearch.id,
                firstLetter: ((objectToSearch.name).split(''))[0].toLowerCase()
            };

            sortList.push(itemData);
        }

        sortList.sort((a, b) => b.firstLetter.localeCompare(a.firstLetter));

        console.log(sortList);

        list.innerHTML = "";
        for(const item of sortList){
            document.querySelectorAll(".product-list")[0].appendChild(item.item);
        }
        isSorted = true;
    break;
    case 'n/a':
        if(isSorted == true){
            location.reload();
        }else{
            console.log("nou, dat ga ik nou echt gewoon NIET doen oke?");
        }
        break;
}
}

document.getElementById("stockButton").addEventListener('click', showInStock);

function showInStock(){
    const list = document.querySelectorAll(".product-list")[0];
    const listArr = Array.from(list.children);
    const sortList = [];

    button = document.getElementById("stockButton");
    const currentStatus = button.checked;
    console.log(currentStatus);
    if(currentStatus == true){
        for (const item of listArr) {
            const ID = item.getAttribute("itemID");
            const objectToSearch = products.find(({ id }) => id == ID);
            console.log(objectToSearch);
            let isInStock = undefined;

            if(objectToSearch.stock > 0){
                isInStock = true;
            }else{
                isInStock = false;
            }

            const thisItem = item;
            const itemData = {
                item: thisItem,
                id: objectToSearch.id,
                inStock: isInStock
            };

            if(isInStock == true){
                sortList.push(itemData);
            }
        }

        console.log(sortList);

        list.innerHTML = "";
        for(const item of sortList){
            document.querySelectorAll(".product-list")[0].appendChild(item.item);
        }
    }else{
        location.reload();
    }
}

document.getElementById("totalValButton").addEventListener('click', calcTotalValue);

function calcTotalValue(){
    const priceList = [];
    for(const item of products){
        const text = `${item.name}: totaal -> $${item.stock * item.price} (${item.stock} x ${item.price})`;
        priceList.push(text);
    }
    for(const item2 of priceList){
        console.log(item2);
    }
    document.getElementById("totalValButton").innerHTML = "kijk in de console! (ctrl + shift + i)";

    setTimeout(() => {
        document.getElementById("totalValButton").innerHTML = "(dev) toon totale waarde";
    }, 3000);
}

document.getElementById("searchName").addEventListener("input", search);
const notFound = document.createElement("p");
document.querySelectorAll(".product-list")[0].appendChild(notFound);
notFound.innerHTML = "geen resultaten gevonden";

notFound.style.display = "none";

function search(){
    let amount  = 0;
    const input = document.getElementById("searchName");
    console.log(input.value);

    const productsElements = document.getElementsByClassName("product");
    for (const product of productsElements) {
    const pChild = product.querySelector("p");
    
    if (!pChild) continue;

    if ((pChild.innerHTML).toLowerCase().includes(input.value.toLowerCase())) {
        product.style.display = "flex";
        amount += 1;
    } else {
        product.style.display = "none";
    }
    if(amount == 0){
        notFound.style.display = "block";
        notFound.innerHTML = `Geen resultaten gevonden voor: ${input.value}`
    }else{
        notFound.style.display = "none";
    }
}
}

document.getElementById("emptyCart").addEventListener("click", function(){
    cart = [
        {id: 1, amount: 0},
        {id: 2, amount: 0},
        {id: 3, amount: 0},
        {id: 4, amount: 0},
        {id: 5, amount: 0},
        {id: 6, amount: 0},
        {id: 7, amount: 0},
        {id: 8, amount: 0},
    ]
    location.reload();
});

window.addEventListener("beforeunload", saveCartToLocalStorage);

function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

//ik moet huilen