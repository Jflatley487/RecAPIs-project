//var APIkey = `45136b7fa6f94dc5a402582407e6e6af`;
// var APIkeyt = `04061e24c1ff4f54b3143f477378f3ee`;
var APIkeys = `41a4ce17c2b3480fb0a513f21a2e40b0`;
// var APIkeyl = `c5e235f24ba7435fb0d3fac538602e34 `;
var form = document.querySelector("form");
var foodDropdown = document.getElementById("food");
var recipesContainer = document.getElementById("recipes");
var APIkeyTemp = `1iuNqGlUBl4cLgMqkZa1Y5py2Bhk7ZacWfAwx0fm`;
var getJokeButton = document.getElementById("get-joke");
var jokeContainer = document.getElementById("joke-container");
const recentLinks = [];

form.addEventListener("submit", function (event) {
  event.preventDefault(); // prevent the default form submission
  var food = foodDropdown.value;
  recipesContainer.innerHTML = "";

  fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIkeys}&includeIngredients=${food}&number=2`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.results.forEach((recipe) => {
        fetch(
          `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${APIkeys}`
        )
          .then((response) => response.json())
          .then((recipeData) => {
            const recipeElement = document.createElement("div");
            recipeElement.classList.add("recipe");

            const imageElement = document.createElement("img");
            imageElement.src = recipe.image;

            const titleElement = document.createElement("h2");
            titleElement.textContent = recipe.title;

            const instructionLinkElement = document.createElement("a");
            instructionLinkElement.href = recipeData.sourceUrl;
            instructionLinkElement.textContent = "View Instructions";

            //local storage
            const link = this.href;
            recentLinks.unshift(link);
            recentLinks.splice(5); // limit to 5 links
            localStorage.setItem("recentLinks", JSON.stringify(recentLinks));
            console.log("Link saved:", link);
            // ^^^

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
});

function renderRecentLinks() {
  var links = JSON.parse(localStorage.getItem('recentLinks'));
  if (!links) {
    return;
  }
  const linksContainer = document.getElementById('recent-links-container');
  linksContainer.innerHTML = '';
  links.forEach(link => {
    const linkElement = document.createElement('a');
    linkElement.href = link;
    linkElement.textContent = link;
    linksContainer.appendChild(linkElement);
  });
}



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

/*getJokeButton.addEventListener('click', () => {
  fetch('https://icanhazdadjoke.com/', {
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    const joke = data.joke;
    jokeContainer.innerText = joke;
  });
});*/

/*fetch(`https://api.fsis.usda.gov/restaurants/v1/foodsafety/temperature?type=${food}&api_key=${APIkeyTemp}`)
    .then(response => response.json())
    .then(data => {
        const safeTemp = data.safe_temp;
        console.log('Safe cooking temperature for ' + foodDropdown + ' is ' + ${safeTemp} + 'F');
    })
    .catch(error => console.error(error));*/

// var APIkey = `45136b7fa6f94dc5a402582407e6e6af`;
// var protein = 'beef';
// var searchButton = document.getElementById('search-btn');
// //let url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${APIkey}&ingredients=${userInp}`;
// let results = document.getElementById('results');
// let userInp = document.getElementById('food').value;
// var recipeList = document.getElementById('recipe-list');

// const recipesContainer = document.querySelector('#recipes');

// fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIkey}&includeIngredients=${protein}`)
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//     data.results.forEach(recipe => {
//       fetch(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${APIkey}`)
//         .then(response => response.json())
//         .then(recipeData => {
//           const recipeElement = document.createElement('div');
//           recipeElement.classList.add('recipe');

//           const imageElement = document.createElement('img');
//           imageElement.src = recipe.image;

//           const titleElement = document.createElement('h2');
//           titleElement.textContent = recipe.title;

//           const instructionLinkElement = document.createElement('a');
//           instructionLinkElement.href = recipeData.sourceUrl;
//           instructionLinkElement.textContent = 'View Instructions';

//           recipeElement.appendChild(imageElement);
//           recipeElement.appendChild(titleElement);
//           recipeElement.appendChild(instructionLinkElement);
//           recipesContainer.appendChild(recipeElement);
//         })
//         .catch(error => {
//           console.error(`Error fetching recipe with ID ${recipe.id}`, error);
//         });
//     });
//   })
//   .catch(error => {
//     console.error('Error fetching data', error);
//   });

/*data.forEach(recipe => {
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
        
            .catch((error) => {
                console.error('Error:', error);
            });*/

//searchButton.addEventListener('submit', displayRecipe);

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
