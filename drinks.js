let drinkWindow = document.getElementById("drinksWindow");
let drinksArr = []; //all the drinks
let ingridientsArr = [];
let messurmentsArr = [];
let selectedValue = document.getElementById("select"); 
let gallery = document.querySelector(".drinksWindow");


(function addTitles(url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list') {
    fetch(url)
        .then(response => response.json()) 
        .then(data => {
            data.drinks.forEach(element => {
                 // Accessing `drinks` array in the response
                addToSearch(element.strIngredient1); // Assuming `strIngredient1` is the property for ingredient names
            });
        })
        .catch(error => console.log("Error fetching data:", error)); // Added error handling
})();

function filterDrinks(selectedValue)
{
    drinkWindow.innerHTML = '';
    let drink = selectedValue.value;
    fetch(('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+drink).trim())
    .then(response => response.json())
    .then(data =>
            data.drinks.forEach(element =>
            {   
                let card = addCard(element);

            }
        )
    )
}

function addToSearch(value)
{
    let select = document.getElementById("select");
    let option = document.createElement("option");
    option.value = value;
    option.innerText = value;
    select.appendChild(option);
}

function addCard(drink) {
    console.log(drink);
    let card = document.createElement("div");

    let title = document.createElement("div");
    let visIng = document.createElement("div");
    let img = document.createElement("img");
    let ingTbl = document.createElement("table");
    let description = document.createElement("div");

    title.innerText = drink.strDrink;
    img.src = drink.strDrinkThumb;
    title.classList.add("title")
    visIng.appendChild(img);

    let tblRow = document.createElement("tr");

    let tblCol = document.createElement("th");
    tblCol.innerText = "Ingredient";
    tblRow.appendChild(tblCol);

    tblCol = document.createElement("th");
    tblCol.innerText = "Measure";
    tblRow.appendChild(tblCol);

    ingTbl.appendChild(tblRow);

    for (let i = 0; i < 15; i++) {
        if (drink[`strIngredient${i + 1}`] == null) {
            break;
        }

        tblRow = document.createElement("tr");

        tblCol = document.createElement("td");
        tblCol.innerText = drink[`strIngredient${i + 1}`]
        tblRow.appendChild(tblCol);

        tblCol = document.createElement("td");
        tblCol.innerText = drink[`strMeasure${i + 1}`]
        tblRow.appendChild(tblCol);

        ingTbl.appendChild(tblRow);
    }

    visIng.appendChild(ingTbl);
    visIng.classList.add("vis_ing");

    description.innerText = drink.strInstructions;
    description.classList.add("description");

    card.appendChild(title);
    card.appendChild(visIng);
    card.appendChild(description);

    card.classList.add("main");

    gallery.appendChild(card);

    
}

selectedValue.addEventListener("change", function() 
{
    console.log(ingridientsArr);
    console.log(messurmentsArr);
    console.log('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+selectedValue.value);
    filterDrinks(selectedValue);
});

