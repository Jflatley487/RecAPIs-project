// Declare API keys and elements from the HTML page
var APIkeys = `41a4ce17c2b3480fb0a513f21a2e40b0`;
var form = document.querySelector("form");
var foodDropdown = document.getElementById("food");
var recipesContainer = document.getElementById("recipes");
var getJokeButton = document.getElementById("get-joke");
var jokeContainer = document.getElementById("joke-container");
var submitButton = document.getElementById("search-btn");
var protein = document.getElementById("protein");

// Add an event listener to the form when it is submitted
form.addEventListener("submit", function (event) {
    event.preventDefault(); // prevent the default form submission
    var food = foodDropdown.value;
    recipesContainer.innerHTML = "";

    // Fetch recipes based on the selected food ingredient
    fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIkeys}&includeIngredients=${food}&number=5`
    )
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            data.results.forEach((recipe) => {
                // Fetch the information for each recipe
                fetch(
                    `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${APIkeys}`
                )
                    .then((response) => response.json())
                    .then((recipeData) => {
                        // Create HTML elements for the recipe
                        const recipeElement = document.createElement("div");
                        recipeElement.classList.add("recipe");

                        const imageElement = document.createElement("img");
                        imageElement.src = recipe.image;

                        const titleElement = document.createElement("h2");
                        titleElement.textContent = recipe.title;

                        const instructionLinkElement = document.createElement("a");
                        instructionLinkElement.href = recipeData.sourceUrl;
                        instructionLinkElement.textContent = "View Instructions";

                        // Add the elements to the HTML page
                        recipeElement.appendChild(imageElement);
                        recipeElement.appendChild(titleElement);
                        recipeElement.appendChild(instructionLinkElement);
                        recipesContainer.appendChild(recipeElement);
                    })
                    .catch((error) => {
                        console.error(`Error fetching recipe with ID ${recipe.id}`, error);
                    });
            });
        })
        .catch((error) => {
            console.error("Error fetching data", error);
        });

    // Save and render the last searched protein ingredient
    function saveLastProtein() {
        var lastSearchedProtein = {
            protein: foodDropdown.value,
        };
        localStorage.setItem("lastSearchedProtein", JSON.stringify(lastSearchedProtein));
    }

    function renderLastProtein() {
        var lastProtein = JSON.parse(localStorage.getItem("lastSearchedProtein"));
        if (lastProtein !== null) {
            document.getElementById("protein").innerHTML = lastProtein.protein;

        } else {
            return;
        }
    }

    // Add an event listener to the submit button to save and render the last searched protein
    submitButton.addEventListener("click", function (event) {
        event.preventDefault();
        saveLastProtein();
        renderLastProtein();
    });

    // Render the last searched protein on page load
    function init() {
        renderLastProtein();
    }
    init();

    console.log(renderLastProtein);
});

// Fetch a dad joke and display it on the HTML page
fetch("https://icanhazdadjoke.com/", {
    headers: {
        Accept: "application/json",
    },
})
    .then((response) => response.json())
    .then((data) => {
        const joke = data.joke;
        const jokeContainer = document.getElementById("joke-container");
        jokeContainer.innerHTML = joke;
    });


