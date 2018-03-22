// referencing the ids in the HTML, querySelector returns the first results (querySelectorAll would return all results)
var filmSelect=document.querySelector("#filmSelect");
var openingText=document.querySelector("#openingText");
var textContent=document.querySelector("#textContent");
// declared to be used in function below
var films;


//fetches the results from the website
fetch("https://swapi.co/api/films/")
    .then(function(resultsFromFetch) {
// JSON stands for JavaScript Object Notation, JSON is a format for storing and transporting data, 
// often used when data is sent from a server to a web page.        
        return resultsFromFetch.json();
    })
    .then(function(filmInfo) {
        // results is what the Star Wars API calls the property that stores the film info
        //unpacking this arrays and putting in variable that can be referenced more easily
        films=filmInfo.results;
        console.log(filmInfo);
        // Runs through the array until we have looped through all films
        for (let i = 0; i < films.length; i++) {
            // Creating new options for the dropdown in the "select" of the HTML
            let film = document.createElement('option');
            // Text between the option tags of the film at "i" 
            film.innerText = films[i].title; 
            // Sets the value attribute of the option for each film in the array - uses the value of the unique identifier
            // Could search by title in this case but good practice to use an ID
            film.value = films[i].episode_id;
            // Shoves (or appends) the option into the select
            filmSelect.appendChild(film);
            console.log(films[i].title);
        }
        // Calls the onchange event handler when results are loaded
        filmSelect.onchange();
    })


// Recognizes the change in the dropdown menu
filmSelect.onchange = function(event) {
    // The find() method returns the value of the first element in the array that satisfies the provided testing function
    // value for films is found in function that takes results of fetch
   
    let selectedFilm = films.find(function(film) {
        // returns the film once it finds a match
        
        return film.episode_id == filmSelect.value;
    })
    // Returns the text between the p tag in HTML that matches the film we have selected
    openingText.innerText = selectedFilm.opening_crawl;
    textContent.classList.remove("scroll");
    setTimeout(function() {
        textContent.classList.add("scroll");
    }, 100);
}