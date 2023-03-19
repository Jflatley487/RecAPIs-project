

var containerRecipes = document.getElementById('recipes');
var resultsContainer = document.getElementById('results');
var historyContainer = document.getElementById('history');
var APIkey = `45136b7fa6f94dc5a402582407e6e6af`;
var searchButton = document.getElementById('search-button');


function getApi() {
    var ingredients = document.getElementById('search-ingredients').value;
    var requestUrl = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${APIkey}&ingredients=${ingredients}`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            $('#search-ingredients').val('');

            var recipe = document.createElement('div');
            recipe.textContent = "Recipe: " + data.main.recipe;
            recipe.classList = 'current-list-group';
        })
        searchButton.addEventListener('click', getApi);
}


