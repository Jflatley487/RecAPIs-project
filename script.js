// Declare API keys and elements from the HTML page
var APIkeys = `c5e235f24ba7435fb0d3fac538602e34`;
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
            instructionLinkElement.addEventListener("click", (event) => {
              event.preventDefault();
              saveClickedRecipe(recipe.id, recipe.title, recipeData.sourceUrl);
              window.open(recipeData.sourceUrl);
            });

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


  // Save clicked recipes
  function saveClickedRecipe(recipeId, recipeTitle, recipeUrl) {
    let clickedRecipes = JSON.parse(localStorage.getItem("clickedRecipes")) || [];

    // Check if the clicked recipe is already in the history
    const existingIndex = clickedRecipes.findIndex((recipe) => recipe.id === recipeId);

    // If the recipe is in the history, remove it
    if (existingIndex !== -1) {
      clickedRecipes.splice(existingIndex, 1);
    }

    // Add the clicked recipe to the beginning of the array
    clickedRecipes.unshift({ id: recipeId, title: recipeTitle, url: recipeUrl });

    // Keep only the last 5 clicked recipes
    clickedRecipes = clickedRecipes.slice(0, 5);

    // Save the updated array to local storage
    localStorage.setItem("clickedRecipes", JSON.stringify(clickedRecipes));

    // Render the updated history
    renderRecipeHistory();
  }

  // Add a new function to render the history of clicked recipes
  function renderRecipeHistory() {
    const historyContainer = document.getElementById("history-container");
    const clickedRecipes = JSON.parse(localStorage.getItem("clickedRecipes")) || [];

    // Clear the history container
    historyContainer.innerHTML = "";

    // Create and append history elements
    clickedRecipes.forEach((recipe) => {
      const historyElement = document.createElement("a");
      historyElement.href = recipe.url;
      historyElement.textContent = recipe.title;
      historyElement.classList.add("history-item");

      historyContainer.appendChild(historyElement);
    });
  }
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
