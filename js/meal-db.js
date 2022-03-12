var input = document.getElementById("search-field");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.key === 'Enter') {
    // Cancel the default action, if needed
    // event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("button-search").click();
  }
});

//
const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    searchField.value = ''
    if (searchText == '') {
        alert('write something')
    } else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${ searchText }`
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.meals))

    }


}

const displaySearchResult = meals => {
    
    if (meals == null) {
        alert('not found')
    } else {
        const searchResult = document.getElementById('search-result')
        // searchResult.innerHTML = '';
        searchResult.textContent = ''
        meals.forEach(meal => {
            // console.log(meal)
            const div = document.createElement('div')
            div.classList.add('col')
            div.innerHTML = `
        <div onclick="loadMealDetail(${ meal.idMeal })" class="card">
             <img src="${ meal.strMealThumb }" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${ meal.strMeal }</h5>
                 <p class="card-text">${ meal.strInstructions.slice(0, 150) }</p>
            </div>
        </div>
        `;
            searchResult.appendChild(div)
        });
    }

}

const loadMealDetail = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ mealId }`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetail(data.meals[0]))
}

const displayMealDetail = meal => {
    const mealDetails = document.getElementById('meal-details')
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `
    <img src="${ meal.strMealThumb }" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${ meal.strMeal }</h5>
      <p class="card-text">${ meal.strInstructions.slice(0, 150) }</p>
      <a target="_blank" href="${ meal.strYoutube }" class="btn btn-primary">Go somewhere</a>
    </div>
    `;
    mealDetails.appendChild(div)
}