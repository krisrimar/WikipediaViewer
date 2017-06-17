
const DEBUG = true;

//LINKS

const wikipediaSearchAPILink = "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&inprop=url&srsearch=";

//const wikipediaSearchAPILink ="http://en.wikipedia.org/w/api.php?action=query&generator=search&format=json&gsrprop=snippet&prop=info&inprop=url&&gsrsearch=";


//TEXT

// const NO_LOCATION_TEXT = "Could not determine your location";


//UI ELEMENT IDs

const searchResultsID = "#search-results";
const searchWikiButtonID = "#search-wiki";
const searchTextID = "#search-text";

//VARIABLES


//CODE

function displaySearchResults(data) {
  //if(DEBUG) { console.log("This is the value of serach I got: " + searchText); };
  if(DEBUG) { console.log("Displaying results"); };

  var searchResultsAmount = data.query.search.length;
  var searchResultsArray = data.query.search;

  if(DEBUG) { console.log(searchResultsAmount); };

  for(i = 0; i < searchResultsAmount; i += 1) {
    if(DEBUG) { console.log("Result " + i + ": " + searchResultsArray[i].title); };
    $(searchResultsID).append("<div class='card' style='padding:10px;margin-botton:10px'><h4>" + searchResultsArray[i].title + "</h4><p>" + searchResultsArray[i].snippet + "</p></div>");
  }
}


function makeRequest(searchText) {
$.ajax({
  type: "GET",
  url: wikipediaSearchAPILink + searchText,
  data: searchText,
  dataType: 'json',
  type: 'POST',
  headers: { 'Api-User-Agent': 'KrisRimarWiki/1.1 (rimarkris@gmail.com)'},
  success: function(data) {
    if(DEBUG) { console.log("Value of search: " + searchText); };
    if(DEBUG) { console.log("Received results of AJAX request"); };
    displaySearchResults(data);
  },
  error: function(error) {
    if(DEBUG) { console.log("no search results"); };
  },
  cache: false
});
}

//MAIN

$(document).ready(function(){
  $(searchWikiButtonID).on('click', function(e) {
    $(searchResultsID).empty();
    var searchText = $(searchTextID).val();
    if(DEBUG) { console.log("Value of search field: " + $(searchTextID).val()); };

    makeRequest(searchText);
  });
});
