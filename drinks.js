let drinkWindow = document.getElementById("drinksWindow");

let selectedValue = document.getElementById("select"); 
let gallery = document.querySelector(".drinksWindow");


(function addTitles(url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list') {
    fetch(url)
        .then(response => response.json()) 
        .then(data => {
            data.drinks.forEach(element => {
                addToSearch(element.strIngredient1);
            });
        })
        .catch(error => console.log("Error fetching data:", error)); 
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
                addCard(element);
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

    let card = document.createElement("div");

    let header = document.createElement("div");
    let imgTableDiv = document.createElement("div");
    let img = document.createElement("img");
    let ingredients = document.createElement("table");
    let instructions = document.createElement("div");

    imgTableDiv.appendChild(ingredients);
    imgTableDiv.appendChild(img);
    imgTableDiv.classList.add("imgTableDiv");

    header.innerText = drink.strDrink;
    img.src = drink.strDrinkThumb;

    header.classList.add("h2");
    imgTableDiv.appendChild(img);

    let tblRow = document.createElement("tr");
    tblRow.style.backgroundColor = "black";
    tblRow.style.color = "white";

    let tblCol = document.createElement("th");
    tblCol.innerText = "Ingredients";
    tblRow.appendChild(tblCol);

    tblCol = document.createElement("th");
    tblCol.innerText = "Measurments";
    tblRow.appendChild(tblCol);

    instructions.classList.add("instructions");

    ingredients.appendChild(tblRow);

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

        ingredients.appendChild(tblRow);
    }

    imgTableDiv.appendChild(ingredients);
    imgTableDiv.classList.add("imgTableDiv");

    instructions.innerText = drink.strInstructions;
    instructions.classList.add("instructions");

    card.appendChild(header);
    card.appendChild(imgTableDiv);
    card.appendChild(instructions);

    card.classList.add("main", "img");
    ingredients.classList.add("table","thead","th","tb")

    gallery.appendChild(card);
}

selectedValue.addEventListener("change", function() 
{
    filterDrinks(selectedValue);
});

