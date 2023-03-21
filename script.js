
var APIkey = `45136b7fa6f94dc5a402582407e6e6af`;
var protein = 'beef';
var searchButton = document.getElementById('search-btn');
//let url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${APIkey}&ingredients=${userInp}`;
let results = document.getElementById('results');
let userInp = document.getElementById('food').value;
var recipeList = document.getElementById('recipe-list');





fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${APIkey}&ingredients=${protein}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        data.forEach(recipe => {
            const recipeItem = document.createElement('li');
            recipeItem.innerHTML = `
          <div>
            <img src="${recipe.image}" alt="${recipe.title}" />
            <h2>${recipe.title}</h2>
          </div>
          <div>
            <p><strong>Instructions:</strong> <a href="${recipe.sourceUrl}">Click here</a></p>
          </div>
        `;
            recipeList.appendChild(recipeItem);
        });
    })
            .catch((error) => {
                console.error('Error:', error);
            });




    //searchButton.addEventListener('submit', displayRecipe);


//local storage vvvv

//local storage for a favorite  button for recipe OR click on recipe to go to quickly
//need to replace "example.com" with correct link
//need to add <button id="favorite-button">Add to favorites</button> code to css? html?
//need to test


const link = 'https://www.example.com';
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

const favoriteButton = document.getElementById('favorite-button');

favoriteButton.addEventListener('click', function() {
  if (favorites.includes(link)) {
    // Remove the link from the favorites
    const index = favorites.indexOf(link);
    favorites.splice(index, 1);

    // Update the text and style of the button
    favoriteButton.textContent = 'Add to favorites';
    favoriteButton.classList.remove('active');
  } else {
    // Add the link to the favorites
    favorites.push(link);

    // Update the text and style of the button
    favoriteButton.textContent = 'Remove from favorites';
    favoriteButton.classList.add('active');
  }

  // Store the updated favorites in local storage
  localStorage.setItem('favorites', JSON.stringify(favorites));
});

// Update the text and style of the button when the page loads
if (favorites.includes(link)) {
  favoriteButton.textContent = 'Remove from favorites';
  favoriteButton.classList.add('active');
} else {
  favoriteButton.textContent = 'Add to favorites';
  favoriteButton.classList.remove('active');
}

//local storage ^^^^











/*searchButton.addEventListener('click', () => {
    let userInp = document.getElementById('user-inp').value;
});*/


/*fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${APIkey}&ingredients=${protein}`)
    .then((response) => response.json())
    .then((data) => {
        data.forEach(recipe => {
            const recipeItem = document.createElement('li');
            recipeItem.textContent = recipe.title;
            recipeList.appendChild(recipeItem);
          });
        
        
    });*/










/*/Fetch request
fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${APIkey}&ingredients=${protein}`)
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("NETWORK RESPONSE ERROR");
        }
    })
    .then(data => {
        console.log(data);
        displayRecipe(data)
    })
    .catch((error) => console.error("FETCH ERROR:", error));

//pass data to function to render it to HTML    
function displayRecipe(data) {
    const recipe = data.meals[0];
    const recipeDiv = document.getElementById('recipe');

//output data into HTML
    const recipeName = recipe.strMeal;
    const heading = document.createElement('h1');
    heading.innerHTML = recipeName;
    recipeDiv.appendChild(heading);

//get image and append to recipe div
    const recipeImg = document.createElement('img');
    recipeImg.src = recipe.strMealThumb;
    recipeDiv.appendChild(recipeImg);

}

searchButton.addEventListener('submit', displayRecipe);*/

